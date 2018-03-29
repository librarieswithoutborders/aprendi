import {dbPath, setUpdateStatus, setRequestStatus, showAdminModal, hideAdminModal} from './index'

export function showResourceViewer({parent, resourceList, currIndex}) {
  return {
    type: 'SHOW_RESOURCE_VIEWER',
    parent,
    resourceList,
    currIndex
  }
}

export function hideResourceViewer() {
  return {
    type: 'HIDE_RESOURCE_VIEWER'
  }
}

export function setCurrResourceIndex(newIndex) {
  return {
    type: 'SET_CURR_RESOURCE_INDEX',
    newIndex
  }
}

export function createResource(resourceInfo) {
  console.log(resourceInfo)
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"CREATE_RESOURCE", status:"INITIATED"}))

    return fetch(
      dbPath + "/resource",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resourceInfo)
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.error) {
          dispatch(setUpdateStatus({type:"CREATE_RESOURCE", message:json.error.message, status:"FAILED"}))
        } else {
          dispatch(hideAdminModal())
          dispatch(setUpdateStatus({type:"CREATE_RESOURCE", status:"SUCCESS", data:json}))
        }
      })
  }
}

export function updateResource(resourceInfo) {
  console.log(resourceInfo)
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"UPDATE_RESOURCE", status:"INITIATED"}))

    return fetch(
      dbPath + "/resource",
      {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resourceInfo)
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.error) {
          dispatch(setUpdateStatus({type:"UPDATE_RESOURCE", message:json.error.message, status:"FAILED"}))
        } else {
          dispatch(hideAdminModal())
          dispatch(setUpdateStatus({type:"UPDATE_RESOURCE", status:"SUCCESS", data: resourceInfo.data}))
        }
      })
  }
}

export function deleteResource(resourceInfo) {
  console.log(resourceInfo)
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"DELETE_RESOURCE", status:"INITIATED"}))
    return fetch(
      dbPath + '/resource/?_id=' + resourceInfo._id,
      {
        method: "DELETE"
      })
      .then(response => { return response.json()})
      .then(json => {
        console.log(json)
        dispatch(setUpdateStatus({type:"DELETE_RESOURCE", status:"SUCCESS", data: resourceInfo}))
      })
  }
}

export function fetchResourceList() {
  return (dispatch) => {
    dispatch(setRequestStatus({type:"FETCH_RESOURCES", status:"INITIATED"}))

    return fetch(
      dbPath + '/resources',
      {
        method: "GET"
      })
      .then(response => { return response.json()})
      .then(json => {
        console.log(json)

        dispatch(setRequestStatus({type:"FETCH_RESOURCES", status:"SUCCESS", data:json}))
      })
  }
}

export function fetchSharedResourceList() {
  console.log("fetching shared resources")
  return (dispatch) => {
    dispatch(setRequestStatus({type:"FETCH_SHARED_RESOURCES", status:"INITIATED"}))

    return fetch(
      dbPath + '/resources?just_shared=true',
      {
        method: "GET"
      })
      .then(response => { return response.json()})
      .then(json => {
        console.log(json)

        dispatch(setRequestStatus({type:"FETCH_SHARED_RESOURCES", status:"SUCCESS", data:json}))
      })
  }
}
