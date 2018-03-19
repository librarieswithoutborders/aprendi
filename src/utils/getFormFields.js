import React from 'react'
import { Form, Text, Radio, RadioGroup, Select, Checkbox, TextArea } from 'react-form'
import { languageOptions, zoomOptions, resourceTypeOptions, videoProviderOptions } from '../constants'
import FileUploadField from '../components/FileUploadField'
import RichTextField from '../components/RichTextField'


const teamFields = (action) => (
  <div className="form__contents">
    <div className= "form__field">
      <label className="form__field__label" htmlFor="team_name">Team Name</label>
      <Text field="team_name" id="team_name" />
    </div>
    <div className= "form__field">
      <label className="form__field__label" htmlFor="description">Description</label>
      <TextArea field="description" id="description" />
    </div>
    <div className= "form__field">
      <label className="form__field__label">Team Image</label>
      <FileUploadField type="image" field="image_url"/>
    </div>
    <div className= "form__field">
      <label className="form__field__label" htmlFor="path">Url Path</label>
      <Text field="path" id="path" />
    </div>
  </div>
)

const collectionFields = (action) => (
  <div className="form__contents">
    <div className= "form__field">
      <label className="form__field__label" htmlFor="title">Title</label>
      <Text field="title" id="title" />
    </div>
    <div className= "form__field">
      <label className="form__field__label">Cover Image</label>
      <FileUploadField type="image" field="image_url"/>
    </div>
    <div className= "form__field">
      <label className="form__field__label" htmlFor="disclaimer_message">Disclaimer Message</label>
      <RichTextField field="disclaimer_message" id="disclaimer_message" />
    </div>
    <div className= "form__field">
      <label className="form__field__label" htmlFor="created_by">Created by</label>
      <Text field="created_by" id="created_by" />
    </div>
    <div className= "form__field">
      <label className="form__field__label">Created by - Image</label>
      <FileUploadField type="image" field="created_by_image"/>
    </div>
    <div className= "form__field">
      <label className="form__field__label" htmlFor="contact_email">Contact Email</label>
      <Text field="contact_email" id="contact_email" />
    </div>
    <div className= "form__field">
      <label className="form__field__label" htmlFor="path">Url Path</label>
      <Text field="path" id="path" />
    </div>
  </div>
)

const subcollectionFields = (action) => (
  <div className="form__contents">
    <div className= "form__field">
      <label className="form__field__label" htmlFor="title">Title</label>
      <Text field="title" id="title" />
    </div>
    <div className= "form__field">
      <label className="form__field__label">Cover Image</label>
      <FileUploadField type="image" field="image_url"/>
    </div>
    <div className= "form__field">
      <label className="form__field__label" htmlFor="disclaimer_message">Disclaimer Message</label>
      <RichTextField field="disclaimer_message" id="disclaimer_message" />
    </div>
    <div className= "form__field">
      <label className="form__field__label" htmlFor="path">Url Path</label>
      <Text field="path" id="path" />
    </div>
  </div>
)

const resourceFields = (resourceType, action) => (
  <div className="form__contents">
    <div className= "form__field">
      <label className="form__field__label" htmlFor="title">Title</label>
      <Text field="title" id="title" />
    </div>
    {resourceType === "video" &&
      <div className= "form__field">
        <label className="form__field__label" htmlFor="resource_url">Video Url</label>
        <Text field="resource_url" id="resource_url" />
      </div>
    }
    {resourceType === "pdf" &&
      <div className= "form__field">
        <label className="form__field__label">PDF</label>
        <FileUploadField type="pdf" field="resource_url" />
      </div>
    }
    {resourceType === "website" &&
      <div className= "form__field">
        <label className="form__field__label" htmlFor="resource_url">External Website Url</label>
        <Text field="resource_url" id="resource_url" />
      </div>
    }
    {resourceType === "rich_text" &&
      <div className= "form__field">
        <RichTextField field="rich_text" id="rich_text" />
      </div>
    }
    {action != "create" &&
      <div className= "form__field">
        <label className="form__field__label">Cover Image</label>
        <FileUploadField type="image" field="image_url"/>
      </div>
    }
    <div className= "form__field">
      <label className="form__field__label" htmlFor="more_info">More Information Link</label>
      <Text field="more_info" id="more_info" />
    </div>
    <div className= "form__field">
      <label className="form__field__label" htmlFor="disclaimer_message">Disclaimer Message</label>
      <RichTextField field="disclaimer_message" id="disclaimer_message" />
    </div>
    <div className= "form__field">
      <label className="form__field__label" htmlFor="path">Url Path</label>
      <Text field="path" id="path" />
    </div>
  </div>
)

const getFormFields = (type, values, action, resourceType) => {
  console.log(values)

  switch(type) {
    case "team":
      return teamFields(action)
    case "collection":
      return collectionFields(action)
    case "subcollection":
      return subcollectionFields(action)
    case "resource":
      return resourceFields(resourceType || values.resource_type, action)
  }
}

export default getFormFields
