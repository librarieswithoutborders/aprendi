import React from 'react';
import { requireAuth } from './utils/AuthService';
import HomePage from './components/HomePage';
// import NotFoundPage from './NotFoundPage';
import AuthCallback from './components/AuthCallback';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TopNav from './components/TopNav';

const routes = (
  <Router>
    <div>
      <TopNav />
      <Route exact path="/" component={HomePage} />
      <Route path="/special" component={HomePage} onEnter={requireAuth} />
      <Route path="/callback" component={AuthCallback} />
    </div>
  </Router>

)

export default routes;
