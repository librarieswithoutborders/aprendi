import React, { Component } from 'react';
import { showAdminModal, fetchCollection } from '../actions/actions.js'
import { connect } from 'react-redux'
import Grid from './Grid'
import { Route, Switch } from 'react-router-dom'
import { PropsRoute } from '../utils/propsRoute'
import Collection from './Collection'

const RecursiveRouter = ({match, breadcrumbs, data}) => {

  const {subPath} = match.params
  console.log("rendering ", subPath)
  console.log(breadcrumbs)

  let subcollectionData;
  data.forEach(d => {
    if (d.path === subPath) {
      subcollectionData = d
      return
    }
  })

  if (subcollectionData) {
    breadcrumbs.push({ title: subcollectionData.title, path: subcollectionData.path });
    console.log(breadcrumbs)
    return (
      <div>
        <PropsRoute exact path={match.path + "/"} component={Collection} breadcrumbs={breadcrumbs} data={subcollectionData}/>
        <PropsRoute path={match.path + "/:subPath"} component={RecursiveRouter} breadcrumbs={breadcrumbs} data={subcollectionData.subcollections}/>
      </div>
    )
  } else {
    return <h5>Sub Path not found</h5>
  }
}

const CollectionInternalRouter = ({match, data}) => {
  console.log(match, data)
  let breadcrumbs = [{ title: data.title, path: data.path }]
  return (
    <div>
      <PropsRoute exact path={match.path + "/"} component={Collection} breadcrumbs={breadcrumbs} data={data}/>
      <PropsRoute path={match.path + "/:subPath"} component={RecursiveRouter} breadcrumbs={breadcrumbs} data={data.subcollections}/>
    </div>
  )
}

export default CollectionInternalRouter
