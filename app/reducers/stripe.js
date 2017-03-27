import { SET_FROM, SET_TO, SET_STRIPE_TRANSACTION_LIST } from '../actions/stripe';

export default function settings(state = { transactionList: [] }, action) {
  switch (action.type) {
    case SET_FROM:
      return {
        ...state,
        from: action.payload
      };
    case SET_TO:
      return {
        ...state,
        to: action.payload
      };
    case SET_STRIPE_TRANSACTION_LIST:
      return {
        ...state,
        transactionList: action.payload
      };
    default:
      return state;
  }
}
