const typeToIconMapping = (type, data) => {
  switch (type) {
    case 'collection':
      return 'folder'
    case 'subcollection':
      return 'folder'
    case 'resource':
      if (data.resource_type === 'video') {
        return 'video'
      } else if (data.resource_type === 'richtext') {
        return 'text'
      }
      return 'document'

    case 'team':
      return 'team'
  }
}

export default typeToIconMapping
