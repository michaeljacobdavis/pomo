import { tick } from '../actions/counter';
import { TIMER_TICK } from '../../common/action-types/counter';
import { ipcRenderer } from 'electron';

const timer = (store) => {
  // Handle tick events from main thread
  ipcRenderer.on(TIMER_TICK, (event, payload) => {
    store.dispatch(tick(payload));
  });

  return (next) => (action) => {
    const result = next(action);

    ipcRenderer.send(action.type, store.getState());
    return result;
  };
};

export default timer;
