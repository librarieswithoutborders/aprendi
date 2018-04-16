import React, {Component} from 'react';
import {Text, Radio, RadioGroup, Select, Checkbox, TextArea} from 'react-form'

import FileUploadField from './FileUploadField'
import RichTextField from './RichTextField'

class AdminFormField extends Component {
  renderFieldContent() {
    const {checkLocallyUnique, checkGloballyUnique, error, asyncError} = this.props
    const {dbField, type, validate, asyncValidate, required, locallyUnique, globallyUnique} = this.props.settings

    const validationWrapper = input => {
      if (required && (!input || input === '')) {
        return 'Required Field'
      }
      if (validate) {
        const validateResult = validate(input)
        if (validateResult) {
          return validateResult
        }
      }

      if (locallyUnique) {
        const checkUniqueResult = checkLocallyUnique({field: dbField, value: input})
        if (checkUniqueResult) {
          return checkUniqueResult
        }
      }

      if (globallyUnique) {
        const checkUniqueResult = checkGloballyUnique({field: dbField, value: input})
        if (checkUniqueResult) {
          return checkUniqueResult
        }
      }

      return null
    }

    switch (type) {
      case 'Text':
        return (
          <div className="form__field__value">
            <Text field={dbField} id={dbField} validate={validationWrapper} autoComplete="off"/>
            {(error || asyncError) &&
              <h5 className="form__field__error">{error || asyncError}</h5>
            }
          </div>
        )
      case 'TextArea':
        return (
          <div className="form__field__value">
            <TextArea field={dbField} id={dbField} validate={validationWrapper}/>
            {(error || asyncError) &&
              <h5 className="form__field__error">{error || asyncError}</h5>
            }
          </div>
        )
      case 'Checkbox':
        return (
          <div className="form__field__value">
            <Checkbox field={dbField} id={dbField} />
            {(error || asyncError) &&
              <h5 className="form__field__error">{error || asyncError}</h5>
            }
          </div>
        )
      case 'Image':
        return (
          <div className="form__field__value">
            <FileUploadField type="image" field={dbField}/>
            {(error || asyncError) &&
              <h5 className="form__field__error">{error || asyncError}</h5>
            }
          </div>
        )
      case 'PDF':
        return (
          <div className="form__field__value">
            <FileUploadField type="pdf" field={dbField}/>
            {(error || asyncError) &&
              <h5 className="form__field__error">{error || asyncError}</h5>
            }
          </div>
        )
      case 'RichText':
        return (
          <div className="form__field__value">
            <RichTextField field={dbField}/>
            {(error || asyncError) &&
              <h5 className="form__field__error">{error || asyncError}</h5>
            }
          </div>
        )
    }
  }


  render() {
    const {settings, error, asyncError} = this.props
    const {dbField, type, label, required, helpText} = settings

    const fieldContent = this.renderFieldContent()

    return (
      <div className={(error || asyncError) ? 'form__field field-error' : 'form__field'}>
        <div className={required ? 'form__field__label required' : 'form__field__label'}>
          <label className='form__field__label__text' htmlFor={dbField}>{required ? `${label}*` : label}</label>
          {helpText &&
            <h5 className='form__field__label__help-text'>{helpText}</h5>
          }
        </div>
        {fieldContent}
      </div>
    )
  }
}

export default AdminFormField
