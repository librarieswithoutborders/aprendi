import React, { Component } from 'react';
import { connect } from 'react-redux'
import AdminCollectionForm from './AdminCollectionForm'
import AdminResourceForm from './AdminResourceForm'

const AdminModal = (props) => {
  console.log(props)
  const {formType, data} = props
  let form;

  switch(formType) {
    case "collection":
      form = <AdminCollectionForm data={data} />
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
      return <AdminModal {...this.props} />
    // }
  }
}

const mapStateToProps = (state) => {
  return {
    formType: state.adminModalContent.formType,
    data: state.adminModalContent.data
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
