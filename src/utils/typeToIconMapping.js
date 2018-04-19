const typeToIconMapping = (type, data) => {
  switch (type) {
    case 'collection':
      return 'folder'
    case 'subcollection':
      return 'folder'
    case 'resource':
      if (data.resource_type === 'video') {
        return 'video'
      } else if (data.resource_type === 'rich_text') {
        return 'text'
      } else if (data.resource_type === 'image') {
        return 'image'
      } else if (data.resource_type === 'website') {
        return 'website'
      } else if (data.resource_type === 'embed') {
        return 'embed'
      }

      return 'document'

    case 'team':
      return 'team'
    default:
      return 'folder'
  }
}

export default typeToIconMapping
