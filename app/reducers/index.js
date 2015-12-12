import { combineReducers } from 'redux';
import counter from './counter';
import schedule from './schedule';
import settings from './settings';

const rootReducer = combineReducers({
  counter,
  schedule,
  settings
});

export default rootReducer;
