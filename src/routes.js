import React from 'react';
import { requireAuth } from './utils/AuthService';
import HomePage from './components/HomePage';
import TeamHomePage from './components/TeamHomePage';
// import NotFoundPage from './NotFoundPage';
import AuthCallback from './components/AuthCallback';
import CollectionDataContainer from './components/CollectionDataContainer';

import RootAdminPage from './components/RootAdminPage';

import { Route, Switch } from 'react-router-dom';

const routes = (

    <div>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/callback" component={AuthCallback} />
          <Route exact path="/admin" component={RootAdminPage} />
          <Route exact path="/teams" component={RootAdminPage} />
          <Route exact path="/teams/:teamPath" component={TeamHomePage} />
          <Route path="/:collectionPath" component={CollectionDataContainer} />
          <Route path="/special" component={HomePage} onEnter={requireAuth} />
        </Switch>

    </div>

)

export default routes;
