/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Root from './components/Root';
import store from './store'
import './styles/index.scss';
require('./favicon.ico'); // Tell webpack to load favicon.ico

render(
  <AppContainer>
    <Root store={store}/>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
