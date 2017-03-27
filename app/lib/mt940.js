import fs from 'fs';
import moment from 'moment';
import iconv from 'iconv-lite';

const num = (saldo) => {
  const str = Math.abs(saldo).toFixed(2).replace('.', ',');
  if (str.slice(-2) === '00') { return str.substring(0, str.length - 2); }
  return str;
};

const cd = (saldo) => (saldo > 0 ? 'C' : 'D');
const line = (subject, content) => (`:${subject}:${content}\r\n`);
const saldoLine = (saldo, date) => (`${cd(saldo)}${moment(date).format('YYMMDD')}EUR${num(saldo)}`);

export const writeMT940 = (account, startSaldo, transactions, filter) => {
  const firstDate = moment(transactions[0].date);
  let endDate;
  let output = line('20', firstDate.format('YYMMDD-0001'));
  output += line('25', account);
  output += line('28', firstDate.format('MMDD/001'));
  output += line('60F', saldoLine(startSaldo, firstDate));
  let saldo = startSaldo;
  output += transactions.map((transaction) => {
    endDate = transaction.date;
    saldo += transaction.value;
    return line('61', `${moment(transaction.date).format('YYMMDD')}${cd(transaction.value)}${num(transaction.value)}NMSC`) +
      line('86', `999${filter(transaction.description)}`);
  }).join('');
  output += line('62F', saldoLine(saldo, endDate));
  return iconv.encode(output, 'latin-1');
};


export const writeMT940File = (path, account, saldo, transactions, filters) => {
  fs.writeFile(path, writeMT940(account, saldo, transactions, filters), () => {

  });
};
