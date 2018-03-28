import React, { Component } from 'react';
import { connect } from 'react-redux'
import processFormData from '../utils/processFormData'
import ResourceCreator from './ResourceCreator'
import Search from './Search'
import AdminForm from './AdminForm'
import {hideAdminModal} from '../actions/index'
import {createTeam, updateTeam, invalidateCurrTeam} from '../actions/team'
import {createCollection, updateCollection, invalidateCurrCollection} from '../actions/collection'
import {createSubcollection, updateSubcollection} from '../actions/subcollection'
import {createResource, updateResource} from '../actions/resource'
import {addUserToTeam} from '../actions/user'

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

    if (action === "create") {
      title += "Add "
    } else if (action === "add_user") {
      title += "Add User to "
    } else if (action === "add_team") {
      title += "Join New Team"
      return title
    } else {
      title += "Edit "
    }
    title += type.charAt(0).toUpperCase() + type.slice(1)
    // title += action === "update" ? ": " + data.title || data.team_name : ""

    return title
  }

  setContent() {
    const {type, data, action, updateStatus, showExisting, submit} = this.props
    const {resourceType} = this.state

    console.log(type, action, resourceType)
    if (type === "resource" && action === "create" && !resourceType ) {
      return <ResourceCreator showExisting={showExisting} setResourceType={(type) => this.setResourceType(type)}/>
    } else if (type === "team" && action === "add_user") {
      return <Search type="user" onSelect={submit} />
    } else if (type === "user" && action === "add_team") {
      return <Search type="team" />
    } else {
      return (
        <AdminForm type={type} data={data} submit={submit} action={action} resourceType={resourceType} />
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
  constructor(props) {
    super(props)
  }

  setSubmitFunction() {
    const {createTeam, updateTeam, createCollection, updateCollection, createSubcollection, updateSubcollection, createResource, updateResource, addUserToTeam} = this.props
    const {type, team, parent, user} = this.props.modalProps;

    switch(type) {
      case "team":
        return {
          create: data => {
            console.log(data)
            if (user && user.permissions._id) {
              console.log({users:[user.permissions._id], ...data})
              createTeam({data:{users:[user.permissions._id], ...data}})

            } else {
              createTeam({data})
            }
          },
          update: data => updateTeam({data}),
          add_user: (user, team) => addUserToTeam(user, team)
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
      case "user":
        return {}
    }
  }

  render() {
    console.log(this.props)
    const {action, data, type, team, showExisting} = this.props.modalProps

    const submitFunc = this.setSubmitFunction()[action]

    console.log(submitFunc, action)

    return <AdminModal data={data} type={type} team={team} submit={submitFunc} action={action} showExisting={showExisting} updateStatus={this.props.updateStatus} />
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    modalProps: state.adminModalContent,
    // updateStatus: state.updateStatus,
    // isCoreAdmin: state.currUser && state.currUser.permissions && state.currUser.permissions.core_admin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTeam: (data) => dispatch(createTeam(data)),
    updateTeam: (data) => dispatch(updateTeam(data)),
    addUserToTeam: (user, team) => dispatch(addUserToTeam(user, team)),
    createCollection: (data) => dispatch(createCollection(data)),
    updateCollection: (data) => dispatch(updateCollection(data)),
    createSubcollection: (data) => dispatch(createSubcollection(data)),
    updateSubcollection: (data) => dispatch(updateSubcollection(data)),
    createResource: (data) => dispatch(createResource(data)),
    updateResource: (data) => dispatch(updateResource(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminModalContainer)

// const formSubmitCallback = (response, dispatch, type) => {
//   console.log(response.payload)
//   if (response.payload.status === 200) {
//     dispatch(hideAdminModal())
//     dispatch(invalidateCurrTeam())
//     dispatch(invalidateCurrCollection())
//   }
// }
