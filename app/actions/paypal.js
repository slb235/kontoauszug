import electron from 'electron';
import { parseCSVFile } from '../lib/paypal';
import { writeMT940File } from '../lib/mt940';

export const SET_PAYPAL_TRANSACTION_LIST = 'SET_PAYPAL_TRANSACTION_LIST';

export const setPaypalTransactionList = (list) => ({
  type: SET_PAYPAL_TRANSACTION_LIST,
  payload: list
});

export const parsePaypalFile = (file) => (
  (dispatch) => {
    parseCSVFile(file, (error, data) => {
      if (error) {
        return;
      }
      dispatch(setPaypalTransactionList(data));
    });
  }
);

export const openPaypalFile = () => (
  (dispatch) => {
    electron.remote.dialog.showOpenDialog({
      filters: [
        { name: 'CSV Kontoauszug', extensions: ['csv'] },
        { name: 'Alle Dateien', extensions: ['*'] }
      ]
    }, (files) => {
      if (!files || files.length < 1) {
        return;
      }
      dispatch(parsePaypalFile(files[0]));
    });
  }
);

export const savePaypalFile = (account, transactions) => (
  () => {
    electron.remote.dialog.showSaveDialog({
      filters: [
        { name: 'MT940 Kontoauszug', extensions: ['mta'] },
        { name: 'Alle Dateien', extensions: ['*'] }
      ]
    }, (file) => {
      if (file) {
        let saldo = 0;
        if (transactions.length > 0) {
          saldo = transactions[0].balance - transactions[0].value;
        }
        writeMT940File(file, account, saldo, transactions);
      }
    });
  }
);
