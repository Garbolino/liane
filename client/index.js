import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory'
import { browserHistory } from 'react-router';
import { ConnectedRouter as Router } from 'react-router-redux';

import configureStore from 'store';
import authService from 'services/auth';

import Application from 'app';

import "normalize.css";
import "skeleton-css/css/skeleton.css";
import 'font-awesome/css/font-awesome.css';
import 'styles/global.css';

const store = configureStore();
const history = createHistory();

authService(store);

ReactDom.render(
  <Provider store={store}>
    <Router history={history}>
      <Application />
    </Router>
  </Provider>,
  document.getElementById('app')
);
