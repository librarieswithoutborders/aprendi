import {dbPath, setUpdateStatus, setRequestStatus, showAdminModal, hideAdminModal} from './index'

export function createTeam(teamInfo) {
  console.log(teamInfo)
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"CREATE_TEAM", status:"INITIATED"}))

    return fetch(
      dbPath + "/team",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(teamInfo)
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.error) {
          dispatch(setUpdateStatus({type:"CREATE_TEAM", status:"FAILED"}))
        } else {
          dispatch(hideAdminModal())
          dispatch(setUpdateStatus({type:"CREATE_TEAM", status:"SUCCESS", data: json}))
        }
      })
  }
}

export function updateTeam(teamInfo) {
  console.log(teamInfo)
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"UPDATE_TEAM", status:"INITIATED"}))

    return fetch(
      dbPath + "/team",
      {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(teamInfo)
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.error) {
          dispatch(setUpdateStatus({type:"UPDATE_TEAM", message:json.error.message, status:"FAILED"}))
        } else {
          dispatch(hideAdminModal())
          dispatch(setUpdateStatus({type:"UPDATE_TEAM", status:"SUCCESS", data:teamInfo.data}))
        }
      })
  }
}

export function deleteTeam(teamInfo) {
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"DELETE_TEAM", status:"INITIATED"}))
    return fetch(
      dbPath + '/team/?_id=' + teamInfo._id,
      {
        method: "DELETE"
      })
      .then(response => { return response.json()})
      .then(json => {
        console.log(json)

        dispatch(setUpdateStatus({type:"DELETE_TEAM", status:"SUCCESS", data: teamInfo}))
      })
  }
}

export function fetchTeam(path) {
  console.log("get team info for ", path)
  return (dispatch) => {
    dispatch(setRequestStatus({type:"FETCH_TEAM", status:"INITIATED"}))

    return fetch(
      dbPath + '/team/?path=' + path,
      {
        method: "GET"
      })
      .then(response => { return response.json()})
      .then(json => {
        console.log(json)
        if (json) {
          dispatch(setRequestStatus({type:"FETCH_TEAM", status:"SUCCESS", data:json}))
        } else {
          dispatch(setRequestStatus({type:"FETCH_TEAM", status:"FAILURE"}))
        }
      })
  }
}

export function fetchTeamList() {
  return (dispatch) => {
    dispatch(setRequestStatus({type:"FETCH_TEAMS", status:"INITIATED"}))

    return fetch(
      dbPath + '/teams',
      {
        method: "GET"
      })
      .then(response => { return response.json()})
      .then(json => {
        console.log(json)

        dispatch(setRequestStatus({type:"FETCH_TEAMS", status:"SUCCESS", data:json}))
      })
  }
}
