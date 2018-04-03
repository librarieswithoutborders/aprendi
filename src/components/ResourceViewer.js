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

    let content = resourceList[currIndex]

    let nextPrevFunctions = {
      next: currIndex !== (this.numResources - 1) ? () => incrementCurrIndex(currIndex) : null,
      prev: currIndex !== 0 ? () => decrementCurrIndex(currIndex) : null
    }

    let editingFunctions = {
      removeResource: (editingMode && parent) ? (id) => removeResourceFromCollection(id, parent) : null,
      deleteResource: editingMode ? (data) => deleteResource(data) : null,
      updateResource: editingMode ? (data) => updateResource(data) : null
    }

    return (
      <div className="resource-viewer">
        <div className="resource-viewer__header">
          {nextPrevFunctions.prev &&
            <div className="resource-viewer__next-prev prev" onClick={nextPrevFunctions.prev}>
              <div className="resource-viewer__next-prev__arrow-container" >
                <SvgIcon name="arrow" />
              </div>
            </div>
          }
          <div className="resource-viewer__header__content">
            {resourceList.map((d, i) => {
              const leftOffset = ((2*(i - currIndex) + 1) * 50) + "%"
              console.log(i, leftOffset)
              return (
                <h1 key={i} className="resource-viewer__header__text" style={{left: leftOffset, opacity: i === currIndex ? 1 : 0}}>{d.title}</h1>
              )
            })}
          </div>
          {nextPrevFunctions.next &&
            <div className="resource-viewer__next-prev next" onClick={nextPrevFunctions.next}>
              <div className="resource-viewer__next-prev__arrow-container" >
                <SvgIcon name="arrow" />
              </div>
            </div>
          }
        </div>
        <div className="resource-viewer__content">
          <Resource content={content} />
        </div>
        {editingMode &&
          <div className="resource-viewer__footer">
            <div className="resource-viewer__footer__content">
              <div className="resource-viewer__footer__button-container">
                {editingFunctions.updateResource &&
                  <h5 className="resource-viewer__footer__button" onClick={() => updateResource(content)}>Edit Resource</h5>
                }
                {editingFunctions.removeResource &&
                  <h5 className="resource-viewer__footer__button" onClick={() => removeResource(content)}>Remove Resource From Collection</h5>
                }
                {editingFunctions.deleteResource &&
                  <h5 className="resource-viewer__footer__button" onClick={() => deleteResource(content)}>Delete Resource</h5>
                }
              </div>
            </div>
          </div>
        }
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
