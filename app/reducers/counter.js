import { TIMER_TICK, TIMER_START, TIMER_STOP } from '../../common/action-types/counter';

const initialState = {
  start: null,
  current: null,
  running: false
};

export default function counter(state = initialState, action) {
  switch (action.type) {
  case TIMER_TICK:
    return Object.assign({}, state, action.payload);
  case TIMER_START:
    return Object.assign({}, state, {
      running: true
    });
  case TIMER_STOP:
    return Object.assign({}, state, {
      running: false
    });
  default:
    return state;
  }
}
