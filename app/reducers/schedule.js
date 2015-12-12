import { SCHEDULE, NEXT_SCHEDULE } from '../../common/action-types/schedule';
import scheduler from '../../common/scheduler';
import { initialState as settingsInitialState } from './settings';

const initialState = {
  list: scheduler(settingsInitialState),
  current: 0
};

export default function counter(state = initialState, action) {
  switch (action.type) {
  case SCHEDULE:
    return Object.assign({}, state, {
      list: action.payload
    });
  case NEXT_SCHEDULE:
    return Object.assign({}, state, {
      current: action.payload
    });
  default:
    return state;
  }
}
