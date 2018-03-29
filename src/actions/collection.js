import {dbPath, setUpdateStatus, setRequestStatus, showAdminModal, hideAdminModal} from './index'

// maybe find away to call this somewhere else
import {fetchTeam} from './team'

export function createCollection(collectionInfo) {
  console.log(collectionInfo)
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"CREATE_COLLECTION", status:"INITIATED"}))

    return fetch(
      dbPath + "/collection",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(collectionInfo)
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.error) {
          dispatch(setUpdateStatus({type:"CREATE_COLLECTION", message:json.error.message, status:"FAILED"}))
        } else {
          dispatch(hideAdminModal())
          dispatch(setUpdateStatus({type:"CREATE_COLLECTION", status:"SUCCESS", data:json}))
        }
      })
  }
}

export function fetchCollection(path) {
  return (dispatch) => {
    dispatch(setRequestStatus({type:"FETCH_COLLECTION", status:"INITIATED"}))

    return fetch(
      dbPath + '/collection?path=' + path,
      {
        method: "GET"
      })
      .then(response => { return response.json()})
      .then(json => {
        console.log(json)
        if (json) {
          dispatch(setRequestStatus({type:"FETCH_COLLECTION", status:"SUCCESS", data:json}))
          dispatch(fetchTeam(json.team.path))
        } else {
          dispatch(setRequestStatus({type:"FETCH_COLLECTION", status:"FAILURE"}))
        }
      })
  }
}

export function fetchCollectionList() {
  return (dispatch) => {
    dispatch(setRequestStatus({type:"FETCH_COLLECTIONS", status:"INITIATED"}))

    return fetch(
      dbPath + '/collections',
      {
        method: "GET"
      })
      .then(response => { return response.json()})
      .then(json => {
        console.log(json)

        dispatch(setRequestStatus({type:"FETCH_COLLECTIONS", status:"SUCCESS", data:json}))
      })
  }
}

export function deleteCollection(collectionInfo) {
  console.log(collectionInfo)
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"DELETE_COLLECTION", status:"INITIATED"}))
    return fetch(
      dbPath + '/collection/?_id=' + collectionInfo._id,
      {
        method: "DELETE"
      })
      .then(response => { return response.json()})
      .then(json => {
        console.log(json)
        dispatch(setUpdateStatus({type:"DELETE_COLLECTION", status:"SUCCESS", data: collectionInfo}))

      })
  }
}

export function updateCollection(collectionInfo) {
  console.log(collectionInfo)
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"UPDATE_COLLECTION", status:"INITIATED"}))

    return fetch(
      dbPath + "/collection",
      {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(collectionInfo)
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.error) {
          dispatch(setUpdateStatus({type:"UPDATE_COLLECTION", message:json.error.message, status:"FAILED"}))
        } else {
          dispatch(hideAdminModal())
          dispatch(setUpdateStatus({type:"UPDATE_COLLECTION", status:"SUCCESS", data: collectionInfo.data}))
        }
      })
  }
}

export function collectionAddExistingResource(resource, parentId) {
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"COLLECTION_ADD_EXISTING_RESOURCE", status:"INITIATED"}))

    return fetch(
      dbPath + "/collection-add-resource",
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
          dispatch(setUpdateStatus({type:"COLLECTION_ADD_EXISTING_RESOURCE", message:json.error.message, status:"FAILED"}))
        } else {
          dispatch(hideAdminModal())
          dispatch(setUpdateStatus({type:"COLLECTION_ADD_EXISTING_RESOURCE", status:"SUCCESS", data: resource}))
        }
      })
  }
}

export function collectionRemoveResource(resource, parentId) {
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"COLLECTION_REMOVE_RESOURCE", status:"INITIATED"}))

    return fetch(
      dbPath + "/collection-remove-resource",
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
          dispatch(setUpdateStatus({type:"COLLECTION_REMOVE_RESOURCE", message:json.error.message, status:"FAILED"}))
        } else {
          dispatch(hideAdminModal())
          dispatch(setUpdateStatus({type:"COLLECTION_REMOVE_RESOURCE", status:"SUCCESS", data: resource}))
        }
      })
  }
}

export function collectionReorderChildren(collectionInfo) {
  console.log(collectionInfo)
  return (dispatch) => {
    dispatch(setUpdateStatus({type:"COLLECTION_REORDER_CHILDREN", status:"INITIATED"}))

    return fetch(
      dbPath + "/collection",
      {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(collectionInfo)
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.error) {
          dispatch(setUpdateStatus({type:"COLLECTION_REORDER_CHILDREN", message:json.error.message, status:"FAILED"}))
        } else {
          dispatch(setUpdateStatus({type:"COLLECTION_REORDER_CHILDREN", status:"SUCCESS", data: collectionInfo.data}))
        }
      })
  }
}

export function resetCurrCollection() {
  return {
    type: "RESET_CURR_COLLECTION",
  }
}
