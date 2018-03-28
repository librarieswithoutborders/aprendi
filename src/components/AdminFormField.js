import React, { Component } from 'react';
import { Text, Radio, RadioGroup, Select, Checkbox, TextArea } from 'react-form'
import ExternalWebsiteField from './ExternalWebsiteField'
import FileUploadField from './FileUploadField'
import RichTextField from './RichTextField'

class AdminFormField extends Component {
  constructor() {
    super()

    this.state = {

    }
  }

  showHelpText() {
  }

  renderFieldContent() {
    const { dbField, type, validate, required } = this.props.settings

    const validationWrapper = (input) => {
      if (required && (!input || input === '')) {
        return "Required Field"
      }
      if (validate) {
        return validate(input)
      }
    }

    switch(type) {
      case "Text":
        return <Text field={dbField} id={dbField} validate={validationWrapper} autoComplete="off"/>

      case "TextArea":
        return <TextArea field={dbField} id={dbField} validate={validationWrapper}/>

      case "Checkbox":
        return <Checkbox field={dbField} id={dbField} validate={validationWrapper} />

      case "Image":
        return <FileUploadField type="image" field={dbField}/>

      case "PDF":
        return <FileUploadField type="pdf" field={dbField}/>

      case "RichText":
        return <RichTextField field={dbField}/>

      case "ExternalWebsite":
        return <ExternalWebsiteField field={dbField} />
    }
  }


  render() {
    const { settings, error } = this.props
    const { dbField, type, label, required} = settings

    const fieldContent = this.renderFieldContent()



    return (
      <div className={error ? "form__field field-error" : "form__field"} onFocus={() => this.showHelpText()}>
        <label className={required ? "form__field__label required" : "form__field__label"} htmlFor={dbField}>{required ? label + "*" : label}</label>
        {fieldContent}
        {error &&
          <h5 className="form__field__error">{error}</h5>
        }
      </div>
    )
  }
}

export default AdminFormField
