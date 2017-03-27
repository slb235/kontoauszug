// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import SettingsPage from './containers/SettingsPage';
import FidorPage from './containers/FidorPage';
import PaypalPage from './containers/PaypalPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/counter" component={CounterPage} />
    <Route path="/settings" component={SettingsPage} />
    <Route path="/fidor" component={FidorPage} />
    <Route path="/paypal" component={PaypalPage} />
  </Route>
);
