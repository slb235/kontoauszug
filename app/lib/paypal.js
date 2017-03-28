import fs from 'fs';
import csv from 'csv';
import iconv from 'iconv-lite';
import moment from 'moment';


const camelize = (str) => (
  str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => (
    index == 0 ? letter.toLowerCase() : letter.toUpperCase()
  )).replace(/\s+/g, '')
);

const transactionDate = (transaction) => (
  moment(`${transaction.datum}${transaction.uhrzeit}`, 'DD.MM.YYYYHH:mm:ss').toDate()
);

export const parseCSV = (data, callback) => {
  csv.parse(
    data,
    { delimiter: ',' },
    (error, rows) => {
      if (error) {
        callback(error);
        return;
      }

      let keys;
      const transactions = [];
      rows.forEach((row, rowIndex) => {
        if (rowIndex === 0) {
          keys = row.map(camelize);
        }
        else {
          const transaction = {};
          keys.forEach((key, index) => {
            transaction[key] = row[index];
          });
          transactions.push(transaction);
        }
      });
      const outTransactions = [];

      for (const transaction of transactions) {
        switch (transaction.typ) {
          case 'Allgemeine Währungsumrechnung':
            if (transaction['wäHrung'] !== 'EUR') break;
          case 'Website-Zahlung':
            let feeTransaction;
            if (transaction['gebüHr'] !== '0,00') {
              feeTransaction = {
                date: transactionDate(transaction),
                value: parseFloat(transaction['gebüHr'].replace(',', '.')),
                description: `Paypal-Gebühren ${transaction.transaktionscode}`,
                balance: parseFloat(transaction.guthaben.replace('.', '').replace(',', '.'))
              };
            }
            const balance = parseFloat(transaction.guthaben.replace('.', '').replace(',', '.'));
            outTransactions.push({
              date: transactionDate(transaction),
              value: parseFloat(transaction.netto.replace(',', '.')),
              description: `${transaction.transaktionscode} ${transaction.artikelbezeichnung} ${transaction.artikelnummer}`,
              balance: feeTransaction ? balance - feeTransaction.value : balance
            });
            if (feeTransaction) {
              outTransactions.push(feeTransaction);
            }
            break;
          default:
            console.log(transaction);
        }
      }

      callback(null, outTransactions);
    });
};

export const parseCSVFile = (file, callback) => {
  fs.readFile(file, { encoding: 'utf-8' }, (error, data) => {
    if (error) {
      callback(error);
      return;
    }
    parseCSV(data, callback);
  });
};
