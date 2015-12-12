const bus = require('./event-bus');
const counterActions = require('../common/action-types/counter');

module.exports = function schedule(ipc, tick, scheduler) {
  let interval;

  ipc.on(counterActions.TIMER_START, (event, state) => {
    state.settings.schedule = scheduler(state.settings);
    state.counter.start = new Date().getTime();

    const ticker = tick.bind(null, event, state);

    // Init
    ticker();

    // Set Interval
    interval = setInterval(ticker, 1000);
  });

  ipc.on(counterActions.TIMER_STOP, () => {
    bus.emit('app.title', '');
    clearInterval(interval);
  });

  //
  // ipc.on(settingsActions.SET_WORK_DURATION, settingsHandler);
  // ipc.on(settingsActions.SET_SHORT_BREAK_DURATION, settingsHandler);
  // ipc.on(settingsActions.SET_LONG_BREAK_DURATION, settingsHandler);
  // ipc.on(settingsActions.SET_SET_COUNT, settingsHandler);
};
