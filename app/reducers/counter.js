import { TIMER_TICK } from '../../common/action-types/counter';

const initialState = {
  start: null,
  current: null
};

export default function counter(state = initialState, action) {
  switch (action.type) {
  case TIMER_TICK:
    return Object.assign({}, state, action.payload);
  default:
    return state;
  }
}
