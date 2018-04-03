import React from 'react';
import HomePage from './components/HomePage';
import UserHomePage from './components/UserHomePage';
import TeamHomePage from './components/TeamHomePage';
import AllTeamsPage from './components/AllTeamsPage';
import AllCollectionsPage from './components/AllCollectionsPage';
import NotFoundPage from './components/NotFoundPage';
import AuthCallback from './components/AuthCallback';
import CollectionDataContainer from './components/CollectionDataContainer';

import { Route, Switch } from 'react-router-dom';
import { isLoggedIn } from './utils/AuthService'

const routes = (
    <div>
        <Switch>
          <Route exact path="/" component={isLoggedIn() ? UserHomePage : HomePage} />
          <Route path="/callback" component={AuthCallback} />
          <Route exact path="/teams" component={AllTeamsPage} />
          <Route path="/teams/:teamPath" component={TeamHomePage} />
          <Route path="/collections" component={AllCollectionsPage} />
          <Route path="/:collectionPath" component={CollectionDataContainer} />
          <Route component={NotFoundPage} />
        </Switch>
    </div>

)

export default routes;
