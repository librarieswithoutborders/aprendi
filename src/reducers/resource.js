export const resourceList = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_RESOURCES':
      if (action.status === 'SUCCESS') {
        return action.data
      }
    default:
      return state
  }
}

export const sharedResourceList = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_SHARED_RESOURCES':
      if (action.status === 'SUCCESS') {
        return action.data
      }
    default:
      return state
  }
}

export const resourceViewerContent = (state = null, action) => {
  switch (action.type) {
    case 'HIDE_RESOURCE_VIEWER':
      return null
    case 'SHOW_RESOURCE_VIEWER':
      return {
        parent: action.parent,
        resourceList: action.resourceList,
        currIndex: action.currIndex
      }
    case 'SET_CURR_RESOURCE_INDEX':
      return Object.assign({}, state, {
        currIndex: action.newIndex
      })
    case 'DELETE_RESOURCE':
      if (action.status === 'SUCCESS') {
        return null
      }
    case 'COLLECTION_REMOVE_RESOURCE':
      if (action.status === 'SUCCESS') {
        return null
      }
    case 'SUBCOLLECTION_REMOVE_RESOURCE':
      if (action.status === 'SUCCESS') {
        return null
      }
    default:
      return state
  }
}
