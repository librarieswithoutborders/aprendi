import {dbPath, setUpdateStatus, setRequestStatus, hideAdminModal} from './index'

import {getCurrUser} from '../utils/AuthService'

export function sendUserInfoRequest() {
  return dispatch => {
    dispatch(setRequestStatus({type: 'FETCH_USER_INFO', status: 'INITIATED'}))
    getCurrUser()
      .then(user => {
        if (user) {
          dispatch(setRequestStatus({type: 'FETCH_USER_INFO', status: 'SUCCESS', data: user}))
          dispatch(fetchUserPermissions(user))
        } else {
          dispatch(setRequestStatus({type: 'FETCH_USER_INFO', status: 'FAILURE'}))
        }
      })
  }
}

export function setCurrUserInfo(user) {
  return {
    type: 'SET_CURR_USER_INFO',
    data: user
  }
}

export function logoutUser() {
  return {
    type: 'USER_LOGOUT'
  }
}

export function fetchUserPermissions(user) {
  return dispatch => {
    dispatch(setRequestStatus({type: 'FETCH_USER_PERMISSIONS', status: 'INITIATED'}))

    return fetch(
      `${dbPath}/user-find-by-auth0id`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then(json => {
        if (json) {
          dispatch(setRequestStatus({type: 'FETCH_USER_PERMISSIONS', status: 'SUCCESS', data: json}))
        } else {
          dispatch(setRequestStatus({type: 'FETCH_USER_PERMISSIONS', status: 'FAILURE'}))
        }
      })
  }
}

export function addUserToTeam(user, team, approvalStatus) {
  return dispatch => {
    dispatch(setUpdateStatus({type: approvalStatus === 'pending' ? 'TEAM_JOIN_REQUEST' : 'TEAM_ADD_USER', status: 'INITIATED'}))

    return fetch(
      `${dbPath}/team_add_user`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: user._id, teamId: team._id, approvalStatus: approvalStatus})
      })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(setUpdateStatus({type: approvalStatus === 'pending' ? 'TEAM_JOIN_REQUEST' : 'TEAM_ADD_USER', message: json.error.message, status: 'FAILED'}))
        } else {
          dispatch(hideAdminModal())
          dispatch(setUpdateStatus({type: approvalStatus === 'pending' ? 'TEAM_JOIN_REQUEST' : 'TEAM_ADD_USER', status: 'SUCCESS', data: json}))
        }
      })
  }
}

export function removeUserFromTeam(user, team, isSelf) {
  const actionType = isSelf ? 'USER_LEAVE_TEAM' : 'TEAM_REMOVE_USER'
  return dispatch => {
    dispatch(setUpdateStatus({type: actionType, status: 'INITIATED'}))

    return fetch(
      `${dbPath}/team_remove_user`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: user._id, teamId: team._id})
      })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(setUpdateStatus({type: actionType, message: json.error.message, status: 'FAILED'}))
        } else {
          dispatch(setUpdateStatus({type: actionType, status: 'SUCCESS', data: json}))
        }
      })
  }
}

export function makeUserCoreAdmin(userInfo) {
  return dispatch => {
    dispatch(setUpdateStatus({type: 'UPDATE_USER', status: 'INITIATED'}))

    return fetch(
      `${dbPath}/user-make-core-admin`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(setUpdateStatus({type: 'UPDATE_USER', message: json.error.message, status: 'FAILED'}))
        } else {
          dispatch(setUpdateStatus({type: 'UPDATE_USER', status: 'SUCCESS', data: userInfo}))
        }
      })
  }
}

export function fetchUserList() {
  return dispatch => {
    dispatch(setRequestStatus({type: 'FETCH_USERS', status: 'INITIATED'}))

    return fetch(
      `${dbPath}/users`,
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
        dispatch(setRequestStatus({type: 'FETCH_USERS', status: 'SUCCESS', data: json}))
      })
  }
}
