import {maxLength, isValidPath, isValidEmail} from '../utils/formValidation'

export const teamFieldSettings = [
  {
    dbField: "team_name",
    label: "Team Name",
    type: "Text",
    required: true,
    validate: maxLength(150),
    helpText: null
  },
  {
    dbField: "description",
    label: "Description",
    type: "RichText",
    required: false,
    helpText: null
  },
  {
    dbField: "image_url",
    label: "Team Image",
    type: "Image",
    required: false,
    helpText: null
  },
  {
    dbField: "path",
    label: "Url Path",
    type: "Text",
    required: false,
    validate: isValidPath,
    helpText: null
  },
]

export const collectionFieldSettings = [
  {
    dbField: "title",
    label: "Title",
    type: "Text",
    required: true,
    validate: maxLength(150),
    helpText: null
  },
  {
    dbField: "image_url",
    label: "Cover Image",
    type: "Image",
    required: false,
    helpText: null
  },
  {
    dbField: "disclaimer_message",
    label: "Disclaimer Message",
    type: "RichText",
    required: false,
    helpText: null
  },
  {
    dbField: "contact_email",
    label: "Contact Email",
    type: "Text",
    required: true,
    validate: isValidEmail,
    helpText: null
  },
  {
    dbField: "created_by",
    label: "Created by",
    type: "Text",
    required: true,
    validate: maxLength(150),
    helpText: null
  },
  {
    dbField: "created_by_image",
    label: "Created by - Image",
    type: "Image",
    required: false,
    helpText: null
  },
  {
    dbField: "path",
    label: "Url Path",
    type: "Text",
    required: false,
    validate: isValidPath,
    helpText: null
  },
]

export const subcollectionFieldSettings = [
  {
    dbField: "title",
    label: "Title",
    type: "Text",
    required: true,
    validate: maxLength(150),
    helpText: null
  },
  {
    dbField: "image_url",
    label: "Cover Image",
    type: "Image",
    required: false,
    helpText: null
  },
  {
    dbField: "disclaimer_message",
    label: "Disclaimer Message",
    type: "RichText",
    required: false,
    helpText: null
  },
  {
    dbField: "path",
    label: "Url Path",
    type: "Text",
    required: false,
    validate: isValidPath,
    helpText: null
  },
]

export const resourceFieldSettings = [
  {
    dbField: "title",
    label: "Title",
    type: "Text",
    required: true,
    validate: maxLength(150),
    helpText: null
  },
  {
    dbField: "shared",
    label: "Share Resource Across Teams",
    type: "Checkbox",
    required: false,
    helpText: null,
    showOnly: ({isCoreAdmin}) => isCoreAdmin
  },
  {
    dbField: "resource_url",
    label: "Video Url",
    type: "Text",
    required: true,
    validate: maxLength(150),
    helpText: null,
    showOnly: ({resourceType}) => resourceType === "video"
  },
  {
    dbField: "resource_url",
    label: "PDF",
    type: "PDF",
    required: true,
    helpText: null,
    showOnly: ({resourceType}) => resourceType === "pdf"
  },
  {
    dbField: "resource_url",
    label: "External Website Url",
    type: "ExternalWebsite",
    required: true,
    helpText: null,
    showOnly: ({resourceType}) => resourceType === "website"
  },
  {
    dbField: "image_url",
    label: "Cover Image",
    type: "Image",
    required: false,
    helpText: null,
    showOnly: ({action}) => action !== "create"
  },
  {
    dbField: "more_info",
    label: "More Information Link",
    type: "Text",
    required: false,
    validate: maxLength(150),
    helpText: null,
  },
  {
    dbField: "disclaimer_message",
    label: "Disclaimer Message",
    type: "RichText",
    required: false,
    helpText: null
  },
  {
    dbField: "path",
    label: "Url Path",
    type: "Text",
    required: false,
    validate: isValidPath,
    helpText: null
  },
]
