'use strict';

const electron = require('electron');
const path = require('path');
var releases = require('electron-gh-releases');
const WindowHandler = require('./main/window-handler');
const tick = require('./main/tick');
const runner = require('./main/runner');
const appActions = require('./common/action-types/app');
const bus = require('./main/event-bus');
const notifier = require('node-notifier');
const app = electron.app;
const Tray = electron.Tray;
const dialog = electron.dialog;
const crashReporter = electron.crashReporter;
const ipc = electron.ipcMain;

require('electron-debug')();
crashReporter.start();

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
console.log(app.getVersion())

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

    var autoUpdateOptions = {
      repo: 'michaeljacobdavis/pomo',
      currentVersion: app.getVersion()
    };

    var update = new releases(autoUpdateOptions, function (autoUpdater) {
      autoUpdater
        .on('error', function(event, message) {
          console.log('ERRORED.');
          console.log('Event: ' + JSON.stringify(event) + '. MESSAGE: ' + message);
        })
        .on('update-downloaded', function (event, releaseNotes, releaseName,
          releaseDate, updateUrl, quitAndUpdate) {
          console.log('Update downloaded');
          confirmAutoUpdate(quitAndUpdate);
        });
    });

    // Check for updates
    update.check(function (err, status) {
      if (err || !status) {
        if (showAlert) {
          dialog.showMessageBox({
            type: 'info',
            buttons: ['Close'],
            title: 'No update available',
            message: 'You are currently running the latest version of Pomo.'
          });
        }
      }

      if (!err && status) {
        update.download();
      }
    });
  }

  function confirmAutoUpdate(quitAndUpdate) {
    dialog.showMessageBox({
      type: 'question',
      buttons: ['Update & Restart', 'Cancel'],
      title: 'Update Available',
      cancelId: 99,
      message: 'There is an update available. Would you like to update Pomo now?'
    }, function (response) {
      console.log('Exit: ' + response);
      if (response === 0) {
        quitAndUpdate();
      }
    } );
  }
});
