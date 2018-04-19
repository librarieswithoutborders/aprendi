export const userList = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_USERS':
      if (action.status === 'SUCCESS') {
        return action.data
      }
    case 'TEAM_ADD_USER':
      if (action.status === 'SUCCESS') {
        return null
      }
    default:
      return state
  }
}

export const currUser = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return action.user || null

    case 'CREATE_TEAM':
      if (action.status === 'SUCCESS') {
        const newState = {}
        Object.assign(newState, state)
        newState.permissions.teams.push(action.data)
        return newState
      }
    case 'TEAM_REMOVE_USER':
      if (action.status === 'SUCCESS' && state && state.permissions && action.data._id === state.permissions._id) {
        const newState = {}
        Object.assign(newState, state)
        newState.permissions = 'Invalid'
        return newState
      }
    case 'TEAM_JOIN_REQUEST':
      if (action.status === 'SUCCESS') {
        const newState = {}
        Object.assign(newState, state)
        newState.permissions = 'Invalid'
        return newState
      }

    case 'FETCH_USER_PERMISSIONS':
      if (action.status === 'SUCCESS') {
        const newState = {}
        Object.assign(newState, state)
        newState.permissions = action.data
        return newState
      }

    default:
      return state
  }
}
