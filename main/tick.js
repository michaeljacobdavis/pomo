const bus = require('./event-bus');
const counterActions = require('../common/action-types/counter');
const formatTime = require('../common/helpers/format-time');


module.exports = function tick(event, state) {
  state.counter.current = new Date().getTime();
  const timeLeft = state.settings.schedule[state.settings.currentIndex].duration - (state.counter.current - state.counter.start);

  // If there is still time on the clock
  if (timeLeft > 0) {
    event.sender.send(counterActions.TIMER_TICK, state.counter);
    bus.emit('app.title', formatTime(timeLeft));
  } else {
    state.settings.currentIndex = state.settings.currentIndex === state.settings.schedule.length ? 0 : state.settings.currentIndex + 1;
    state.counter.start = new Date().getTime();
    tick();
  }
};
