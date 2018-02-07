import React, { Component } from 'react';
import { connect } from 'react-redux'
import { showAdminModal } from '../actions/actions.js'

import Breadcrumbs from './Breadcrumbs'
import Grid from './Grid'

class Collection extends Component {
  constructor() {
    super()
  }
  render() {
    console.log(this.props)
    const { data, breadcrumbs, createSubcollection } = this.props
    const type = breadcrumbs.length > 1 ? "subcollection" : "collection"
    return (
      <div className="collection">
        {type == "subcollection" && <Breadcrumbs data={breadcrumbs} /> }
        <div className="collection__text-container">
          <h1 className="collection__title">{data.title}</h1>
          <p className="collection__description">{data.short_description}</p>
          <button onClick={() => editCollection(data)} >Edit Collection</button>
        </div>
        <div className="collection__contents">
          <Grid data={data.subcollections} createNew={() => createSubcollection({parentId:data._id, parentType:type})}/>
        </div>
        <div className="collection__contents">
          <Grid data={data.resources} createNew={() => createResource({parentId:data._id, parentType:type})}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    createSubcollection: (parent) => {
      console.log(parent)
      dispatch(showAdminModal({action:"create", type:"subcollection", parent: parent}))
    },
    createResource: (parent) => {
      console.log(parent)
      dispatch(showAdminModal({action:"create", type:"resource", parent: parent}))
    },
    editCollection: (data) => {
      dispatch(showAdminModal({action:"edit", type:"collection", data: data}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection)
