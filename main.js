'use strict';

const electron = require('electron');
const Positioner = require('electron-positioner');
const events = require('events');
const path = require('path');
const formatTime = require('./common/helpers/format-time');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;
const crashReporter = electron.crashReporter;
const ipc = electron.ipcMain;
const internals = new events.EventEmitter();


require('electron-debug')();
crashReporter.start();


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


app.on('ready', () => {
  internals.tray = new Tray(path.join(app.getAppPath(), 'IconTemplate.png'));
  let cachedBounds;
  internals.window = createWindow();

  // Handle close
  internals.window.on('closed', () => {
    internals.window = null;
  });

  // TODO: Move this out and clean up
  ipc.on('timer.start', (event, state) => {
    internals.interval = setInterval(() => {
      const timestamp = new Date().getTime();
      event.sender.send('timer.tick', timestamp);
      internals.tray.setTitle(formatTime(state.counter.duration - (timestamp - state.counter.start)));
    }, 1000);
  });

  ipc.on('timer.stop', () => {
    clearInterval(internals.interval);
  });

  ipc.on('timer.duration', (event, state) => {
    internals.duration = state.duration;
  });

  internals.positioner = new Positioner(internals.window);

  function click(e, bounds) {
    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) {
      return hideWindow();
    }

    if (internals.window && internals.window.isVisible()) {
      return hideWindow();
    }

    cachedBounds = bounds || cachedBounds;
    showWindow(cachedBounds);
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


function createWindow() {
  const window = new BrowserWindow({
    // resizeable: false,
    show: false,
    frame: false,
    width: 200,
    height: 200
  });

  if (process.env.NODE_ENV === 'production') {
    // Handle loss of focus
    window.on('blur', hideWindow);
  }

  // Load app
  if (process.env.HOT) {
    window.loadURL(`file://${__dirname}/app/hot-dev-app.html`);
  } else {
    window.loadURL(`file://${__dirname}/app/app.html`);
  }

  if (process.env.NODE_ENV === 'development') {
    window.openDevTools();
  }

  return window;
}

function showWindow(trayPos) {
  const windowPosition = (process.platform === 'win32') ? 'trayBottomCenter' : 'trayCenter';
  let noBoundsPosition = null;

  // Default the window to the right if `trayPos` bounds are undefined or null.
  if ((typeof trayPos === 'undefined' || trayPos.x === 0) && windowPosition.substr(0, 4) === 'tray') {
    noBoundsPosition = (process.platform === 'win32') ? 'bottomRight' : 'topRight';
  }

  const position = internals.positioner.calculate(noBoundsPosition || windowPosition, trayPos);

  internals.window.setPosition(position.x, position.y);
  internals.window.show();
  return;
}

function hideWindow() {
  if (!internals.window) return;
  internals.window.hide();
}