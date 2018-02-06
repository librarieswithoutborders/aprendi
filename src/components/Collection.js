import React, { Component } from 'react';

import Breadcrumbs from './Breadcrumbs'
import Grid from './Grid'

const Collection = (props) => {
  console.log(props)
  const { data, breadcrumbs, editCollectionFunc } = props
  return (
    <div className="collection">
      {breadcrumbs.length > 1 && <Breadcrumbs data={breadcrumbs} /> }
      <div className="collection__text-container">
        <h1 className="collection__title">{data.title}</h1>
        <p className="collection__description">{data.short_description}</p>
        <button onClick={() => editCollectionFunc(data)} >Edit Collection</button>
      </div>
      <div className="collection__contents">
        <Grid data={data.subcollections} />
      </div>
      <div className="collection__contents">
        <Grid data={data.resources} />
      </div>
    </div>
  )
}

export default Collection
