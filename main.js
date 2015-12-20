'use strict';

const electron = require('electron');
const path = require('path');
const GhReleases = require('electron-gh-releases');
const WindowHandler = require('./main/window-handler');
const tick = require('./main/tick');
const runner = require('./main/runner');
const appActions = require('./common/action-types/app');
const bus = require('./main/event-bus');
const notifier = require('node-notifier');
const pkg = require('./package.json');
const app = electron.app;
const Tray = electron.Tray;
const dialog = electron.dialog;
const crashReporter = electron.crashReporter;
const ipc = electron.ipcMain;
const updater = new GhReleases({
  repo: pkg.repo,
  currentVersion: app.getVersion()
});

require('electron-debug')();
crashReporter.start();

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  const tray = new Tray(path.join(app.getAppPath(), 'IconTemplate.png'));
  let cachedBounds;
  let appUrl;

  // Load app
  if (process.env.HOT) {
    appUrl = `file://${__dirname}/app/hot-dev-app.html`;
  } else {
    appUrl = `file://${__dirname}/app/app.html`;
  }

  let windowHandler = new WindowHandler(appUrl);

  // Handle close
  windowHandler.window.on('closed', () => {
    windowHandler = null;
  });

  bus.on(appActions.APP_TITLE, (title) => {
    tray.setTitle(title);
  });

  bus.on(appActions.APP_NOTIFY, (notification) => {
    notifier.notify(notification);
  });

  runner(ipc, tick);

  function click(e, bounds) {
    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) {
      return windowHandler.hide();
    }

    if (windowHandler.window.isVisible()) {
      return windowHandler.hide();
    }

    cachedBounds = bounds || cachedBounds;
    windowHandler.show(cachedBounds);
  }

  // Register tray events
  tray
  .on('click', click)
  .on('double-click', click);

  // Hide Dock
  if (app.dock) {
    app.dock.hide();
  }

  checkAutoUpdate(false);

  function checkAutoUpdate(showAlert) {

    // Check for updates
    updater.check((err, status) => {
      console.log(err)
      console.log(status)
      if (!err && status) {
        updater.download();
      } else {
        if (showAlert) {
          dialog.showMessageBox({
            type: 'info',
            buttons: ['Close'],
            title: 'No update available',
            message: 'You are currently running the latest version of Pomo.'
          });
        }
      }
    });

    updater.on('update-downloaded', (info) => {
      console.log(info)
      dialog.showMessageBox({
        type: 'question',
        buttons: ['Update & Restart', 'Cancel'],
        title: 'Update Available',
        cancelId: 99,
        message: 'There is an update available. Would you like to update Pomo now?'
      }, (response) => {
        console.log('Exit: ' + response);
        if (response === 0) {
          updater.install()
        }
      });
    })
  }
});
