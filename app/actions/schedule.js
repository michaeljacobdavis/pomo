import { SCHEDULE, NEXT_SCHEDULE } from '../../common/action-types/schedule';

export function setSchedule(payload) {
  return { type: SCHEDULE, payload };
}

export function nextSchedule(payload) {
  return { type: NEXT_SCHEDULE, payload };
}
