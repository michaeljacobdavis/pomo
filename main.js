'use strict';

const electron = require('electron');
const events = require('events');
const WindowHandler = require('./main/window-handler');
const path = require('path');
const formatTime = require('./common/helpers/format-time');
const counterActions = require('./common/action-types/counter');
const settingsActions = require('./common/action-types/settings');
const app = electron.app;
const Tray = electron.Tray;
const crashReporter = electron.crashReporter;
const ipc = electron.ipcMain;
const internals = new events.EventEmitter();

internals.settings = {};

require('electron-debug')();
crashReporter.start();

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  internals.tray = new Tray(path.join(app.getAppPath(), 'IconTemplate.png'));
  let cachedBounds;
  let appUrl;

  // Load app
  if (process.env.HOT) {
    appUrl = `file://${__dirname}/app/hot-dev-app.html`;
  } else {
    appUrl = `file://${__dirname}/app/app.html`;
  }

  internals.windowHandler = new WindowHandler(appUrl);

  // Handle close
  internals.windowHandler.window.on('closed', () => {
    internals.windowHandler = null;
  });

  registerEvents(ipc);

  function click(e, bounds) {
    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) {
      return internals.windowHandler.hide();
    }

    if (internals.windowHandler.window.isVisible()) {
      return internals.windowHandler.hide();
    }

    cachedBounds = bounds || cachedBounds;
    internals.windowHandler.show(cachedBounds);
  }

  // Register tray events
  internals.tray
  .on('click', click)
  .on('double-click', click);

  // Hide Dock
  if (app.dock) {
    app.dock.hide();
  }
});


function registerEvents(events) {
  let cachedState;
  let interval;

  function settingsHandler(event, state) {
    cachedState = state;
  }

  function updateTitle(timestamp) {
    internals.tray.setTitle(formatTime(cachedState.settings.workDuration - (timestamp - cachedState.counter.start)));
  }

  events.on(counterActions.TIMER_START, (event, state) => {
    settingsHandler(event, state);

    interval = setInterval(() => {
      const timestamp = new Date().getTime();
      event.sender.send(counterActions.TIMER_TICK, timestamp);
      updateTitle(timestamp);
    }, 1000);
  });

  events.on(counterActions.TIMER_STOP, (event, state) => {
    settingsHandler(event, state);
    internals.tray.setTitle('');
    clearInterval(interval);
  });

  events.on(settingsActions.SET_WORK_DURATION, settingsHandler);
  events.on(settingsActions.SET_SHORT_BREAK_DURATION, settingsHandler);
  events.on(settingsActions.SET_LONG_BREAK_DURATION, settingsHandler);
  events.on(settingsActions.SET_SET_COUNT, settingsHandler);
}

function constructSchedule(options) {
  var schedule = [];

  Array(options.setCount - (options.completedSets || 0)).forEach(() => {
    schedule.push(options.workDuration);
    schedule.push(options.shortBreakDuration);
  });
  schedule.push(options.longBreakDuration);

  return schedule;
}
