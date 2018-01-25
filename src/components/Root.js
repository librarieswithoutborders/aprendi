import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import TopNav from './TopNav';

export default class Root extends Component {
  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
      <Router>
        <div>
          <TopNav />
          <Route exact path="/" component={HomePage}/>
        </div>
      </Router>
      </Provider>
    );
  }
}
