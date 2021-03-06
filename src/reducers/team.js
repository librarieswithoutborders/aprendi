export const teamList = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_TEAMS':
      if (action.status === 'SUCCESS') {
        return action.data
      }
    case 'CREATE_TEAM':
      if (action.status === 'SUCCESS' && state) {
        return [...state, ...[action.data]]
      }
    case 'UPDATE_TEAM':
      if (action.status === 'SUCCESS' && state) {
        const updatedIndex = state.indexOf(action.data)
        state.splice(updatedIndex, 1, action.data)
        return [...state]
      }
    case 'DELETE_TEAM':
      if (action.status === 'SUCCESS' && state) {
        const deletedIndex = state.indexOf(action.data)
        state.splice(deletedIndex, 1)
        return [...state]
      }
    case 'TEAM_APPROVE_USER_REQUEST':
      if (action.status === 'SUCCESS' && state) {
        return 'Invalid'
      }
    case 'TEAM_DENY_USER_REQUEST':
      if (action.status === 'SUCCESS' && state) {
        return 'Invalid'
      }
    case 'TEAM_JOIN_REQUEST':
      if (action.status === 'SUCCESS' && state) {
        return 'Invalid'
      }
    case 'USER_LEAVE_TEAM':
      if (action.status === 'SUCCESS' && state) {
        return 'Invalid'
      }
    default:
      return state
  }
}

export const currTeam = (state = null, action) => {
  switch (action.type) {
    case 'RESET_CURR_TEAM':
      return null

    case 'FETCH_TEAM':
      if (action.status === 'SUCCESS') {
        return action.data
      } else if (action.status === 'FAILURE') {
        return 'Not Found'
      }
      return 'Fetching'

    case 'UPDATE_TEAM':
      if (action.status === 'SUCCESS') {
        return action.data
      }
    case 'DELETE_TEAM':
      if (action.status === 'SUCCESS') {
        return null
      }
    case 'TEAM_ADD_USER':
      if (action.status === 'SUCCESS') {
        const newState = {}
        Object.assign(newState, state)
        !newState.users ? newState.users = [] : null
        newState.users.push(action.data)
        return newState
      }
    case 'TEAM_REMOVE_USER':
      if (action.status === 'SUCCESS') {
        const newState = {}
        Object.assign(newState, state)
        const deletedIndex = state.users.indexOf(action.data)
        newState.users.splice(deletedIndex, 1)
        return newState
      }
    case 'TEAM_APPROVE_USER_REQUEST':
      if (action.status === 'SUCCESS' && state && state.pending_users) {
        const newState = {}
        Object.assign(newState, state)
        const deletedIndex = state.pending_users.indexOf(action.data)
        newState.pending_users.splice(deletedIndex, 1)
        newState.users.push(action.data)
        return newState
      }
    case 'TEAM_DENY_USER_REQUEST':
      if (action.status === 'SUCCESS' && state && state.pending_users) {
        const newState = {}
        Object.assign(newState, state)
        const deletedIndex = state.pending_users.indexOf(action.data)
        newState.pending_users.splice(deletedIndex, 1)
        return newState
      }
    case 'CREATE_COLLECTION':
      if (action.status === 'SUCCESS') {
        const newState = {}
        Object.assign(newState, state)
        newState.collections ? newState.collections.push(action.data) : null
        return newState
      }
    case 'UPDATE_COLLECTION':
      if (action.status === 'SUCCESS') {
        const newState = {}
        Object.assign(newState, state)
        if (state && state.collections) {
          const updatedIndex = state.collections.findIndex(d => d._id === action.data._id)
          newState.collections.splice(updatedIndex, 1, action.data)
        }
        return newState
      }
    case 'DELETE_COLLECTION':
      if (action.status === 'SUCCESS') {
        const newState = {}
        Object.assign(newState, state)
        const deletedIndex = state.collections.indexOf(action.data)
        newState.collections.splice(deletedIndex, 1)
        return newState
      }
    case 'CREATE_RESOURCE':
      if (action.status === 'SUCCESS') {
        const newState = {}
        Object.assign(newState, state)
        if (state && state.resources) {
          newState.resources.push(action.data)
          return newState
        }
      }
    case 'UPDATE_RESOURCE':
      if (action.status === 'SUCCESS') {
        const newState = {}
        Object.assign(newState, state)
        if (state && state.resources) {
          const updatedIndex = state.resources.findIndex(d => d._id === action.data._id)
          newState.resources.splice(updatedIndex, 1, action.data)
        }
        return newState
      }
    case 'DELETE_RESOURCE':
      if (action.status === 'SUCCESS') {
        const newState = {}
        Object.assign(newState, state)
        const deletedIndex = state.resources.indexOf(action.data)
        newState.resources.splice(deletedIndex, 1)
        return newState
      }
    default:
      return state
  }
  return state
}
