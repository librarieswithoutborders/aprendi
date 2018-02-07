import React, { Component } from 'react';
import { fetchCollection } from '../actions/actions.js'
import { connect } from 'react-redux'
import CollectionInternalRouter from './CollectionInternalRouter'

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
      return <h5>Loading</h5>
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  let path = ownProps.match.params.collectionPath
  return {
    collectionPath: path,
    fetchedCollections: state.fetchedCollections || {},
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
