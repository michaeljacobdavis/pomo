import { TIMER_START, TIMER_STOP, TIMER_TICK } from '../../common/action-types/counter';

const initialState = {
  start: null,
  current: null,
  timer: null
};

export default function counter(state = initialState, action) {
  switch (action.type) {
  case TIMER_START:
    return Object.assign({}, state, {
      start: new Date().getTime(),
      current: new Date().getTime()
    });
  case TIMER_STOP:
    return Object.assign({}, state, {
      start: null,
      current: null
    });
  case TIMER_TICK:
    return Object.assign({}, state, {
      current: action.payload
    });
  default:
    return state;
  }
}
