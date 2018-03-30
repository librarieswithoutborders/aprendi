import {maxLength, isValidPath, isValidEmail, isValidUrl, isPathTaken} from '../utils/formValidation'

export const teamFieldSettings = [
  {
    dbField: "team_name",
    label: "Team Name",
    type: "Text",
    required: true,
    validate: maxLength(150),
    helpText: null,
    globallyUnique: true,
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
    helpText: null,
    globallyUnique: true,
  },
]

export const collectionFieldSettings = [
  {
    dbField: "title",
    label: "Title",
    type: "Text",
    required: true,
    validate: maxLength(150),
    helpText: null,
    locallyUnique: true,
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
    asyncValidate: isPathTaken,
    helpText: null,
    globallyUnique: true,
  },
]

export const subcollectionFieldSettings = [
  {
    dbField: "title",
    label: "Title",
    type: "Text",
    required: true,
    validate: maxLength(150),
    helpText: null,
    locallyUnique: true,
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
    helpText: null,
    locallyUnique: true,
  },
]

export const resourceFieldSettings = [
  {
    dbField: "title",
    label: "Title",
    type: "Text",
    required: true,
    validate: maxLength(150),
    helpText: null,
    locallyUnique: true,
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
    dbField: "image_url",
    label: "Image",
    type: "Image",
    required: true,
    helpText: null,
    showOnly: ({resourceType}) => resourceType === "image"
  },
  {
    dbField: "resource_url",
    label: "External Website Url",
    type: "Text",
    required: true,
    helpText: null,
    validate: isValidUrl,
    showOnly: ({resourceType}) => resourceType === "website",
  },
  {
    dbField: "resource_url",
    label: "Embed Url",
    type: "Text",
    required: true,
    helpText: null,
    validate: isValidUrl,
    showOnly: ({resourceType}) => resourceType === "embed",
  },
  {
    dbField: "rich_text_content",
    label: "Text Content",
    type: "RichText",
    required: true,
    helpText: null,
    showOnly: ({resourceType}) => resourceType === "rich_text",
  },
  {
    dbField: "image_url",
    label: "Cover Image",
    type: "Image",
    required: false,
    helpText: null,
    showOnly: ({action, resourceType}) => resourceType === "rich_text" || (action !== "create" && resourceType != "image")
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
    helpText: null,
    locallyUnique: true,
    globallyUnique: true
  },
]
