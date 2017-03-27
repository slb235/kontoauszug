// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import filter from './filter';
import settings from './settings';
import fidor from './fidor';

const rootReducer = combineReducers({
  counter,
  filter,
  settings,
  fidor,
  routing
});

export default rootReducer;
