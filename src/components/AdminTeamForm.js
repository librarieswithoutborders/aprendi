import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Text, Radio, RadioGroup, Select, Checkbox, TextArea } from 'react-form'
import { languageOptions, zoomOptions } from '../constants'
import { createTeam, updateTeam, hideAdminModal } from '../actions/actions.js';


class AdminTeamForm extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    console.log(this.props)
    // this.props.fetchAdminTeamFormData()
  }

  componentWillReceiveProps(nextProps) {
    const {hideAdminModal} = this.props;
    // console.log(nextProps.subcollectionUpdateStatus)

    // if (nextProps.subcollectionUpdateStatus == "Success") {
    //   hideAdminModal()
    // }
  }

  submitForm(submittedValues) {
    const {action, createTeam, updateTeam} = this.props;
    console.log("submitting")
    console.log(this.props)
    if (action == "create") {
      return createTeam(submittedValues)
    } else {
      return updateTeam({data: submittedValues})
    }
  }
  submitFormFailure(err) {
    console.log(err)
  }

  renderForm(formApi) {
    return (
      <form onSubmit={formApi.submitForm} id="form">
        <div className= "form__field">
          <label className="form__field__label" htmlFor="team_name">Team Name</label>
          <Text field="team_name" id="team_name" />
        </div>
        <div className= "form__field">
          <label className="form__field__label" htmlFor="path">Url Path</label>
          <Text field="path" id="path" />
        </div>

        <button type="submit" className="mb-4 btn btn-primary">Submit</button>
      </form>
    )
  }

  render() {
    console.log(this.props)
    const { createTeam, action } = this.props

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
    createTeam: (teamInfo) => {
      dispatch(createTeam(teamInfo))
    },
    updateTeam: (teamInfo) => {
      dispatch(updateTeam(teamInfo))
    },
    hideAdminModal: () => {
      dispatch(hideAdminModal())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminTeamForm)
