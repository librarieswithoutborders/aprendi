import React, { Component } from 'react';
import { connect } from 'react-redux'

const AdminModal = (props) => {
  console.log(props)
  // const {collections} = props
  return (
    <div className="admin-modal">
      <h1>This is a form</h1>
    </div>

  )
}

class AdminModalContainer extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    console.log(this.props)
    // this.props.fetchAdminModalData()
  }

  render() {
    console.log(this.props)
    // const { collections } = this.props

    // if (collections.length <= 0) {
    //   return <h1>Loading ...</h1>
    // } else {
      return <AdminModal />
    // }
  }
}

const mapStateToProps = () => {
  return {
    // collections: state.fetchedAdminModals
  }
}

const mapDispatchToProps = () => {
  return {
    // fetchAdminModalData: () => {
    //   dispatch(fetchAdminModalData())
    // },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminModalContainer)
