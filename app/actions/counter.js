import { TIMER_TICK, TIMER_START, TIMER_STOP } from '../../common/action-types/counter';

export function tick(payload) {
  return { type: TIMER_TICK, payload };
}

export function timerStart() {
  return { type: TIMER_START };
}

export function timerStop() {
  return { type: TIMER_STOP };
}
