import React, {Component} from 'react';
import {connect} from 'react-redux'

import CollectionInternalRouter from './CollectionInternalRouter'
import LoadingIcon from '../components/sitewide-components/LoadingIcon'

import {fetchCollection, resetCurrCollection} from '../actions/collection'

class CollectionDataContainer extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    const {collectionPath, currCollection, fetchCollection} = this.props;
    if (!currCollection || typeof currCollection !== 'object') {
      fetchCollection(collectionPath)
    }
  }

  componentWillUnmount() {
    this.props.resetCurrCollection()
  }

  componentWillReceiveProps(nextProps) {
    const {collectionPath, history} = this.props;


    if (nextProps.currCollection === 'Not Found') {
      history.replace(`/collections/?not_found=${collectionPath}`)
    }

    // collection path was edited
    if (this.props.currCollection && nextProps.currCollection && this.props.currCollection.path && nextProps.currCollection.path && this.props.currCollection.path !== nextProps.currCollection.path) {
      history.replace(`/${nextProps.currCollection.path}`)
    }

    // collection was deleted
    // if (this.props.currCollection && !nextProps.currCollection) {
    //   // history.replace('/')
    // }

    // subcollection was changed, refetching collection
    if (nextProps.currCollection === 'Invalid') {
      const {collectionPath, fetchCollection} = nextProps;
      fetchCollection(collectionPath)
    }
  }

  render() {
    const {collectionPath, currCollection, match} = this.props;
    if (currCollection && currCollection !== 'Fetching' && currCollection !== 'Not Found' && currCollection !== 'Invalid') {
      return <CollectionInternalRouter data={currCollection} match={match} />
    }
    return <LoadingIcon />
  }
}

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.match.params.collectionPath
  return {
    collectionPath: path,
    currCollection: state.currCollection,
    currTeam: state.currTeam
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollection: id => {
    dispatch(fetchCollection(id))
  },
  resetCurrCollection: () => {
    dispatch(resetCurrCollection())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDataContainer)
