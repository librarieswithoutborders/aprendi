import React, {Component} from 'react';
import {showAdminModal} from '../actions/index'
import {fetchCollection} from '../actions/collection'
import {connect} from 'react-redux'
import Grid from './Grid'
import {Route, Switch} from 'react-router-dom'
import {PropsRoute} from '../utils/propsRoute'
import Collection from './Collection'

const RecursiveRouter = ({match, breadcrumbs, parent, parentType}) => {
  const {subPath} = match.params

  const data = parent.subcollections

  let subcollectionData;
  data.forEach(d => {
    if (d.path === subPath) {
      subcollectionData = d
      return
    }
  })

  if (subcollectionData) {
    breadcrumbs.push({title: subcollectionData.title, path: subcollectionData.path});
    return (
      <div>
        <PropsRoute exact path={`${match.path}/`} component={Collection} breadcrumbs={breadcrumbs} parent={parent} parentType={parentType} data={subcollectionData} />
        <PropsRoute path={`${match.path}/:subPath`} component={RecursiveRouter} breadcrumbs={breadcrumbs} parent={subcollectionData} parentType="subcollection"/>
      </div>
    )
  }
  return (
    <div>
      <PropsRoute path={`${match.path}/`} component={Collection} breadcrumbs={breadcrumbs} parent={parent} parentType={parentType} data={subcollectionData} />
    </div>
  )
}

const CollectionInternalRouter = ({match, data}) => {
  const breadcrumbs = [{title: data.title, path: data.path}]
  return (
    <div>
      <PropsRoute exact path={`${match.path}/`} component={Collection} breadcrumbs={breadcrumbs} data={data} />
      <PropsRoute path={`${match.path}/:subPath`} component={RecursiveRouter} breadcrumbs={breadcrumbs} parent={data} parentType="collection"/>
    </div>
  )
}

export default CollectionInternalRouter

const hasMatchingSubPath = (data, path) => {

}
