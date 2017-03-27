
export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';

export function addFilter(from, to) {
  return {
    type: ADD_FILTER,
    payload: { from, to }
  };
}

export function removeFilter(index) {
  return {
    type: REMOVE_FILTER,
    payload: index
  };
}
