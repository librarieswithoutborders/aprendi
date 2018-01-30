import React, { Component } from 'react';
import { connect } from 'react-redux'

const AdminCollectionEditor = (props) => {
  console.log(props)
  // const {collections} = props
  // return (
  //
  //
  // )
}

class AdminCollectionEditorContainer extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    console.log(this.props)
    // this.props.fetchAdminCollectionEditorData()
  }

  render() {
    console.log(this.props)
    // const { collections } = this.props

    // if (collections.length <= 0) {
    //   return <h1>Loading ...</h1>
    // } else {
      return <AdminCollectionEditor />
    // }
  }
}

const mapStateToProps = () => {
  return {
    // collections: state.fetchedAdminCollectionEditors
  }
}

const mapDispatchToProps = () => {
  return {
    // fetchAdminCollectionEditorData: () => {
    //   dispatch(fetchAdminCollectionEditorData())
    // },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCollectionEditorContainer)
