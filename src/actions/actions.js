import * as types from './actionTypes';
import addDateHash from '../utils/addDateHash'
import { getCurrUser } from '../utils/AuthService'

const dbPath = process.env.NODE_ENV === "production" ? 'http://mylibraryguide-server.herokuapp.com' : 'http://localhost:3333'


export function setUpdateStatus({type, message, status, data}) {
  return {
    type,
    status,
    message,
    data
  }
}

export function setRequestStatus({type, status, data}) {
  return {
    type: type,
    status: status,
    data: data
  }
}

export function showAdminModal(content) {
  return {
    type: "SHOW_ADMIN_MODAL",
    content
  }
}

export function hideAdminModal() {
  return {
    type: "HIDE_ADMIN_MODAL",
  }
}

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

//TEAM

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

//Collection

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

// subcollection

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

// Resource

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

export function uploadFile(file, addHash, callback) {
  let newFile = addHash ? addDateHash(file) : file

  let reader = new FileReader()
  console.log(reader.readAsDataURL(newFile))

  return (dispatch) => {
    dispatch(setUpdateStatus({type:"UPLOAD_FILE", status:"INITIATED"}))

    return getS3SignedRequest(newFile, response => {
      console.log(response)
      if (!response || !response.signedUrl) {
        dispatch(setUpdateStatus({type:"UPLOAD_FILE", status:"FAILED"}))
        return
      } else {
        return fetch(
          response.signedUrl,
          {
            method: "PUT",
            body: newFile
          }
        )
        .then(response => {
          console.log(response)
          if (response.status == 200) {
            dispatch(setUpdateStatus({type:"UPLOAD_FILE", status:"SUCCESS"}))
            callback ? callback(newFile.name) : null
          }
        })
      }
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

function getS3SignedRequest(file, callback) {
  return fetch(
    dbPath + '/sign-s3?file-name=' + file.name + '&file-type=' + file.type,
    {
      method: "GET"
    }
  ).then(response => response.json())
  .then(callback)
}


//
//
// // search user by email auth0 /get_users_by_email endpoint,
// // if user exists, then add object containing their email, user_id, and name to team
// export function addUserToTeam(userEmail) {
//   console.log("adding user ", userEmail)
//   return {
//     type: types.ADD_USER_TO_TEAM,
//     payload: {
//       request:{
//         method:'get',
//         url:'/team/?team_id=' + teamId
//       }
//     }
//   }
// }
//
//


export function setCurrResourceIndex(newIndex) {
  return {
    type: types.SET_CURR_RESOURCE_INDEX,
    newIndex
  }
}



export function sendUserInfoRequest() {
  console.log("getting user info")
  return (dispatch) => {
    getCurrUser().then(user => {
      console.log(user)
      if (user) {
        dispatch(getUserTeam(user))
      }
    })
  }
}

export function getUserTeam(user) {
  console.log(user)
  return (dispatch) => {
    console.log(dispatch)
    dispatch(setRequestStatus({type:"FETCH_USER_TEAM", status:"INITIATED"}))

    return fetch(
      dbPath + '/user',
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
          dispatch(setRequestStatus({type:"FETCH_USER_TEAM", status:"SUCCESS", data:json}))
          dispatch(setUserInfo({userInfo: user, permissions: json}))
        } else {
          dispatch(setRequestStatus({type:"FETCH_USER_TEAM", status:"FAILURE"}))
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
