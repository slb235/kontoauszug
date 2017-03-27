import electron from 'electron';
import { parseCSVFile } from '../lib/fidor';
import { writeMT940File } from '../lib/mt940';

export const SET_FIDOR_TRANSACTION_LIST = 'SET_FIDOR_TRANSACTION_LIST';
export const SET_FIDOR_BALANCE = 'SET_FIDOR_BALANCE';

export const setFidorTransactionList = (list) => ({
  type: SET_FIDOR_TRANSACTION_LIST,
  payload: list
});

export const setFidorBalance = (balance) => ({
  type: SET_FIDOR_BALANCE,
  payload: parseFloat(balance.replace(',', '.'))
});

export const parseFidorFile = (file) => (
  (dispatch) => {
    parseCSVFile(file, (error, data) => {
      if (error) {
        return;
      }
      dispatch(setFidorTransactionList(data));
    });
  }
);

export const openFidorFile = () => (
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
      dispatch(parseFidorFile(files[0]));
    });
  }
);

export const saveFidorFile = (account, saldo, transactions, filters) => (
  () => {
    electron.remote.dialog.showSaveDialog({
      filters: [
        { name: 'MT940 Kontoauszug', extensions: ['mta'] },
        { name: 'Alle Dateien', extensions: ['*'] }
      ]
    }, (file) => {
      if (file) {
        writeMT940File(file, account, saldo, transactions, filters);
      }
    });
  }
);
