import React, { Component } from 'react';
import { fetchCollectionList } from '../actions/actions.js';
import { connect } from 'react-redux'

import CollectionGridThumbnail from './CollectionGridThumbnail'

const CollectionGrid = (props) => {
  console.log(props)
  const {collections} = props
  return (
    <div className="collection-grid">
      {collections.map(settings => {
        return <CollectionGridThumbnail key={settings._id} settings={settings} />
      })}
    </div>
  )
}

class CollectionGridContainer extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    console.log(this.props)
    this.props.fetchCollectionList()
  }

  render() {
    console.log(this.props)
    const { collections } = this.props

    if (collections.length === 0) {
      return <h1>Loading ...</h1>
    } else {
      return <CollectionGrid collections={collections}/>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    collections: state.collectionList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollectionList: () => {
      dispatch(fetchCollectionList())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionGridContainer)
