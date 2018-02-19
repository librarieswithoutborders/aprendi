import React, { Component } from 'react';
import { setCurrResourceIndex, invalidateCurrCollection, deleteResource, removeResourceFromCollection, hideResourceViewer} from '../actions/actions.js'
import { connect } from 'react-redux'
import Resource from './Resource'

class ResourceViewer extends Component {
  constructor(props) {
    super(props)

    this.numResources = props.resourceList.length
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps)
  }

  render() {
    const {decrementCurrIndex, incrementCurrIndex, resourceList, parent, currIndex, deleteResource} = this.props

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
          deleteResource={(id) => deleteResource({id: id})}/>
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
    removeResourceFromCollection: (id, parent) => {
      dispatch(removeResourceFromCollection(id, parent)).then(response => deleteCallback(response, dispatch))
    },
    deleteResource: ({id, history}) => {
      dispatch(deleteResource(id)).then(response => deleteCallback(response, dispatch))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceViewer)

const deleteCallback = (response, dispatch) => {
  console.log(response.payload)
  if (response.payload.status === 200) {
    dispatch(hideResourceViewer())
    dispatch(invalidateCurrCollection())
    console.log("DELETED!!!!", history.location.pathname.match(/.*\/(?!$)/))
    history.push(history.location.pathname.match(/.*\/(?!$)/)[0])
  }
}
