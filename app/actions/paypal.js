
export const SET_PAYPAL_TRANSACTION_LIST = 'SET_PAYPAL_TRANSACTION_LIST';

export const setPaypalTransactionList = (list) => ({
  type: SET_PAYPAL_TRANSACTION_LIST,
  payload: list
});

export const loadPaypalTransactions = (username, password, signature) => (
  (dispatch) => {

  }
);
