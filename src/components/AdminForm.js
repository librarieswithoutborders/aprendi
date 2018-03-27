import React, { Component } from 'react';
import { connect } from 'react-redux'
import { teamFieldSettings, collectionFieldSettings, subcollectionFieldSettings, resourceFieldSettings } from '../utils/formFieldSettings'
import processFormData from '../utils/processFormData'
import { Form } from 'react-form'
import AdminFormField from './AdminFormField'


class AdminForm extends Component {
  constructor(props) {
    super(props)

    switch(props.type) {
      case "team":
        this.fieldSettings = teamFieldSettings
        break;
      case "collection":
        this.fieldSettings = collectionFieldSettings
        break;
      case "subcollection":
        this.fieldSettings = subcollectionFieldSettings
        break;
      case "resource":
        this.fieldSettings = resourceFieldSettings
        break;
    }

    this.state = {
    }
  }

  submitForm(data) {
    console.log(data)
    const { action, team } = this.props

    let values = {}
    Object.assign(values, data)
    if (team) {
      values.team = team
    }

    console.log("SUCCESS", values, this.props)

    this.props.submit(processFormData(values, action))
  }

  submitFormFailure(err) {
    console.log(err)
  }

  renderFormFields(formApi) {
    const { errors } = formApi
    const { isCoreAdmin, action, resourceType } = this.props

    console.log(errors)
    let fields = []

    this.fieldSettings.forEach(settings => {
      if (!settings.showOnly || (settings.showOnly && settings.showOnly({isCoreAdmin: isCoreAdmin, action: action, resourceType: resourceType}))) {
        fields.push(<AdminFormField key={settings.dbField} settings={settings} error={errors ? errors[settings.dbField] : null}/>)
      }
    })

    return (
      <div className="form__contents">
        {fields}
      </div>
    )
  }

  render() {
    const {type, data, action, updateStatus} = this.props

    return (
      <Form
        onSubmit={(submittedValues) => this.submitForm(submittedValues)}
        defaultValues={data} >
        { formApi => {
            console.log(formApi)
            return (
              <form id="form" onSubmit={formApi.submitForm}>
                {this.renderFormFields(formApi)}
                <div className="form__submit-container">
                  <button type="submit" className="mb-4 btn btn-primary button form__submit">Submit</button>
                </div>
              </form>
            )}
        }
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isCoreAdmin: state.currUser && state.currUser.permissions && state.currUser.permissions.core_admin
  }
}

export default connect(mapStateToProps)(AdminForm)
