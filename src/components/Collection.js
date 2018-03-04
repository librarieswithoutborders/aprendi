import React, { Component } from 'react';
import { connect } from 'react-redux'
import { showAdminModal, deleteCollection, deleteSubcollection, invalidateCurrCollection, showResourceViewer, hideResourceViewer, updateCollection, updateSubcollection, collectionReorderChildren, subcollectionReorderChildren } from '../actions/actions.js'
import canUserEdit from '../utils/canUserEdit'

import PageHeader from './PageHeader'
import Breadcrumbs from './Breadcrumbs'
import Grid from './Grid'

class Collection extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    console.log(this.props)
    const {data, history, location} = this.props

    // subcollection does not exist -> redirect to one level up heirarchy
    if (!data) {
      let splitPieces = history.location.pathname.split('/');
      // url has trailing /
      if (splitPieces[splitPieces.length - 1] === "") {
        splitPieces.pop()
      }
      splitPieces.pop()
      history.replace(splitPieces.join("/"))
    }

    if (location.hash != "") {
      console.log("there is a hash, it is: ", location.hash)
      this.renderResourceFromHash(location.hash.replace("#", ""))
    }
  }

  renderResourceFromHash(hash) {
    const { data, setResourceViewerContent, hideResourceViewer, location, history, breadcrumbs } = this.props
    const type = breadcrumbs.length > 1 ? "subcollection" : "collection"
    let hashFound = false
    data.resources.forEach((d, i) => {
      if (d.path === hash) {
        hashFound = true
        setResourceViewerContent({parentType: type, parentId: data._id}, data.resources, i)
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
    const { data, parent, parentType, breadcrumbs, createSubcollection, updateCollection, deleteCollection, updateOrder, createResource, setResourceViewerContent, history, location, currTeam, editingMode } = this.props
    const type = breadcrumbs.length > 1 ? "subcollection" : "collection"

    console.log(currTeam)

    const headerContents = {
      title: data.title,
      byline: type === "collection" ? {label: data.team.team_name, path: "/teams/" + data.team.path} : null,
      image_url: data.image_url,
      short_description: data.short_description
    }

    return (
      <div className="collection">
        <PageHeader contents={headerContents} type={type} editingMode={editingMode} editFunc={() => updateCollection({data: data, type: type})} deleteFunc={() => deleteCollection({data: data, type: type, parent: parent, parentType: parentType, history: history})}/>
        {type == "subcollection" && <Breadcrumbs data={breadcrumbs} /> }
        <div className="collection__contents">
          <Grid
            data={data.subcollections}
            type="subcollection"
            createNew={() => createSubcollection({parentId:data._id, parentType:type})}
            clickHandler={(itemList, clickedIndex) => { return history.push(location.pathname + "/" + itemList[clickedIndex].path); }}
            reOrderHandler={(newOrder) => updateOrder({data:data, newOrder:newOrder, parentType:type, childType: "subcollection"})}
            isDraggable={true}
            editingMode={editingMode}
            createNewText="Create New Collection"
          />
        </div>
        <hr className="collection__divider" />
        <div className="collection__contents">
          <Grid
            data={data.resources}
            type="resource"
            createNew={() => createResource({parentId:data._id, parentType:type, parentResources:data.resources.map(d => d._id)}, currTeam._id)}
            clickHandler={(elem, i) => {history.push(location.pathname + "#" + elem[i].path); setResourceViewerContent({parentType: type, parentId:data._id}, data.resources, i)}}
            reOrderHandler={(newOrder) => updateOrder({data:data, newOrder:newOrder, parentType:type, childType: "resource"})}
            isDraggable={true}
            editingMode={editingMode}
            createNewText="Add New Resource"
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(canUserEdit)
  let canEdit = canUserEdit(state.currUser, state.currCollection, "collection")
  return {
    resourceViewerContent: state.resourceViewerContent,
    currTeam: state.currTeam,
    editingMode: canEdit
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createSubcollection: (parent) => {
      console.log(parent)
      dispatch(showAdminModal({action:"create", type:"subcollection", parent: parent}))
    },
    createResource: (parent, teamId) => {
      console.log(parent)
      dispatch(showAdminModal({action:"create", type:"resource", parent: parent, showExisting: true, team: teamId}))
    },
    updateCollection: ({data, type}) => {
      dispatch(showAdminModal({action:"update", type:type, data: data}))
    },
    deleteCollection: ({data, type, parent, parentType, history}) => {
      console.log(data)
      if (type === "collection") {
        dispatch(deleteCollection(data))
      } else {
        dispatch(deleteSubcollection({subcollectionInfo: data, parentId: parent._id, parentType: parentType}))
      }
    },
    updateOrder: ({data, parentType, childType, newOrder}) => {
      let newData = {}
      Object.assign(newData, data)

      if (childType === "subcollection") {
        newData.subcollections = newOrder
      } else {
        newData.resources = newOrder
      }
      if (parentType === "collection") {
        dispatch(collectionReorderChildren({data: newData}))
      } else if (parentType === "subcollection") {
        dispatch(subcollectionReorderChildren({data: newData}))
      }
    },
    setResourceViewerContent: (parent, resourceList, i) => {
      console.log(resourceList, i)
      dispatch(showResourceViewer({parent: parent, resourceList: resourceList, currIndex: i}))
    },
    hideResourceViewer: () => dispatch(hideResourceViewer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection)

const deleteCallback = (response, dispatch, history) => {
  console.log(response.payload)
  if (response.payload.status === 200) {
    dispatch(invalidateCurrCollection())
    console.log("DELETED!!!!", history.location.pathname.match(/.*\/(?!$)/))
    history.push(history.location.pathname.match(/.*\/(?!$)/)[0])
  }
}
