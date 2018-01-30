import React from 'react';
import { requireAuth } from './utils/AuthService';
import HomePage from './components/HomePage';
import UserHomePage from './components/UserHomePage';
// import NotFoundPage from './NotFoundPage';
import AuthCallback from './components/AuthCallback';
import Collection from './components/Collection';

import { Route, Switch } from 'react-router-dom';

const routes = (

    <div>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/callback" component={AuthCallback} />
          <Route exact path="/users/:userId" component={UserHomePage} />
          <Route path="/:collectionId" component={Collection} />
          <Route path="/special" component={HomePage} onEnter={requireAuth} />
        </Switch>

    </div>

)

export default routes;
