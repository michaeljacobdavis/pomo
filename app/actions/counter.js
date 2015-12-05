export const TIMER_TICK = 'TIMER_TICK';
export const TIMER_START = 'TIMER_START';
export const TIMER_STOP = 'TIMER_STOP';
export const SET_DURATION = 'SET_DURATION';

export function setDuration(payload) {
  return { type: SET_DURATION, payload };
}

export function timerStart(delay = 1000) {
  return (dispatch, getState) => {
    let { timer } = getState().counter;
    if (!timer) {
      timer = setInterval(() => {
        dispatch({type: TIMER_TICK});
      }, delay);
      dispatch({type: TIMER_START, payload: timer});
    }
  };
}

export function timerStop() {
  return (dispatch, getState) => {
    const { timer } = getState().counter;
    if (timer) {
      clearInterval(timer);
      dispatch({type: TIMER_STOP});
    }
  };
}
