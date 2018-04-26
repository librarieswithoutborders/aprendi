export const collectionList = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_COLLECTIONS':
      if (action.status === 'SUCCESS') {
        return action.data
      }
    default:
      return state
  }
}

export const currCollection = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_COLLECTION':
      if (action.status === 'SUCCESS') {
        return action.data
      } else if (action.status === 'FAILURE') {
        return 'Not Found'
      }
      return 'Fetching'

    case 'UPDATE_COLLECTION':
      if (action.status === 'SUCCESS') {
        return action.data
      }
    case 'COLLECTION_REORDER_CHILDREN':
      if (action.status === 'SUCCESS') {
        return 'Invalid'
      }
    case 'COLLECTION_ADD_EXISTING_RESOURCE':
      if (action.status === 'SUCCESS') {
        const newState = {}
        Object.assign(newState, state)
        newState.resources.push(action.data)
        return newState
      }
      return state

    case 'COLLECTION_REMOVE_RESOURCE':
      if (action.status === 'SUCCESS') {
        const newState = {}
        Object.assign(newState, state)
        const deletedIndex = state.resources.indexOf(action.data)
        newState.resources.splice(deletedIndex, 1)
        return newState
      }
      return state

    case 'DELETE_COLLECTION':
      if (action.status === 'SUCCESS') {
        return 'Invalid'
      }
    case 'CREATE_SUBCOLLECTION':
      if (action.status === 'SUCCESS') {
        return 'Invalid'
      }
    case 'UPDATE_SUBCOLLECTION':
      if (action.status === 'SUCCESS') {
        return 'Invalid'
      }
    case 'SUBCOLLECTION_REORDER_CHILDREN':
      if (action.status === 'SUCCESS') {
        return 'Invalid'
      }
    case 'SUBCOLLECTION_ADD_EXISTING_RESOURCE':
      if (action.status === 'SUCCESS') {
        return 'Invalid'
      }
    case 'SUBCOLLECTION_REMOVE_RESOURCE':
      if (action.status === 'SUCCESS') {
        return 'Invalid'
      }
    case 'DELETE_SUBCOLLECTION':
      if (action.status === 'SUCCESS') {
        return 'Invalid'
      }
    case 'CREATE_RESOURCE':
      if (action.status === 'SUCCESS') {
        return 'Invalid'
      }
    case 'UPDATE_RESOURCE':
      if (action.status === 'SUCCESS') {
        return 'Invalid'
      }
    case 'DELETE_RESOURCE':
      if (action.status === 'SUCCESS') {
        return 'Invalid'
      }
    case 'RESET_CURR_COLLECTION':
      return null
  }

  return state
}
