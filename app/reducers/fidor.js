import { SET_FIDOR_TRANSACTION_LIST, SET_FIDOR_BALANCE } from '../actions/fidor';

export default function fidor(state = { transactionList: [], balance: '0,00' }, action) {
  switch (action.type) {
    case SET_FIDOR_TRANSACTION_LIST:
      return {
        ...state,
        transactionList: action.payload
      };
    case SET_FIDOR_BALANCE:
      return {
        ...state,
        balance: action.payload
      };
    default:
      return state;
  }
}
