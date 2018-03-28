import React, { Component } from 'react';
import { connect } from 'react-redux'
import { teamFieldSettings, collectionFieldSettings, subcollectionFieldSettings, resourceFieldSettings } from '../utils/formFieldSettings'
import processFormData from '../utils/processFormData'
import { Form } from 'react-form'
import AdminFormField from './AdminFormField'
import { takeWebScreenshot, checkExternalSiteHeaders } from '../actions/index'


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

  submitForm(formData, a, formApi) {
    console.log(data)

    const { data, action, team, resourceType, takeWebScreenshot } = this.props

    let values = {}
    Object.assign(values, formData)
    if (team) {
      values.team = team
    }

    if (resourceType) {
      values.resource_type = resourceType
    }

    if (values.resource_type === "website" && data.resource_url != formData.resource_url) {
      console.log("website!!")

      takeWebScreenshot(formData.resource_url, d => {
        console.log("took screenshot")
        console.log(d)
        values.image_url = "https://s3.us-east-2.amazonaws.com/mylibraryguide-assets/images/" + d
        this.props.submit(processFormData(values, action))
      })

    } else {
      this.props.submit(processFormData(values, action))
    }
  }

  submitFormFailure(err) {
    console.log(err)
  }

  renderFormFields(formApi) {
    const { errors, values } = formApi
    const { isCoreAdmin, action, resourceType } = this.props

    let fields = []

    this.fieldSettings.forEach(settings => {
      if (!settings.showOnly || (settings.showOnly && settings.showOnly({isCoreAdmin: isCoreAdmin, action: action, resourceType: resourceType || values.resource_type}))) {
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
        onSubmit={(submittedValues, a, formApi) => this.submitForm(submittedValues, a, formApi)}
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

const mapDispatchToProps = (dispatch) => {
  return {
    takeWebScreenshot: (url, callback) => {
      dispatch(takeWebScreenshot(url, callback))
    },

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(AdminForm)
