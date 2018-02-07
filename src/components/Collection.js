import React, { Component } from 'react';
import { connect } from 'react-redux'
import { showAdminModal, deleteCollection, deleteSubcollection } from '../actions/actions.js'

import Breadcrumbs from './Breadcrumbs'
import Grid from './Grid'

class Collection extends Component {
  constructor() {
    super()
  }
  render() {
    console.log(this.props)
    const { data, parent, parentType, breadcrumbs, createSubcollection, updateCollection, deleteCollection } = this.props
    const type = breadcrumbs.length > 1 ? "subcollection" : "collection"
    return (
      <div className="collection">
        {type == "subcollection" && <Breadcrumbs data={breadcrumbs} /> }
        <div className="collection__text-container">
          <h1 className="collection__title">{data.title}</h1>
          <p className="collection__description">{data.short_description}</p>
          <button onClick={() => updateCollection({data, type})} >Edit Collection</button>
          <button onClick={() => deleteCollection({data, type, parent, parentType})} >Delete Collection</button>
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
    updateCollection: ({data, type}) => {
      dispatch(showAdminModal({action:"edit", type:type, data: data}))
    },
    deleteCollection: ({data, type, parent, parentType}) => {
      console.log(parent)
      if (type === "collection") {
        dispatch(deleteCollection(data._id))
      } else {
        dispatch(deleteSubcollection({id: data._id, parentId: parent._id, parentType: parentType}))
      }

    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection)
