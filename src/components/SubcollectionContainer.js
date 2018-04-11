import React, {Component} from 'react';
import {showAdminModal} from '../actions/index'
import {fetchCollection} from '../actions/collection'

import {connect} from 'react-redux'
import Grid from './Grid'
import {PropsRoute} from '../utils/propsRoute'
import Collection from './Collection'

const SubcollectionContainer = props => {
  console.log(props)
  const {match, subcollections} = props,
    {collectionPath, subcollectionPath} = match.params;

  console.log(collectionPath, subcollectionPath)
  let subcollection;

  subcollections.forEach(subcoll => {
    if (subcoll.path === subcollectionPath) {
      subcollection = subcoll;
    }
  })

  if (subcollection) {
    return (
      <div>
        <PropsRoute exact path={`${match.path}/`} component={Collection} data={subcollection}/>
        <PropsRoute path={`${match.path}/:subcollectionPath`} component={SubcollectionContainer} subcollections={subcollection.subcollections}/>
      </div>
    )
  }
  return <h5>Not Found!</h5>
}

export default SubcollectionContainer
