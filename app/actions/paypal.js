import electron from 'electron';
import { parseCSVFile } from '../lib/paypal';

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
