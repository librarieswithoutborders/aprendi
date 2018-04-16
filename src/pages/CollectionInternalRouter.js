import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch} from 'react-router-dom'

import Grid from '../components/sitewide-components/Grid'
import CollectionPage from './CollectionPage'

import {showAdminModal} from '../actions/index'
import {fetchCollection} from '../actions/collection'
import {PropsRoute} from '../utils/propsRoute'


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
        <PropsRoute exact path={`${match.path}/`} component={CollectionPage} breadcrumbs={breadcrumbs} parent={parent} parentType={parentType} data={subcollectionData} />
        <PropsRoute path={`${match.path}/:subPath`} component={RecursiveRouter} breadcrumbs={breadcrumbs} parent={subcollectionData} parentType="subcollection"/>
      </div>
    )
  }
  return (
    <div>
      <PropsRoute path={`${match.path}/`} component={CollectionPage} breadcrumbs={breadcrumbs} parent={parent} parentType={parentType} data={subcollectionData} />
    </div>
  )
}

const CollectionInternalRouter = ({match, data}) => {
  const breadcrumbs = [{title: data.title, path: data.path}]
  return (
    <div>
      <PropsRoute exact path={`${match.path}/`} component={CollectionPage} breadcrumbs={breadcrumbs} data={data} />
      <PropsRoute path={`${match.path}/:subPath`} component={RecursiveRouter} breadcrumbs={breadcrumbs} parent={data} parentType="collection"/>
    </div>
  )
}

export default CollectionInternalRouter
