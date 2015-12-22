import { TIMER_TICK, TIMER_START, TIMER_PAUSE } from '../../common/action-types/timer';

export const initialState = {
  start: null,
  current: null,
  running: false
};

export default function timer(state = initialState, action) {
  switch (action.type) {
  case TIMER_TICK:
    return {
      ...state,
      ...action.payload
    };
  case TIMER_START:
    return {
      ...state,
      start: state.start ? state.start : new Date().getTime(),
      running: true
    };
  case TIMER_PAUSE:
    return {
      ...state,
      running: false
    };
  default:
    return state;
  }
}
