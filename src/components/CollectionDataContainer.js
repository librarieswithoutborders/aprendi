import React, { Component } from 'react';
import { fetchCollection } from '../actions/collection'
import { connect } from 'react-redux'
import CollectionInternalRouter from './CollectionInternalRouter'
import LoadingIcon from './LoadingIcon'

class CollectionDataContainer extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    const {collectionPath, currCollection, fetchCollection} = this.props;
    if (!currCollection || typeof currCollection != 'object') {
      fetchCollection(collectionPath)
    }
  }

  componentWillReceiveProps(nextProps) {
    const {history} = this.props;

    if (nextProps.currCollection === "Not Found") {
      if (nextProps.currTeam) {
        history.push("/teams/" + nextProps.currTeam.path)
      } else {
        history.push("/")
      }
    }

    // collection path was edited
    if (this.props.currCollection && nextProps.currCollection && this.props.currCollection.path && nextProps.currCollection.path && this.props.currCollection.path !== nextProps.currCollection.path) {
      history.replace("/" + nextProps.currCollection.path)
    }

    // collection was deleted
    // if (this.props.currCollection && !nextProps.currCollection) {

    //   history.replace('/teams/' + nextProps.currTeam.path)
    // }

    // subcollection was changed, refetching collection
    if (nextProps.currCollection === "Invalid") {
      const {collectionPath, fetchCollection} = nextProps;
      fetchCollection(collectionPath)
    }
  }

  render() {
    const {collectionPath, currCollection, fetchCollection, match} = this.props;
    if (currCollection && currCollection != "Fetching" && currCollection != "Not Found" && currCollection != "Invalid") {
      return <CollectionInternalRouter data={currCollection} match={match} />
    } else {
      return <LoadingIcon />
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let path = ownProps.match.params.collectionPath
  return {
    collectionPath: path,
    currCollection: state.currCollection,
    currTeam: state.currTeam
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
