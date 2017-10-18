import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from 'store';
import authService from 'services/auth';

import Application from 'app';

import "normalize.css";
import "skeleton-css/css/skeleton.css";
import 'font-awesome/css/font-awesome.css';

const store = configureStore();

authService(store);

ReactDom.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('app')
);
