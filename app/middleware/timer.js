import { tick } from '../actions/timer';
import { nextSchedule } from '../actions/schedule';
import { TIMER_TICK } from '../../common/action-types/timer';
import { NEXT_SCHEDULE } from '../../common/action-types/schedule';
import { ipcRenderer } from 'electron';

const timer = (store) => {
  // Handle tick events from main thread
  ipcRenderer.on(TIMER_TICK, (event, payload) => {
    store.dispatch(tick(payload));
  });
  ipcRenderer.on(NEXT_SCHEDULE, (event, payload) => {
    store.dispatch(nextSchedule(payload));
  });

  return (next) => (action) => {
    const result = next(action);

    ipcRenderer.send(action.type, store.getState());
    return result;
  };
};

export default timer;
