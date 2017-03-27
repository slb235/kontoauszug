import stripe from 'stripe';
import electron from 'electron';
import { writeMT940File } from '../lib/mt940';

export const SET_FROM = 'SET_FROM';
export const SET_TO = 'SET_TO';
export const SET_STRIPE_TRANSACTION_LIST = 'SET_STRIPE_TRANSACTION_LIST';

export const setFrom = (value) => ({
  type: SET_FROM,
  payload: value
});

export const setTo = (value) => ({
  type: SET_TO,
  payload: value
});

export const setTransactionList = (list) => ({
  type: SET_STRIPE_TRANSACTION_LIST,
  payload: list
});

export const fetchTransactions = (apiKey, from, to) => (
  (dispatch) => {
    const stripeApi = stripe(apiKey);
    stripeApi.balance.listTransactions({ available_on: {
      gte: (new Date(from)).getTime() / 1000,
      lte: (new Date(to)).getTime() / 1000
    },
      limit: 100 }, (error, transactions) => {
      if (error) return;
      const outTransactions = [];
      if (transactions.has_more) {
        throw new Error('more transactions!');
      }
      for (const transaction of transactions.data.reverse()) {
        switch (transaction.type) {
          case 'transfer':
            outTransactions.push({
              date: new Date(transaction.available_on * 1000),
              entry_date: new Date(transaction.created * 1000),
              value: transaction.amount / 100.0,
              description: `${transaction.description} ${transaction.id}`
            });
            break;
          case 'charge':
            outTransactions.push({
              date: new Date(transaction.available_on * 1000),
              entry_date: new Date(transaction.created * 1000),
              value: transaction.amount / 100.0,
              description: `${transaction.description} ${transaction.id}`
            });
            outTransactions.push({
              date: new Date(transaction.available_on * 1000),
              entry_date: new Date(transaction.created * 1000),
              value: -transaction.fee / 100.0,
              description: `Stripe Gebühren ${transaction.id}`
            });
            break;
          case 'refund':
            outTransactions.push({
              date: new Date(transaction.available_on * 1000),
              entry_date: new Date(transaction.created * 1000),
              value: transaction.amount / 100.0,
              description: `Erstattung ${transaction.description} ${transaction.id}`
            });
            outTransactions.push({
              date: new Date(transaction.available_on * 1000),
              entry_date: new Date(transaction.created * 1000),
              value: -transaction.fee / 100.0,
              description: `Erstattung Stripe Gebühren ${transaction.id}`
            });
            break;

          default:
            console.log(transaction);
            throw new Error('transaction type unknown');
        }
      }
      dispatch(setTransactionList(outTransactions));
    });
  }
);

export const saveStripeFile = (account, transactions) => (
  () => {
    electron.remote.dialog.showSaveDialog({
      filters: [
        { name: 'MT940 Kontoauszug', extensions: ['mta'] },
        { name: 'Alle Dateien', extensions: ['*'] }
      ]
    }, (file) => {
      if (file) {
        writeMT940File(file, account, 0, transactions);
      }
    });
  }
);
