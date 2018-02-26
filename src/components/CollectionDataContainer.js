import React, { Component } from 'react';
import { fetchCollection, resetCurrCollection } from '../actions/actions.js'
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
    const {collectionPath, currCollection, fetchCollection} = this.props;
    if (!currCollection) {
      fetchCollection(collectionPath)
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("CHANGEDDDDDDDD")
    console.log(this.props, nextProps);
    console.log("receiving props")
    const {history} = this.props;

    if (nextProps.currCollection === "Not Found") {
      resetCurrCollection()
      if (nextProps.currTeam) {
        history.push("/teams/" + nextProps.currTeam.path)
      } else {
        history.push("/")
      }
    }

    // collection path was edited
    if (this.props.currCollection && nextProps.currCollection && this.props.currCollection.path && nextProps.currCollection.path && this.props.currCollection.path !== nextProps.currCollection.path) {
      console.log("new path!!")

      history.replace("/" + nextProps.currCollection.path)
    }

    // collection was deleted
    if (this.props.currCollection && !nextProps.currCollection) {
      console.log("collection deleted!!")
      history.replace('/teams/' + nextProps.currTeam.path)
    }

    // subcollection was changed, refetching collection
    if (nextProps.currCollection === "Invalid") {
      console.log("collection invalid!!")
      const {collectionPath, fetchCollection} = nextProps;
      fetchCollection(collectionPath)
    }
  }

  render() {
    console.log(this.props)
    const {collectionPath, currCollection, fetchCollection, match} = this.props;
    console.log(currCollection, collectionPath)
    if (currCollection && currCollection != "Fetching" && currCollection != "Not Found" && currCollection != "Invalid") {
      return <CollectionInternalRouter data={currCollection} match={match} />
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
    currCollection: state.currCollection,
    currTeam: state.currTeam
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollection: (id) => {
      dispatch(fetchCollection(id))
    },
    resetCurrCollection: () => {
      dispatch(resetCurrCollection())
    },
    showAdminModal: (props) => {
      dispatch(showAdminModal(props))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDataContainer)
