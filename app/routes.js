import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import CounterPage from './containers/CounterPage';
import SettingsPage from './containers/SettingsPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={CounterPage} />
    <Route path="/settings" component={SettingsPage} />
  </Route>
);
