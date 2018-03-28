import React, { Component } from 'react';
import {showAdminModal} from '../actions/index'
import {invalidateCurrCollection, collectionRemoveResource} from '../actions/collection'
import {subcollectionRemoveResource} from '../actions/subcollection'
import {setCurrResourceIndex, deleteResource, hideResourceViewer} from '../actions/resource'

import { connect } from 'react-redux'
import Resource from './Resource'
import SvgIcon from './SvgIcon'
import canUserEdit from '../utils/canUserEdit'

class ResourceViewer extends Component {
  constructor(props) {
    super(props)

    this.numResources = props.resourceList.length
  }

  render() {
    const {decrementCurrIndex, incrementCurrIndex, resourceList, parent, currIndex, deleteResource, updateResource, removeResourceFromCollection, editingMode} = this.props

    let nextPrevFunctions = {
      next: currIndex !== (this.numResources - 1) ? () => incrementCurrIndex(currIndex) : null,
      prev: currIndex !== 0 ? () => decrementCurrIndex(currIndex) : null
    }

    return (
      <div className="resource-viewer">
        {nextPrevFunctions.prev &&
          <div className="resource-viewer__next-prev prev" onClick={nextPrevFunctions.prev}>
            <div className="resource-viewer__next-prev__arrow-container" >
              <SvgIcon name="arrow" />
            </div>
          </div>
        }
        {nextPrevFunctions.next &&
          <div className="resource-viewer__next-prev next" onClick={nextPrevFunctions.next}>
            <div className="resource-viewer__next-prev__arrow-container" >
              <SvgIcon name="arrow" />
            </div>
          </div>
        }
        <div className="resource-viewer__content">
          <Resource
            content={resourceList[currIndex]}
            removeResource={(editingMode && parent) ? (id) => removeResourceFromCollection(id, parent) : null}
            deleteResource={editingMode ? (data) => deleteResource(data) : null}
            updateResource={editingMode ? (data) => updateResource(data) : null}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let canEdit = canUserEdit(state.currUser, state.currCollection, "collection")
  console.log("CAN EDDDITTTT")
  console.log(canEdit)
  return {
    parent: state.resourceViewerContent.parent,
    resourceList: state.resourceViewerContent.resourceList,
    currIndex: state.resourceViewerContent.currIndex,
    editingMode: canEdit
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incrementCurrIndex: (currIndex) => {
      console.log(currIndex)
      dispatch(setCurrResourceIndex(currIndex + 1))
    },
    decrementCurrIndex: (currIndex) => {
      dispatch(setCurrResourceIndex(currIndex - 1))
    },
    removeResourceFromCollection: (resource, parent) => {
      if (parent.parentType === "collection") {
        dispatch(collectionRemoveResource(resource, parent.parentId))
      } else {
        dispatch(subcollectionRemoveResource(resource, parent.parentId))
      }
    },
    deleteResource: (resourceInfo) => {
      dispatch(deleteResource(resourceInfo))
    },
    updateResource: (data) => {
      dispatch(hideResourceViewer())
      dispatch(showAdminModal({action:"update", type:"resource", data: data}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceViewer)
