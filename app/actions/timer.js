import { TIMER_TICK, TIMER_START, TIMER_PAUSE } from '../../common/action-types/timer';

export function tick(payload) {
  return { type: TIMER_TICK, payload };
}

export function timerStart() {
  return { type: TIMER_START };
}

export function timerPause() {
  return { type: TIMER_PAUSE };
}
