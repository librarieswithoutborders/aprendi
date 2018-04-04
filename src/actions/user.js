import {dbPath, setUpdateStatus, setRequestStatus, showAdminModal, hideAdminModal} from './index'

import { getCurrUser } from '../utils/AuthService'

export function sendUserInfoRequest() {
  console.log("in sendUserInfoRequest, getting user info")
  return (dispatch) => {
    dispatch(setUserInfo("fetching"))
    getCurrUser()
      .then(user => {
        console.log("getCurrUser result", user)
        if (user) {
          dataLayer.push({'userId': user._id})
          dispatch(setUserInfo({userInfo: user}))
          dispatch(fetchUserPermissions(user))
        } else {
          dispatch(setUserInfo(null))
        }
      })
  }
}

export function fetchUserPermissions(user) {
  console.log("in getUserPermissions, user is", user)
  return (dispatch) => {
    console.log(dispatch)
    dispatch(setRequestStatus({type:"FETCH_USER_PERMISSIONS", status:"INITIATED"}))

    return fetch(
      dbPath + '/user-find-by-auth0id',
      {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(response => { return response.json()})
      .then(json => {
        console.log(json, user)
        if (json) {
          dispatch(setRequestStatus({type:"FETCH_USER_PERMISSIONS", status:"SUCCESS", data:json}))
          dispatch(setUserInfo({userInfo: user, permissions: json}))
        } else {
          dispatch(setRequestStatus({type:"FETCH_USER_PERMISSIONS", status:"FAILURE"}))
          dispatch(setUserInfo({userInfo: user}))
        }
      })
    }
}

export function setUserInfo(user) {
  return {
    type: "SET_USER_INFO",
    user: user
  }
}

export function addUserToTeam(user, team) {
  console.log("adding", user, team)
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"TEAM_ADD_USER", status:"INITIATED"}))

    return fetch(
      dbPath + "/team_add_user",
      {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: user._id, teamId: team._id})
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.error) {
          dispatch(setUpdateStatus({type:"TEAM_ADD_USER", message:json.error.message, status:"FAILED"}))
        } else {
          dispatch(hideAdminModal())
          dispatch(setUpdateStatus({type:"TEAM_ADD_USER", status:"SUCCESS", data: user}))
        }
      })
  }
}

export function removeUserFromTeam(user, team) {
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"TEAM_REMOVE_USER", status:"INITIATED"}))

    return fetch(
      dbPath + "/team_remove_user",
      {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: user._id, teamId: team._id})
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.error) {
          dispatch(setUpdateStatus({type:"TEAM_REMOVE_USER", message:json.error.message, status:"FAILED"}))
        } else {
          dispatch(setUpdateStatus({type:"TEAM_REMOVE_USER", status:"SUCCESS", data: user}))
        }
      })
  }
}

export function updateUser(userInfo) {
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"UPDATE_USER", status:"INITIATED"}))

    return fetch(
      dbPath + "/user",
      {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.error) {
          dispatch(setUpdateStatus({type:"UPDATE_USER", message:json.error.message, status:"FAILED"}))
        } else {
          dispatch(setUpdateStatus({type:"UPDATE_USER", status:"SUCCESS", data: json}))
        }
      })
  }
}

export function fetchUserList() {
  return (dispatch) => {
    dispatch(setRequestStatus({type:"FETCH_USERS", status:"INITIATED"}))

    return fetch(
      dbPath + '/users',
      {
        method: "GET"
      })
      .then(response => { return response.json()})
      .then(json => {
        console.log(json)

        dispatch(setRequestStatus({type:"FETCH_USERS", status:"SUCCESS", data:json}))
      })
  }
}
