import { SET_PAYPAL_TRANSACTION_LIST, SET_PAYPAL_FROM, SET_PAYPAL_TO } from '../actions/paypal';

export default function fidor(state = { transactionList: [] }, action) {
  switch (action.type) {
    case SET_PAYPAL_FROM:
      return {
        ...state,
        from: action.payload
      };
    case SET_PAYPAL_TO:
      return {
        ...state,
        to: action.payload
      };
    case SET_PAYPAL_TRANSACTION_LIST:
      return {
        ...state,
        transactionList: action.payload
      };
    default:
      return state;
  }
}
