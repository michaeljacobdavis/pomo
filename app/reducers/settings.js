import { SET_WORK_DURATION, SET_SHORT_BREAK_DURATION, SET_LONG_BREAK_DURATION, SET_SET_COUNT } from '../../common/action-types/settings';
import scheduler from '../../common/helpers/scheduler';

const defaults = {
  workDuration: 25 * 60 * 1000,
  shortBreakDuration: 3 * 60 * 1000,
  longBreakDuration: 15 * 60 * 1000,
  setCount: 4
};

const initialState = {
  ...defaults,
  schedule: scheduler(defaults),
  current: 0
};

export default function counter(state = initialState, action) {
  switch (action.type) {
  case SET_WORK_DURATION:
    return Object.assign({}, state, {
      workDuration: action.payload,
      schedule: scheduler(state),
      current: 0
    });
  case SET_SHORT_BREAK_DURATION:
    return Object.assign({}, state, {
      shortBreakDuration: action.payload,
      schedule: scheduler(state),
      current: 0
    });
  case SET_LONG_BREAK_DURATION:
    return Object.assign({}, state, {
      longBreakDuration: action.payload,
      schedule: scheduler(state),
      current: 0
    });
  case SET_SET_COUNT:
    return Object.assign({}, state, {
      setCount: action.payload,
      schedule: scheduler(state),
      current: 0
    });
  default:
    return state;
  }
}
