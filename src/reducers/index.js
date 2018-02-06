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

function teamUpdateStatus(state = null, action) {
  switch (action.type) {
    case "CREATE_TEAM_SUCCESS":
      return "Success"
    case "DELETE_TEAM_SUCCESS":
      return "Success"
    case "DELETE_TEAM_FAIL":
        return "Success"
    default:
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

// function fetchedResources(state = [], action) {
//   switch (action.type) {
//     case "FETCH_RESOURCES_SUCCESS":
//       console.log(action)
//       return action.payload.data
//
//     default:
//       return state
//   }
// }

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
      return {data: action.data, formType: action.formType }
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

const rootReducer = combineReducers({
  fullTeamList,
  currTeamInfo,
  teamUpdateStatus,
  collectionUpdateStatus,
  adminModalContent,
  // fetchedResources,
  fetchedCollections,
  collectionList,
  userInfo
});

export default rootReducer;
