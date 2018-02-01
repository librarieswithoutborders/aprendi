import React, { Component } from 'react';
import { showAdminModal, fetchCollectionData } from '../actions/actions.js';
import { connect } from 'react-redux'
import Grid from './Grid'

let resourceData = [
  {
    title: "Lorem Ipsum",
    slug: "lorem_ipsum",
    // image:
    short_description: "Lorem Ipsum",
    language: "Lorem Ipsum",
    format: "Lorem Ipsum",
    source_organization: "Lorem Ipsum",
    source_url: "Lorem Ipsum",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Lorem Ipsum",
    slug: "lorem_ipsum",
    // image:
    short_description: "Lorem Ipsum",
    language: "Lorem Ipsum",
    format: "Lorem Ipsum",
    source_organization: "Lorem Ipsum",
    source_url: "Lorem Ipsum",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Lorem Ipsum",
    slug: "lorem_ipsum",
    // image:
    short_description: "Lorem Ipsum",
    language: "Lorem Ipsum",
    format: "Lorem Ipsum",
    source_organization: "Lorem Ipsum",
    source_url: "Lorem Ipsum",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Lorem Ipsum",
    slug: "lorem_ipsum",
    // image:
    short_description: "Lorem Ipsum",
    language: "Lorem Ipsum",
    format: "Lorem Ipsum",
    source_organization: "Lorem Ipsum",
    source_url: "Lorem Ipsum",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

let collectionData = {
  title: "Lorem Ipsum",
  slug: "lorem_ipsum",
  // image:
  short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  long_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit lacus vitae felis volutpat molestie. Etiam posuere sapien libero, non efficitur nibh lacinia in. Phasellus molestie feugiat justo, quis blandit tellus porttitor in. Nam condimentum est dolor, in fermentum diam congue in. Curabitur id est tempus, congue dolor id, ultricies eros. Cras vel enim a augue dapibus tincidunt non non nibh. Vivamus ornare ac eros sit amet mollis. Nunc nulla tortor, volutpat sit amet egestas quis, gravida vel odio. In convallis mi magna, id venenatis justo pharetra id.",
  language: "Lorem Ipsum",
  disclaimer_message: "Lorem Ipsum",
  // subcollections: [[{ type: Schema.Types.ObjectId, ref: 'CollectionSchema' }]],
  resources: resourceData,
  organization: "Lorem Ipsum",
  default_zoom: 5,
  // editing_users: [[{ type: Schema.Types.ObjectId, ref: 'User' }]],
  createdAt: new Date(),
  updatedAt: new Date(),
}

const Collection = (props) => {
  console.log(props)
  const { editCollectionFunc } = props
  return (
    <div className="collection">
      <div className="collection__text-container">
        <h1 className="collection__title">{collectionData.title}</h1>
        <p className="collection__description">{collectionData.short_description}</p>
        <button onClick={() => editCollectionFunc()} >Edit Collection</button>
      </div>
      <div className="collection__contents">
        <Grid data={collectionData.resources} />
      </div>
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
    this.props.fetchCollectionData(this.props.collectionId)
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

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  let id = ownProps.match.params.collectionId
  return {
    collectionId: id,
    collectionData: state.fetchedCollections[id]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollectionData: (id) => {
      dispatch(fetchCollectionData(id))
    },
    showAdminModal: () => {
      dispatch(showAdminModal())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer)
