/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import Root from './pages/Root';
import store from './store'
import './styles/index.scss';
require('./favicon.ico'); // Tell webpack to load favicon.ico

render(
  <Root store={store}/>,
  document.getElementById('app')
);

if (module.hot) {
  console.log('MODULE HOT!')
  module.hot.accept('./pages/Root', () => {
    const NewRoot = require('./pages/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
