import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Text, Radio, RadioGroup, Select, Checkbox, TextArea } from 'react-form'
import { languageOptions, zoomOptions } from '../constants'
import { createSubcollection, editSubcollection, hideAdminModal } from '../actions/actions.js';


class AdminSubcollectionForm extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    console.log(this.props)
    // this.props.fetchAdminSubcollectionFormData()
  }

  componentWillReceiveProps(nextProps) {
    const {hideAdminModal} = this.props;
    // console.log(nextProps.subcollectionUpdateStatus)

    // if (nextProps.subcollectionUpdateStatus == "Success") {
    //   hideAdminModal()
    // }
  }

  submitForm(submittedValues) {
    const {action, parent, createSubcollection, editSubcollection} = this.props;
    console.log("submitting")
    console.log(this.props)
    if (action == "create") {
      return createSubcollection({data: submittedValues, parent: parent})
    } else {
      return editSubcollection(submittedValues)
    }
  }
  submitFormFailure(err) {
    console.log(err)
  }

  renderForm(formApi) {
    return (
      <form onSubmit={formApi.submitForm} id="form">
        <div className= "form__field">
          <label className="form__field__label" htmlFor="title">Title</label>
          <Text field="title" id="title" />
        </div>
        <div className= "form__field">
          <label className="form__field__label" htmlFor="path">Url Path</label>
          <Text field="path" id="path" />
        </div>
        <div className= "form__field">
          <label className="form__field__label" htmlFor="shortDescription">Short Description</label>
          <TextArea field="shortDescription" id="shortDescription" />
        </div>
        <div className= "form__field">
          <label className="form__field__label" htmlFor="longDescription">Long Description</label>
          <TextArea field="longDescription" id="longDescription" />
        </div>

        <button type="submit" className="mb-4 btn btn-primary">Submit</button>
      </form>
    )
  }

  render() {
    console.log(this.props)
    const { createSubcollection, action } = this.props

    return (
      <Form
        onSubmit={(submittedValues) => this.submitForm(submittedValues)}
        onSubmitFailure={(err) => this.submitFormFailure(err)}
        defaultValues={this.props.data}>
        { formApi => this.renderForm(formApi)}
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // formUpdateStatus: state.formUpdateStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createSubcollection: (subcollectionInfo) => {
      dispatch(createSubcollection(subcollectionInfo))
    },
    editSubcollection: (subcollectionInfo) => {
      dispatch(editSubcollection(subcollectionInfo))
    },
    hideAdminModal: () => {
      dispatch(hideAdminModal())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSubcollectionForm)
