import { SET_DURATION } from '../actions/settings';

const initialState = {
  duration: 25 * 60 * 1000
};

export default function counter(state = initialState, action) {
  switch (action.type) {
  case SET_DURATION:
    return Object.assign({}, state, {
      duration: action.payload
    });
  default:
    return state;
  }
}
