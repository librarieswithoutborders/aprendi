import React, { Component } from 'react';
import { setCurrResourceIndex, invalidateCurrCollection, deleteResource, collectionRemoveResource, subcollectionRemoveResource, hideResourceViewer} from '../actions/actions.js'
import { connect } from 'react-redux'
import Resource from './Resource'

class ResourceViewer extends Component {
  constructor(props) {
    super(props)

    this.numResources = props.resourceList.length
  }

  render() {
    const {decrementCurrIndex, incrementCurrIndex, resourceList, parent, currIndex, deleteResource, removeResourceFromCollection} = this.props

    let nextPrevFunctions = {
      next: currIndex !== (this.numResources - 1) ? () => incrementCurrIndex(currIndex) : null,
      prev: currIndex !== 0 ? () => decrementCurrIndex(currIndex) : null
    }

    return (
      <div className="resource-viewer">
        <Resource
          content={resourceList[currIndex]}
          nextPrevFunctions={nextPrevFunctions}
          removeResource={parent ? (id) => removeResourceFromCollection(id, parent) : null}
          deleteResource={(data) => deleteResource(data)}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    parent: state.resourceViewerContent.parent,
    resourceList: state.resourceViewerContent.resourceList,
    currIndex: state.resourceViewerContent.currIndex,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceViewer)
