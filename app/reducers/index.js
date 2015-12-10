import { combineReducers } from 'redux';
import counter from './counter';
import settings from './settings';

const rootReducer = combineReducers({
  counter,
  settings
});

export default rootReducer;
