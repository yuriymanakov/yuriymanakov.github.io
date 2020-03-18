import React from 'react';
import { Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import store, { history } from '../redux/store';

import Home from '../screens/home/Home'

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <Route component={Home} path={'/'} />
    </Router>
  </Provider>
);
