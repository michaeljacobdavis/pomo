export const TIMER_TICK = 'TIMER_TICK';
export const TIMER_START = 'TIMER_START';
export const TIMER_STOP = 'TIMER_STOP';

export function tick(payload) {
  return { type: TIMER_TICK, payload };
}

export function timerStart() {
  return { type: TIMER_START };
}

export function timerStop() {
  return { type: TIMER_STOP };
}