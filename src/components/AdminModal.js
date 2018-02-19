import React, { Component } from 'react';
import { connect } from 'react-redux'
import getFormFields from '../utils/getFormFields'
import processFormData from '../utils/processFormData'
import { Form } from 'react-form'
import ResourceCreator from './ResourceCreator'
import {createTeam, updateTeam, createCollection, updateCollection, createSubcollection, updateSubcollection, createResource, updateResource, hideAdminModal, invalidateCurrCollection} from '../actions/actions.js'

class AdminModal extends Component {
  constructor() {
    super()

    this.state = {
      resourceType: null
    }
  }
  submitForm(data) {
    const {action, team} = this.props
    const {resourceType} = this.state
    let values = {}
    Object.assign(values, data)
    if (team) {
      values.team = team
    }

    console.log(values, this.props)

    this.props.submit(processFormData(values, action, resourceType))
  }

  submitFormFailure(err) {
    console.log(err)
  }

  setTitle() {
    const {type, action, data} = this.props
    let title = ""

    title += action === "create" ? "Add " : "Edit "
    title += type.charAt(0).toUpperCase() + type.slice(1)
    title += action === "update" ? ":" + data.title : ""

    return title
  }

  setContent() {
    const {type, data, action, updateStatus, showExisting} = this.props
    const {resourceType} = this.state

    console.log(type, action, resourceType)
    if (type === "resource" && action === "create" && !resourceType ) {
      return <ResourceCreator showExisting={showExisting} setResourceType={(type) => this.setResourceType(type)}/>
    } else {
      return (
        <Form
          onSubmit={(submittedValues) => this.submitForm(submittedValues)}
          onSubmitFailure={(err) => this.submitFormFailure(err)}
          defaultValues={this.props.data} >
          { formApi => (
            <form onSubmit={formApi.submitForm} id="form">
              {getFormFields(type, formApi.values, action, resourceType)}
              <div className="form__submit-container">
                <div type="submit" className="mb-4 btn btn-primary button form__submit">Submit</div>
              </div>
            </form>
          )}
        </Form>
      )
    }
  }

  setResourceType(type) {
    console.log("setting resource type", type)
    this.setState({
      resourceType: type
    })
  }

  render() {
    const {type, data, action, updateStatus} = this.props
    return (
      <div className="admin-modal">
        <div className="admin-modal__header">
          <h1 className="admin-modal__header__text">{this.setTitle()}</h1>
        </div>
        <div className="admin-modal__status">{updateStatus}</div>
        <div className="admin-modal__contents">
          {this.setContent()}
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
    const {action, data, type, team, showExisting} = this.props.modalProps

    const submitFunc = this.setSubmitFunction()[action]

    console.log(submitFunc, action)

    return <AdminModal data={data} type={type} team={team} submit={submitFunc} action={action} showExisting={showExisting} updateStatus={this.props.updateStatus}/>
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
