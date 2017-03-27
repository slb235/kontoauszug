import { SET_PAYPAL_TRANSACTION_LIST } from '../actions/paypal';

export default function fidor(state = { transactionList: [] }, action) {
  switch (action.type) {
    case SET_PAYPAL_TRANSACTION_LIST:
      return {
        ...state,
        transactionList: action.payload
      };
    default:
      return state;
  }
}
