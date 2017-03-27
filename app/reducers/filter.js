import { ADD_FILTER, REMOVE_FILTER } from '../actions/filter';

const defaultFilter = [
];

export default function counter(state = defaultFilter, action) {
  switch (action.type) {
    case ADD_FILTER:
      return [
        ...state,
        {
          from: action.payload.from,
          to: action.payload.to
        }
      ];
    case REMOVE_FILTER:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];
    default:
      return state;
  }
}
