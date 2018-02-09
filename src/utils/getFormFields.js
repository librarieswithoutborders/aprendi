import React from 'react'
import { Form, Text, Radio, RadioGroup, Select, Checkbox, TextArea } from 'react-form'
import { languageOptions, zoomOptions, resourceTypeOptions, videoProviderOptions } from '../constants'
import ImageUploadField from '../components/ImageUploadField'


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
      <label className="form__field__label">Cover Image</label>
      <ImageUploadField field="image_url"/>
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
      <label className="form__field__label">Cover Image</label>
      <ImageUploadField field="image_url"/>
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

const resourceFields = (resourceType, action) => (
  <div>
    <div className= "form__field">
      <label className="form__field__label" htmlFor="title">Title</label>
      <Text field="title" id="title" />
    </div>
    <div className= "form__field">
      <label className="form__field__label" htmlFor="path">Url Path</label>
      <Text field="path" id="path" />
    </div>
    {action != "create" &&
      <div className= "form__field">
        <label className="form__field__label">Cover Image</label>
        <ImageUploadField field="image_url"/>
      </div>
    }
    <div className= "form__field">
      <label className="form__field__label" htmlFor="short_description">Short Description</label>
      <TextArea field="short_description" id="short_description" />
    </div>
    <div className= "form__field">
      <label className="form__field__label" htmlFor="long_description">Long Description</label>
      <TextArea field="long_description" id="long_description" />
    </div>
    <div className= "form__field">
      <label className="form__field__label" htmlFor="resource_type" className="d-block">Resource Type</label>
      <Select field="resource_type" id="resource_type" options={resourceTypeOptions} />
    </div>
    {resourceType === "video" &&
      <div>
        <div className= "form__field">
          <label className="form__field__label" htmlFor="video_provider" className="d-block">Video Provider</label>
          <Select field="video_provider" id="video_provider" options={videoProviderOptions} />
        </div>
        <div className= "form__field">
          <label className="form__field__label" htmlFor="resource_url" className="d-block">Video Url</label>
          <Text field="resource_url" id="resource_url" />
        </div>

      </div>
    }
    {resourceType === "pdf" &&
      <div>
        <div className= "form__field">
          <label className="form__field__label">PDF</label>
          <ImageUploadField field="resource_url" />
        </div>
      </div>
    }
    {resourceType === "website" &&
      <div className= "form__field">
        <label className="form__field__label" htmlFor="resource_url" className="d-block">External Website Url</label>
        <Text field="resource_url" id="resource_url" />
      </div>
    }
    <div className= "form__field">
      <label className="form__field__label" htmlFor="source_organization">Source Organization</label>
      <Text field="source_organization" id="source_organization" />
    </div>
    <div className= "form__field">
      <label className="form__field__label" htmlFor="source_url">Source Website</label>
      <Text field="source_url" id="source_url" />
    </div>
  </div>
)

const getFormFields = (type, values, action) => {
  console.log(values)

  switch(type) {
    case "team":
      return teamFields
    case "collection":
      return collectionFields
    case "subcollection":
      return subcollectionFields
    case "resource":
      return resourceFields(values.resource_type, action)
  }
}

export default getFormFields
