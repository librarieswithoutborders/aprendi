import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Text, Radio, RadioGroup, Select, Checkbox, TextArea } from 'react-form'
import { languageOptions, zoomOptions } from '../constants'
import { createCollection, updateCollection, hideAdminModal } from '../actions/actions.js';


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
    // console.log(nextProps.collectionUpdateStatus)
    //
    // if (nextProps.collectionUpdateStatus == "Success") {
    //   hideAdminModal()
    // }
  }

  submitForm(submittedValues) {
    const {action, team, createCollection, updateCollection} = this.props;
    console.log("submitting")
    console.log(this.props)
    if (action == "create") {
      return createCollection({data: submittedValues, team: team})
    } else {
      return updateCollection({data: submittedValues})
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
          <label className="form__field__label" htmlFor="short_description">Short Description</label>
          <TextArea field="short_description" id="short_description" />
        </div>
        <div className= "form__field">
          <label className="form__field__label" htmlFor="long_description">Long Description</label>
          <TextArea field="long_description" id="long_description" />
        </div>
        <div className= "form__field">
          <label className="form__field__label" htmlFor="language" className="d-block">Language</label>
          <Select field="language" id="language" options={languageOptions} />
        </div>
        <div className= "form__field">
          <label className="form__field__label" htmlFor="disclaimer_message">Disclaimer Message</label>
          <TextArea field="disclaimer_message" id="disclaimer_message" />
        </div>
        <div className= "form__field">
          <label className="form__field__label" htmlFor="default_zoom" className="d-block">Default Zoom</label>
          <Select field="default_zoom" id="default_zoom" options={zoomOptions} />
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
    collectionUpdateStatus: state.collectionUpdateStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCollection: (collectionInfo) => {
      dispatch(createCollection(collectionInfo))
    },
    updateCollection: (collectionInfo) => {
      dispatch(updateCollection(collectionInfo))
    },
    hideAdminModal: () => {
      dispatch(hideAdminModal())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCollectionForm)
