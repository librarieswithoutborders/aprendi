import {dbPath, setUpdateStatus, setRequestStatus, showAdminModal, hideAdminModal} from './index'

export function createSubcollection(subcollectionInfo) {
  console.log(subcollectionInfo)
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"CREATE_SUBCOLLECTION", status:"INITIATED"}))

    return fetch(
      dbPath + "/subcollection",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subcollectionInfo)
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.error) {
          dispatch(setUpdateStatus({type:"CREATE_SUBCOLLECTION", message:json.error.message, status:"FAILED"}))
        } else {
          dispatch(hideAdminModal())
          dispatch(setUpdateStatus({type:"CREATE_SUBCOLLECTION", status:"SUCCESS"}))
        }
      })
  }
}

export function updateSubcollection(subcollectionInfo) {
  console.log(subcollectionInfo)
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"UPDATE_SUBCOLLECTION", status:"INITIATED"}))

    return fetch(
      dbPath + "/subcollection",
      {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subcollectionInfo)
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.error) {
          dispatch(setUpdateStatus({type:"UPDATE_SUBCOLLECTION", message:json.error.message, status:"FAILED"}))
        } else {
          dispatch(hideAdminModal())
          dispatch(setUpdateStatus({type:"UPDATE_SUBCOLLECTION", status:"SUCCESS", data: subcollectionInfo.data}))
        }
      })
  }
}

export function subcollectionReorderChildren(subcollectionInfo) {
  console.log(subcollectionInfo)
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"SUBCOLLECTION_REORDER_CHILDREN", status:"INITIATED"}))

    return fetch(
      dbPath + "/subcollection",
      {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subcollectionInfo)
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.error) {
          dispatch(setUpdateStatus({type:"SUBCOLLECTION_REORDER_CHILDREN", message:json.error.message, status:"FAILED"}))
        } else {
          dispatch(setUpdateStatus({type:"SUBCOLLECTION_REORDER_CHILDREN", status:"SUCCESS", data: subcollectionInfo.data}))
        }
      })
  }
}

export function subcollectionAddExistingResource(resource, parentId) {
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"SUBCOLLECTION_ADD_EXISTING_RESOURCE", status:"INITIATED"}))

    return fetch(
      dbPath + "/subcollection-add-resource",
      {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({resourceId: resource._id, parentId: parentId})
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.error) {
          dispatch(setUpdateStatus({type:"SUBCOLLECTION_ADD_EXISTING_RESOURCE", message:json.error.message, status:"FAILED"}))
        } else {
          dispatch(hideAdminModal())
          dispatch(setUpdateStatus({type:"SUBCOLLECTION_ADD_EXISTING_RESOURCE", status:"SUCCESS", data: resource}))
        }
      })
  }
}

export function subcollectionRemoveResource(resource, parentId) {
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"SUBCOLLECTION_REMOVE_RESOURCE", status:"INITIATED"}))

    return fetch(
      dbPath + "/subcollection-remove-resource",
      {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({resourceId: resource._id, parentId: parentId})
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.error) {
          dispatch(setUpdateStatus({type:"SUBCOLLECTION_REMOVE_RESOURCE", message:json.error.message, status:"FAILED"}))
        } else {
          dispatch(hideAdminModal())
          dispatch(setUpdateStatus({type:"SUBCOLLECTION_REMOVE_RESOURCE", status:"SUCCESS", data: resource}))
        }
      })
  }
}

export function deleteSubcollection({subcollectionInfo, parentId, parentType}) {
  console.log(subcollectionInfo)
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"DELETE_SUBCOLLECTION", status:"INITIATED"}))
    return fetch(
      dbPath + '/subcollection/?_id=' + subcollectionInfo._id + "&parent_id=" + parentId + "parent_type=" + parentType,
      {
        method: "DELETE"
      })
      .then(response => { return response.json()})
      .then(json => {
        console.log(json)
        dispatch(setUpdateStatus({type:"DELETE_SUBCOLLECTION", status:"SUCCESS", data: subcollectionInfo}))

      })
  }
}
