import React, { Component } from 'react';
import { connect } from 'react-redux'
import { showAdminModal, deleteCollection, deleteSubcollection, invalidateCurrCollection, showResourceViewer, hideResourceViewer } from '../actions/actions.js'

import Breadcrumbs from './Breadcrumbs'
import Grid from './Grid'

class Collection extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    console.log(this.props)
    const {location} = this.props

    if (location.hash != "") {
      console.log("there is a hash, it is: ", location.hash)
      this.renderResourceFromHash(location.hash.replace("#", ""))
    }
  }

  renderResourceFromHash(hash) {
    const { data, setResourceViewerContent, hideResourceViewer, location, history } = this.props

    let hashFound = false
    data.resources.forEach((d, i) => {
      if (d.path === hash) {
        hashFound = true
        setResourceViewerContent(data.resources, i)
        return
      }
    })

    if (!hashFound) {
      history.push(location.pathname)
      hideResourceViewer()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location, history } = this.props
    if (nextProps.location.hash != this.props.location.hash) {
      this.renderResourceFromHash(nextProps.location.hash.replace("#", ""))
    }
    if (nextProps.resourceViewerContent && this.props.resourceViewerContent && nextProps.resourceViewerContent.currIndex != this.props.resourceViewerContent.currIndex ) {
      let newHash = nextProps.resourceViewerContent.resourceList[nextProps.resourceViewerContent.currIndex].path
      history.push(location.pathname + "#" + newHash)
    }
  }

  render() {
    console.log(this.props)
    const { data, parent, parentType, breadcrumbs, createSubcollection, updateCollection, deleteCollection, createResource, setResourceViewerContent, history, location } = this.props
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
          <h5 className="collection__section-title">Subcollections</h5>
          <Grid
            data={data.subcollections}
            createNew={() => createSubcollection({parentId:data._id, parentType:type})}
            clickHandler={(itemList, clickedIndex) => { return history.push(location.pathname + "/" + itemList[clickedIndex].path); }}
          />
        </div>
        <div className="collection__contents">
          <h5 className="collection__section-title">Resources</h5>
          <Grid
            data={data.resources}
            createNew={() => createResource({parentId:data._id, parentType:type})}
            clickHandler={(data, i) => {history.push(location.pathname + "#" + data[i].path); setResourceViewerContent(data, i)}}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    resourceViewerContent: state.resourceViewerContent
  }
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
      dispatch(showAdminModal({action:"update", type:type, data: data}))
    },
    deleteCollection: ({data, type, parent, parentType}) => {
      console.log(parent)
      if (type === "collection") {
        dispatch(deleteCollection(data._id)).then(response => deleteCallback(response, dispatch))
      } else {
        dispatch(deleteSubcollection({id: data._id, parentId: parent._id, parentType: parentType})).then(response => deleteCallback(response, dispatch))
      }
    },
    setResourceViewerContent: (data, i) => {
      console.log(data, i)
      dispatch(showResourceViewer({resourceList: data, currIndex: i}))
    },
    hideResourceViewer: () => dispatch(hideResourceViewer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection)

const deleteCallback = (response, dispatch) => {
  console.log(response.payload)
  if (response.payload.status === 200) {
    dispatch(invalidateCurrCollection())
  }
}
