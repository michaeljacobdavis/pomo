import { TIMER_START, TIMER_STOP, TIMER_TICK, SET_DURATION } from '../actions/counter';

const initialState = {
  start: null,
  current: null,
  timer: null,
  duration: 25 * 60 * 1000
};

export default function counter(state = initialState, action) {
  switch (action.type) {
  case TIMER_START:
    return Object.assign({}, state, {
      timer: action.payload,
      start: new Date().getTime(),
      current: new Date().getTime()
    });
  case TIMER_STOP:
    return Object.assign({}, state, {
      timer: null,
      start: null,
      current: null
    });
  case TIMER_TICK:
    return Object.assign({}, state, {
      current: new Date().getTime()
    });
  case SET_DURATION:
    return Object.assign({}, state, {
      duration: action.payload
    });
  default:
    return state;
  }
}
