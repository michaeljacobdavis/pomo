import { TIMER_TICK, TIMER_START, TIMER_PAUSE, TIMER_RESET } from '../../common/action-types/timer';
import { SET_SCHEDULE_INDEX } from '../../common/action-types/schedule';

export const initialState = {
  current: 0,
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
      running: true
    };
  case SET_SCHEDULE_INDEX:
  case TIMER_RESET:
    return {
      ...state,
      current: 0
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
