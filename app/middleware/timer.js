import { TIMER_START, TIMER_STOP, SET_DURATION, tick } from '../actions/counter';
import { ipcRenderer } from 'electron';

const timer = (store) => {
  // Handle tick events from main thread
  ipcRenderer.on('timer.tick', (event, timestamp) => {
    store.dispatch(tick(timestamp));
  });

  return (next) => (action) => {
    const result = next(action);

    switch (action.type) {
    case TIMER_START:
      ipcRenderer.send('timer.start', store.getState());
      return result;
    case TIMER_STOP:
      ipcRenderer.send('timer.stop');
      return result;
    case SET_DURATION:
      ipcRenderer.send('timer.start', store.getState());
      return result;
    default:
      return result;
    }
  };
};

export default timer;
