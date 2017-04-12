import fs from 'fs';
import csv from 'csv';
import iconv from 'iconv-lite';
import moment from 'moment';

export const parseCSV = (data, callback) => {
  csv.parse(
    iconv.decode(data, 'latin-1'),
    { delimiter: ';', from: 2 },
    (error, rows) => {
      if (error) {
        callback(error);
        return;
      }
      callback(null, rows.reverse().map((row) => {
        // const split = row[2].split(', ');
        return {
          date: moment(row[0], 'DD.MM.YYYY').toDate(),
          description: row[1],
          value: parseFloat(row[3].replace('.', '').replace(',', '.'))
          /* ,
          from: {
            name: split[0].split(': ')[1],
            account: split[1].split(': ')[1],
            bank: split[2] ? split[2].split(': ')[1] : ''
          }*/
        };
      }));
    });
};

export const parseCSVFile = (file, callback) => {
  fs.readFile(file, (error, data) => {
    if (error) {
      callback(error);
      return;
    }
    parseCSV(data, callback);
  });
};

export const findInvoiceNumber = (text) => {
  const result = text.match(/(?:^|\s)RE-AB-\d{6}-\d{4,5}(?:$|\s)/);
  return result ? result[0] : null;
};
