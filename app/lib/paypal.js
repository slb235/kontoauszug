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

const parseNumber = (num) => (parseFloat(num.replace('.', '').replace(',', '.')));

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
        if (transaction.status !== 'Abgeschlossen' || transaction['wäHrung'] !== 'EUR') continue;
        const balance = parseNumber(transaction.guthaben);

        switch (transaction.typ) {
          case 'Rückzahlung':
            outTransactions.push({
              date: transactionDate(transaction),
              value: parseNumber(transaction.brutto),
              description: `${transaction.transaktionscode} Eingehende Rückzahlung ${transaction.name}`,
              balance
            });
            break;
          case 'Allgemeine Währungsumrechnung':
            outTransactions.push({
              date: transactionDate(transaction),
              value: parseNumber(transaction.brutto),
              description: `${transaction.transaktionscode} Fremdwährungszahlung ${transaction.artikelbezeichnung}`,
              balance
            });
            break;
          case 'Website-Zahlung':
            let feeTransaction;
            if (transaction['gebüHr'] !== '0,00') {
              feeTransaction = {
                date: transactionDate(transaction),
                value: parseNumber(transaction['gebüHr']),
                description: `${transaction.transaktionscode} PayPal-Gebühren`,
                balance
              };
            }
            outTransactions.push({
              date: transactionDate(transaction),
              value: parseNumber(transaction.brutto),
              description: `${transaction.transaktionscode} ${transaction.artikelbezeichnung} ${transaction.artikelnummer}`,
              balance: feeTransaction ? balance - feeTransaction.value : balance
            });
            if (feeTransaction) {
              outTransactions.push(feeTransaction);
            }
            break;
          case 'Allgemeine Abbuchung':
            outTransactions.push({
              date: transactionDate(transaction),
              value: parseNumber(transaction.brutto),
              description: `Banktransfer ${transaction.transaktionscode}`,
              balance
            });

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
