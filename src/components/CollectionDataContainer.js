import React, { Component } from 'react';
import { fetchCollection } from '../actions/actions.js'
import { connect } from 'react-redux'
import CollectionInternalRouter from './CollectionInternalRouter'
import LoadingIcon from './LoadingIcon'

class CollectionDataContainer extends Component {
  constructor() {
    super()
    console.log("in collection")
  }

  componentWillMount() {
    console.log(this.props)
    const {collectionPath, fetchedCollections, fetchCollection} = this.props;
    if (!fetchedCollections[collectionPath]) {
      fetchCollection(collectionPath)
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log("receiving props")
    const {collectionPath, fetchCollection, currCollectionInvalidated} = this.props;
    if (nextProps.currCollectionInvalidated && !currCollectionInvalidated) {
      fetchCollection(collectionPath)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps)
  }

  render() {
    console.log(this.props)
    const {collectionPath, fetchedCollections, fetchCollection, match} = this.props;
    console.log(fetchedCollections, collectionPath)
    if (fetchedCollections[collectionPath]) {
      return <CollectionInternalRouter data={fetchedCollections[collectionPath]} match={match} />
    } else {
      return <LoadingIcon />
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  let path = ownProps.match.params.collectionPath
  return {
    collectionPath: path,
    fetchedCollections: state.fetchedCollections || {},
    currCollectionInvalidated: state.currCollectionInvalidated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollection: (id) => {
      dispatch(fetchCollection(id))
    },
    showAdminModal: (props) => {
      dispatch(showAdminModal(props))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDataContainer)
