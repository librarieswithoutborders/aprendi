import React, { Component } from 'react';
import { connect } from 'react-redux'
import getFormFields from '../utils/getFormFields'
import { Form } from 'react-form'
import {createTeam, updateTeam, createCollection, updateCollection, createSubcollection, updateSubcollection, createResource, updateResource, hideAdminModal, invalidateCurrCollection} from '../actions/actions.js'

class AdminModal extends Component {
  submitForm(data) {
    const {imageUrl} = this.props
    console.log(data)
    console.log(imageUrl)

    let retObject = {}

    Object.assign(retObject, data)
    retObject.image_url = imageUrl
    console.log(retObject)
    this.props.submit(retObject)
  }
  submitFormFailure(err) {
    console.log(err)
  }

  render() {
    const {type, data, updateStatus} = this.props
    return (
      <div className="admin-modal">
        <div>{updateStatus}</div>
        <div className="admin-modal__content">
          <Form
            onSubmit={(submittedValues) => this.submitForm(submittedValues)}
            onSubmitFailure={(err) => this.submitFormFailure(err)}
            defaultValues={this.props.data} >
            { formApi => (
              <form onSubmit={formApi.submitForm} id="form">
                {getFormFields(type)}
                <button type="submit" className="mb-4 btn btn-primary">Submit</button>
              </form>
            )}
          </Form>
        </div>
      </div>
    )
  }
}

class AdminModalContainer extends Component {
  constructor() {
    super()
  }

  setSubmitFunction() {
    const {createTeam, updateTeam, createCollection, updateCollection, createSubcollection, updateSubcollection, createResource, updateResource} = this.props
    const {type, team, parent} = this.props.modalProps;

    switch(type) {
      case "team":
        return {
          create: data => createTeam({data}),
          update: data => updateTeam({data})
        }
      case "collection":
        return {
          create: data => createCollection({data, team}),
          update: data => updateCollection({data})
        }
      case "subcollection":
        return {
          create: data => createSubcollection({data, parent}),
          update: data => updateSubcollection({data})
        }
      case "resource":
        return {
          create: data => createResource({data, parent, team}),
          update: data => updateResource({data})
        }
    }
  }

  render() {
    console.log(this.props)
    const {action, data, type, imageUrl} = this.props.modalProps

    const submitFunc = this.setSubmitFunction()[action]

    console.log(submitFunc, action)

    return <AdminModal data={data} type={type} imageUrl={imageUrl} submit={submitFunc} updateStatus={this.props.updateStatus}/>
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    modalProps: state.adminModalContent,
    updateStatus: state.updateStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTeam: (data) => dispatch(createTeam(data)).then(response => formSubmitCallback(response, dispatch)),
    updateTeam: (data) => dispatch(updateTeam(data)).then(response => formSubmitCallback(response, dispatch)),
    createCollection: (data) => dispatch(createCollection(data)).then(response => formSubmitCallback(response, dispatch, "collection")),
    updateCollection: (data) => dispatch(updateCollection(data)).then(response => formSubmitCallback(response, dispatch, "collection")),
    createSubcollection: (data) => dispatch(createSubcollection(data)).then(response => formSubmitCallback(response, dispatch, "collection")),
    updateSubcollection: (data) => dispatch(updateSubcollection(data)).then(response => formSubmitCallback(response, dispatch, "collection")),
    createResource: (data) => dispatch(createResource(data)).then(response => formSubmitCallback(response, dispatch)),
    updateResource: (data) => dispatch(updateResource(data)).then(response => formSubmitCallback(response, dispatch)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminModalContainer)

const formSubmitCallback = (response, dispatch, type) => {
  console.log(response.payload)
  if (response.payload.status === 200) {
    dispatch(hideAdminModal())
    dispatch(invalidateCurrCollection())
  }
}
