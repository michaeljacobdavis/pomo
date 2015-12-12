'use strict';

const electron = require('electron');
const events = require('events');
const WindowHandler = require('./main/window-handler');
const tick = require('./main/tick');
const scheduler = require('./main/scheduler');
const runner = require('./main/runner');
const path = require('path');
const app = electron.app;
const Tray = electron.Tray;
const crashReporter = electron.crashReporter;
const internals = new events.EventEmitter();
const ipc = electron.ipcMain;
const bus = require('./event-bus');

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

  bus.on('app.title', internals.tray.setTitle);
  runner(ipc, tick, scheduler);

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
