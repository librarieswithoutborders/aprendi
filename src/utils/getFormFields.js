import React from 'react'
import { Form, Text, Radio, RadioGroup, Select, Checkbox, TextArea } from 'react-form'
import { languageOptions, zoomOptions } from '../constants'

const teamFields = (
  <div>
    <div className= "form__field">
      <label className="form__field__label" htmlFor="team_name">Team Name</label>
      <Text field="team_name" id="team_name" />
    </div>
    <div className= "form__field">
      <label className="form__field__label" htmlFor="path">Url Path</label>
      <Text field="path" id="path" />
    </div>
  </div>
)

const collectionFields = (
  <div>
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
  </div>
)

const subcollectionFields = (
  <div>
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
  </div>
)

const getFormFields = (type) => {
  switch(type) {
    case "team":
      return teamFields
    case "collection":
      return collectionFields
    case "subcollection":
      return subcollectionFields
    case "resource":
      return resourceFields
  }
}

export default getFormFields
