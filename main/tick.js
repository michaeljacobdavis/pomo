'use strict';

const bus = require('./event-bus');
const timerActions = require('../common/action-types/timer');
const scheduleActions = require('../common/action-types/schedule');
const appActions = require('../common/action-types/app');
const formatTime = require('../common/format-time');

module.exports = function tick(event, state) {
  state.timer.current = new Date().getTime();
  const timeLeft = state.schedule.list[state.schedule.current].duration - (state.timer.current - state.timer.start);

  // If there is still time on the clock
  if (timeLeft > 0) {
    event.sender.send(timerActions.TIMER_TICK, state.timer);
    bus.emit(appActions.APP_TITLE, formatTime(timeLeft));
  } else {
    state.schedule.current = state.schedule.current === state.schedule.list.length ? 0 : state.schedule.current + 1;
    event.sender.send(scheduleActions.NEXT_SCHEDULE, state.schedule.current);
    state.timer.start = new Date().getTime();

    tick(event, state);
  }
};
