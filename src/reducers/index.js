import { combineReducers } from 'redux';

// import * as types from '../actions/actionTypes'

function adminModalContent(state = null, action) {
  switch (action.type) {
    case "HIDE_ADMIN_MODAL":
      return null
    case "SHOW_ADMIN_MODAL":
      return action.content
    default:
      return state
  }
}

function teamList(state = [], action) {
  switch (action.type) {
    case "FETCH_TEAMS":
      if (action.status === "SUCCESS") {
        return action.data
      }
    case "CREATE_TEAM":
      if (action.status === "SUCCESS") {
        console.log("success!")
        console.log([...state, ...[action.data]])
        return [...state, ...[action.data]]
      }
    case "UPDATE_TEAM":
      if (action.status === "SUCCESS") {
        let updatedIndex = state.indexOf(action.data)
        state.splice(updatedIndex, 1, action.data)
        return [...state]
      }
    case "DELETE_TEAM":
      if (action.status === "SUCCESS") {
        let deletedIndex = state.indexOf(action.data)
        state.splice(deletedIndex, 1)
        return [...state]
      }
    default:
      return state
  }
}

function updateStatus(state = null, action) {
  let splitPieces = action.type.split("_")
  if (splitPieces[0] === "CREATE" || splitPieces[0] === "UPDATE" || splitPieces[0] === "DELETE") {
    return action.status
  } else if (action.type === "HIDE_ADMIN_MODAL"){
    return null
  } else {
    return state
  }
}

function currTeam(state = null, action) {
  switch (action.type) {
    case "FETCH_TEAM":
      if (action.status === "SUCCESS") {
        return action.data
      } else if (action.status === "FAILURE") {
        return "Not Found"
      } else {
        return "Fetching"
      }
    case "UPDATE_TEAM":
      if (action.status === "SUCCESS") {
        return action.data
      }
    case "DELETE_TEAM":
      if (action.status === "SUCCESS") {
        return null
      }
    case "CREATE_COLLECTION":
      if (action.status === "SUCCESS") {
        let newState = {}
        Object.assign(newState, state)
        newState.collections.push(action.data)
        return newState
      }
    case "UPDATE_COLLECTION":
      if (action.status === "SUCCESS") {
        let newState = {}
        Object.assign(newState, state)
        let deletedIndex = state.collections.indexOf(action.data)
        newState.collections.splice(deletedIndex, 1, action.data)
        return newState
      }
    case "DELETE_COLLECTION":
      if (action.status === "SUCCESS") {
        let newState = {}
        Object.assign(newState, state)
        let deletedIndex = state.collections.indexOf(action.data)
        newState.collections.splice(deletedIndex, 1)
        return newState
      }
    default:
      return state
  }
}

function currCollection(state = null, action) {
  switch (action.type) {
    case "FETCH_COLLECTION":
      if (action.status === "SUCCESS") {
        return action.data
      } else if (action.status === "FAILURE") {
        return "Not Found"
      } else {
        return "Fetching"
      }
    case "UPDATE_COLLECTION":
      if (action.status === "SUCCESS") {
        return action.data
      }
    case "COLLECTION_REORDER_CHILDREN":
      if (action.status === "SUCCESS") {
        return "Invalid"
      }
    case "DELETE_COLLECTION":
      if (action.status === "SUCCESS") {
        return null
      }
    case "CREATE_SUBCOLLECTION":
      if (action.status === "SUCCESS") {
        return "Invalid"
      }
    case "UPDATE_SUBCOLLECTION":
      if (action.status === "SUCCESS") {
        return "Invalid"
      }
    case "SUBCOLLECTION_REORDER_CHILDREN":
      if (action.status === "SUCCESS") {
        return "Invalid"
      }
    case "DELETE_SUBCOLLECTION":
      if (action.status === "SUCCESS") {
        return "Invalid"
      }
    default:
      return state
  }
}

function newBrowserLocation(state = null, action) {
  switch (action.type) {
    case "NEW_BROWSER_LOCATION":
      return action.newUrl
    default:
      return state
  }
}

function currTeamInvalidated(state = false, action) {
  switch (action.type) {
    case "INVALIDATE_CURR_TEAM":
      return true
    case "GET_TEAM_INFO_SUCCESS":
      return false
    default:
      return state
  }
}

function updateStatus(state = null, action) {
  let splitPieces = action.type.split("_")
  if (splitPieces[0] === "CREATE" || splitPieces[0] === "UPDATE" || splitPieces[0] === "DELETE") {
    switch (splitPieces[2]) {
      case "SUCCESS":
        return "Success"
      case "FAIL":
        return "Failure"
      default:
        return state
    }
  } else if (action.type === "HIDE_ADMIN_MODAL"){
    return null
  } else {
    return state
  }
}

// "all" is placeholder for now
function fetchedResourceLists(state = {}, action) {
  switch (action.type) {
    case "FETCH_RESOURCE_LIST_SUCCESS":
      console.log(action)
      return Object.assign({}, state, {
        all : action.payload.data
      })
    default:
      return state
  }
}

function collectionList(state = [], action) {
  switch (action.type) {
    case "FETCH_COLLECTION_LIST_SUCCESS":
      console.log(action)
      return action.payload.data

    default:
      return state
  }
}

function fetchedCollections(state = {}, action) {
  switch (action.type) {
    case "FETCH_COLLECTION_SUCCESS":
      console.log(action)
      return Object.assign({}, state, {
        [action.payload.data.path] : action.payload.data
      })
    default:
      return state
  }
}



function userInfo(state = {}, action) {
  switch (action.type) {
    case "SET_USER_INFO":
      return action.user || {}
    default:
      return state
  }
}

function currCollectionInvalidated(state = false, action) {
  switch (action.type) {
    case "INVALIDATE_CURR_COLLECTION":
      return true
    case "FETCH_COLLECTION_SUCCESS":
      return false
    default:
      return state
  }
}

function resourceViewerContent(state = null, action) {
  switch (action.type) {
    case "HIDE_RESOURCE_VIEWER":
      return null
    case "SHOW_RESOURCE_VIEWER":
      return {
        parent: action.parent,
        resourceList: action.resourceList,
        currIndex: action.currIndex
      }
    case "SET_CURR_RESOURCE_INDEX":
      return Object.assign({}, state, {
        "currIndex": action.newIndex
      })
    default:
      return state
  }
}



const rootReducer = combineReducers({
  adminModalContent,
  teamList,
  currTeam,
  currCollection,
  newBrowserLocation
  // updateStatus,
  // adminModalContent,
  // resourceViewerContent,
  // currCollectionInvalidated,
  // currTeamInvalidated,
  // fetchedCollections,
  // fetchedResourceLists,
  // collectionList,
  // userInfo
});

export default rootReducer;
