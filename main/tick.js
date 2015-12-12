'use strict';

const bus = require('./event-bus');
const counterActions = require('../common/action-types/counter');
const appActions = require('../common/action-types/app');
const formatTime = require('../common/helpers/format-time');

module.exports = function tick(event, state) {
  state.counter.current = new Date().getTime();
  const timeLeft = state.settings.schedule[state.settings.current].duration - (state.counter.current - state.counter.start);

  // If there is still time on the clock
  if (timeLeft > 0) {
    event.sender.send(counterActions.TIMER_TICK, state.counter);
    bus.emit(appActions.APP_TITLE, formatTime(timeLeft));
  } else {
    state.settings.current = state.settings.current === state.settings.schedule.length ? 0 : state.settings.current + 1;
    state.counter.start = new Date().getTime();

    tick(event, state);
  }
};
