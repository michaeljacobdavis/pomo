'use strict';

const bus = require('./event-bus');
const timerActions = require('../common/action-types/timer');
const scheduleActions = require('../common/action-types/schedule');
const appActions = require('../common/action-types/app');
const intervalDelay = 1000;

module.exports = function schedule(ipc, tick) {
  let interval;

  function handleEvent(event, state) {
    if (state.timer.running) {
      const ticker = tick.bind(null, event, state, intervalDelay);

      // Init
      ticker();

      // Cancel any existing interval
      handlePause();

      // Set Interval
      interval = setInterval(ticker, intervalDelay);
    }
  }

  function handlePause() {
    bus.emit(appActions.APP_TITLE, '');
    clearInterval(interval);
  }

  ipc.on(timerActions.TIMER_START, handleEvent);
  ipc.on(timerActions.TIMER_RESET, handleEvent);
  ipc.on(scheduleActions.SCHEDULE, handleEvent);

  ipc.on(timerActions.TIMER_PAUSE, handlePause);
};
