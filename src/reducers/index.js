import { combineReducers } from 'redux';

// import * as types from '../actions/actionTypes'

function fullTeamList(state = [], action) {
  switch (action.type) {
    case "GET_FULL_TEAM_LIST_SUCCESS":
      return action.payload.data
    default:
      return state
  }
}

function currTeamInfo(state = {}, action) {
  switch (action.type) {
    case "GET_TEAM_INFO_SUCCESS":
      return action.payload.data
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
  } else {
    return state
  }
}

function collectionUpdateStatus(state = null, action) {
  switch (action.type) {
    case "CREATE_COLLECTION_SUCCESS":
      return "Success"
    case "DELETE_COLLECTION_SUCCESS":
      return "Success"
    case "DELETE_COLLECTION_FAIL":
        return "Failure"
    default:
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

function adminModalContent(state = null, action) {
  switch (action.type) {
    case "HIDE_ADMIN_MODAL":
      return null
    case "SHOW_ADMIN_MODAL":
      return action.props
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
  fullTeamList,
  currTeamInfo,
  updateStatus,
  adminModalContent,
  resourceViewerContent,
  currCollectionInvalidated,
  fetchedCollections,
  fetchedResourceLists,
  collectionList,
  userInfo
});

export default rootReducer;
