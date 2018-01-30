import React, { Component } from 'react';
import { showAdminModal } from '../actions/actions.js';
import { connect } from 'react-redux'

const Collection = (props) => {
  console.log(props)
  const { editCollectionFunc } = props
  return (
    <div className="collection">
      <h1>This is a collection</h1>
      <button onClick={() => editCollectionFunc()} >Edit Collection</button>
    </div>
  )
}

class CollectionContainer extends Component {
  constructor() {
    super()
    console.log("in collection")
  }

  componentWillMount() {
    console.log(this.props)
    // this.props.fetchCollectionData()
  }

  editCollection() {
    console.log("editing collection")
    const { showAdminModal } = this.props;

    showAdminModal();
  }

  render() {
    console.log(this.props)
    // const { collections } = this.props

    // if (collections.length <= 0) {
    //   return <h1>Loading ...</h1>
    // } else {
      return <Collection editCollectionFunc={() => this.editCollection()}/>
    // }
  }
}

const mapStateToProps = () => {
  return {
    // collections: state.fetchedCollections
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showAdminModal: () => {
      dispatch(showAdminModal())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer)
