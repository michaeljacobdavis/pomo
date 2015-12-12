'use strict';

const bus = require('./event-bus');
const counterActions = require('../common/action-types/counter');
const scheduleActions = require('../common/action-types/schedule');
const appActions = require('../common/action-types/app');

module.exports = function schedule(ipc, tick) {
  let interval;

  function handleEvent(event, state) {
    if (state.counter.running) {
      state.counter.start = new Date().getTime();
      const ticker = tick.bind(null, event, state);

      // Init
      ticker();

      // Cancel any existing interval
      handleStop();

      // Set Interval
      interval = setInterval(ticker, 1000);
    }
  }

  function handleStop() {
    bus.emit(appActions.APP_TITLE, '');
    clearInterval(interval);
  }

  ipc.on(counterActions.TIMER_START, handleEvent);
  ipc.on(scheduleActions.SCHEDULE, handleEvent);

  ipc.on(counterActions.TIMER_STOP, handleStop);
};
