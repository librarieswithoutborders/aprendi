import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {isLoggedIn} from './utils/AuthService'

import HomePage from './pages/HomePage'
import UserHomePage from './pages/UserHomePage'
import TeamHomePage from './pages/TeamHomePage'
import AllTeamsPage from './pages/AllTeamsPage'
import AllCollectionsPage from './pages/AllCollectionsPage'
import NotFoundPage from './pages/NotFoundPage'
import CollectionDataContainer from './pages/CollectionDataContainer'

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={isLoggedIn() ? UserHomePage : HomePage} />
      <Route exact path="/teams" component={AllTeamsPage} />
      <Route path="/teams/:teamPath" component={TeamHomePage} />
      <Route path="/collections" component={AllCollectionsPage} />
      <Route path="/:collectionPath" component={CollectionDataContainer} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>

)

export default routes
