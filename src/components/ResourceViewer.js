import React, { Component } from 'react';
import { setCurrResourceIndex } from '../actions/actions.js'
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
    const {decrementCurrIndex, incrementCurrIndex, resourceList, currIndex} = this.props

    console.log(resourceList, currIndex)
    let nextPrevFunctions = {
      next: currIndex !== this.numResources ? () => incrementCurrIndex(currIndex) : null,
      prev: currIndex !== 0 ? () => decrementCurrIndex(currIndex) : null
    }

    return (
      <div className="resource-viewer">
        <Resource content={resourceList[currIndex]} nextPrevFunctions={nextPrevFunctions}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceViewer)
