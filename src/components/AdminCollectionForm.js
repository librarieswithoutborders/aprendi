import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Text, Radio, RadioGroup, Select, Checkbox, TextArea } from 'react-form'
import { languageOptions, zoomOptions } from '../constants'
import { createCollection, hideAdminModal } from '../actions/actions.js';


class AdminCollectionForm extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    console.log(this.props)
    // this.props.fetchAdminCollectionFormData()
  }

  componentWillReceiveProps(nextProps) {
    const {collectionUpdateStatus, hideAdminModal} = this.props;
    console.log(nextProps.collectionUpdateStatus)

    if (nextProps.collectionUpdateStatus == "Success") {
      hideAdminModal()
    }
  }

  renderForm(formApi) {
    return (
      <form onSubmit={formApi.submitForm} id="form">
        <div className= "form__field">
          <label className="form__field__label" htmlFor="title">Title</label>
          <Text field="title" id="title" />
        </div>
        <div className= "form__field">
          <label className="form__field__label" htmlFor="url">Url</label>
          <Text field="url" id="url" />
        </div>
        <div className= "form__field">
          <label className="form__field__label" htmlFor="team">Team</label>
          <Text field="team" id="team" />
        </div>
        <div className= "form__field">
          <label className="form__field__label" htmlFor="shortDescription">Short Description</label>
          <TextArea field="shortDescription" id="shortDescription" />
        </div>
        <div className= "form__field">
          <label className="form__field__label" htmlFor="longDescription">Long Description</label>
          <TextArea field="longDescription" id="longDescription" />
        </div>
        <div className= "form__field">
          <label className="form__field__label" htmlFor="language" className="d-block">Language</label>
          <Select field="language" id="language" options={languageOptions} />
        </div>
        <div className= "form__field">
          <label className="form__field__label" htmlFor="disclaimerMessage">Disclaimer Message</label>
          <TextArea field="disclaimerMessage" id="disclaimerMessage" />
        </div>
        <div className= "form__field">
          <label className="form__field__label" htmlFor="defaultZoom" className="d-block">Default Zoom</label>
          <Select field="defaultZoom" id="defaultZoom" options={zoomOptions} />
        </div>
        <button type="submit" className="mb-4 btn btn-primary">Submit</button>
      </form>
    )
  }

  render() {
    console.log(this.props)
    const { createCollection } = this.props

    return (
      <Form
        onSubmit={submittedValues => { console.log(submittedValues); createCollection(submittedValues)}}
        defaultValues={this.props.data}>
        { formApi => this.renderForm(formApi)}
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    collectionUpdateStatus: state.collectionUpdateStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCollection: (collectionInfo) => {
      dispatch(createCollection(collectionInfo))
    },
    hideAdminModal: () => {
      dispatch(hideAdminModal())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCollectionForm)
