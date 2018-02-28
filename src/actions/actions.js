import * as types from './actionTypes';
import addDateHash from '../utils/addDateHash'

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
// export function invalidateCurrTeam() {
//   return {
//     type: types.INVALIDATE_CURR_TEAM,
//   }
// }
//
// //Collection
//
// export function createCollection(collectionInfo) {
//   return {
//     type: types.CREATE_COLLECTION,
//     payload: {
//       request:{
//         method:'post',
//         url:'/collection',
//         data: collectionInfo
//       }
//     }
//   }
// }
//
// export function deleteCollection(id) {
//   console.log("deleting collection", id)
//   return {
//     type: types.DELETE_COLLECTION,
//     payload: {
//       request:{
//         method:'delete',
//         url:'/collection/?_id=' + id
//       }
//     }
//   }
// }
//
// export function updateCollection(collectionInfo) {
//   console.log(collectionInfo)
//   return {
//     type: types.UPDATE_COLLECTION,
//     payload: {
//       request:{
//         method:'put',
//         url:'/collection',
//         data: collectionInfo
//       }
//     }
//   }
// }
//
// export function fetchCollectionsByTeam(teamId) {
//   return {
//     type: types.FETCH_COLLECTIONS_BY_TEAM,
//     payload: {
//       request:{
//         method:'get',
//         url:'/collections/?team=' + teamId,
//       }
//     }
//   }
// }
//
// export function fetchResourceList() {
//   return {
//     type: types.FETCH_RESOURCE_LIST,
//     payload: {
//       request:{
//         method:'get',
//         url:'/resources'
//       }
//     }
//   }
// }
//
// export function fetchCollectionList() {
//   return {
//     type: types.FETCH_COLLECTION_LIST,
//     payload: {
//       request:{
//         method:'get',
//         url:'/collections'
//       }
//     }
//   }
// }
//
// export function fetchCollection(collectionId) {
//   return {
//     type: types.FETCH_COLLECTION,
//     payload: {
//       request:{
//         method:'get',
//         url:'/collection?path=' + collectionId
//       }
//     }
//   }
// }
//
// export function invalidateCurrCollection() {
//   return {
//     type: types.INVALIDATE_CURR_COLLECTION,
//   }
// }
//
//
// //subcollection
//
// export function createSubcollection(subcollectionInfo) {
//   return {
//     type: types.CREATE_SUBCOLLECTION,
//     payload: {
//       request:{
//         method:'post',
//         url:'/subcollection',
//         data: subcollectionInfo
//       }
//     }
//   }
// }
//
// export function updateSubcollection(subcollectionInfo) {
//   return {
//     type: types.UPDATE_SUBCOLLECTION,
//     payload: {
//       request:{
//         method:'put',
//         url:'/subcollection',
//         data: subcollectionInfo
//       }
//     }
//   }
// }
//
// export function deleteSubcollection({id, parentId, parentType}) {
//   console.log("deleting subcollection", id)
//   return {
//     type: types.DELETE_SUBCOLLECTION,
//     payload: {
//       request:{
//         method:'delete',
//         url:'/subcollection/?_id=' + id + "&parent_id=" + parentId + "&parent_type=" + parentType
//       }
//     }
//   }
// }
//
// //Resource
//
// export function createResource(resourceInfo) {
//   return {
//     type: types.CREATE_RESOURCE,
//     payload: {
//       request:{
//         method:'post',
//         url:'/resource',
//         data: resourceInfo
//       }
//     }
//   }
// }
//
// export function deleteResource(id) {
//   console.log("deleting resource", id)
//   return {
//     type: types.DELETE_RESOURCE,
//     payload: {
//       request:{
//         method:'delete',
//         url:'/resource/?_id=' + id
//       }
//     }
//   }
// }
//
// export function updateResource(resourceInfo) {
//   console.log(resourceInfo)
//   return {
//     type: types.UPDATE_RESOURCE,
//     payload: {
//       request:{
//         method:'put',
//         url:'/resource',
//         data: resourceInfo
//       }
//     }
//   }
// }
//
// export function addResourceToCollection(resourceId, parent) {
//   console.log(resourceId, parent)
//   return {
//     type: parent.parentType == "collection" ? types.UPDATE_COLLECTION : types.UPDATE_SUBCOLLECTION,
//     payload: {
//       request:{
//         method:'put',
//         url:parent.parentType == "collection" ? '/collection-add-resource' : '/subcollection-add-resource',
//         data: {resourceId: resourceId, parentId: parent.parentId}
//       }
//     }
//   }
// }
//
// export function removeResourceFromCollection(resourceId, parent) {
//   console.log(resourceId, parent)
//   return {
//     type: parent.parentType == "collection" ? types.UPDATE_COLLECTION : types.UPDATE_SUBCOLLECTION,
//     payload: {
//       request:{
//         method:'put',
//         url:parent.parentType == "collection" ? '/collection-remove-resource' : '/subcollection-remove-resource',
//         data: {resourceId: resourceId, parentId: parent.parentId}
//       }
//     }
//   }
// }
//
// export function setCurrResourceIndex(newIndex) {
//   return {
//     type: types.SET_CURR_RESOURCE_INDEX,
//     newIndex
//   }
// }
//
//
// export function showAdminModal(props) {
//   return {
//     type: types.SHOW_ADMIN_MODAL,
//     props
//   }
// }
//
// export function hideAdminModal() {
//   return {
//     type: types.HIDE_ADMIN_MODAL
//   }
// }
//


//
// export function setUserInfo(user) {
//   return {
//     type: types.SET_USER_INFO,
//     user: user
//   }
// }
//
// export function uploadImage(file) {
//   return {
//     type: types.UPLOAD_IMAGE,
//     payload: {
//       request:{
//         method:'put',
//         url:'/upload-image',
//         data: file
//       }
//     }
//   }
// }
//
// export function getS3SignedRequest(file) {
//   return {
//     type: types.GET_S3_SIGNED_REQUEST,
//     payload: {
//       request:{
//         method:'get',
//         url:'/sign-s3?file-name=' + file.name + '&file-type=' + file.type
//       }
//     }
//   }
// }
