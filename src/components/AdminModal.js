import React, { Component } from 'react';
import { connect } from 'react-redux'
import AdminCollectionForm from './AdminCollectionForm'
import AdminSubcollectionForm from './AdminSubcollectionForm'
import AdminResourceForm from './AdminResourceForm'

const AdminModal = (props) => {
  console.log(props)

  const {action, type, parent} = props

  console.log(action, type, parent)
  let form;

  switch(type) {
    case "collection":
      form = <AdminCollectionForm action={action} />
      break;
    case "subcollection":
      form = <AdminSubcollectionForm action={action} parent={parent} />
      break;
    case "resource":
      form = <AdminResourceForm data={data} />
      break;
  }

  return (
    <div className="admin-modal">
      <div className="admin-modal__content">
        {form}
      </div>
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
      return <AdminModal {...this.props.modalProps} />
    // }
  }
}

const mapStateToProps = (state) => {
  return {
    modalProps: state.adminModalContent,
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
