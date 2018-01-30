import { combineReducers } from 'redux';

// import * as types from '../actions/actionTypes'

function fetchedResources(state = [], action) {
  switch (action.type) {
    case "FETCH_RESOURCES_SUCCESS":
      console.log(action)
      return action.payload.data

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

function fetchedCollections(state = [], action) {
  switch (action.type) {
    case "FETCH_COLLECTION_DATA_SUCCESS":
      console.log(action)
      return action.payload.data
    default:
      return state
  }
}

function adminModal(state = null, action) {
  switch (action.type) {
    case "HIDE_ADMIN_MODAL":
      return null
    case "SHOW_ADMIN_MODAL":
        return {}
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
  adminModal,
  fetchedResources,
  fetchedCollections,
  collectionList,
  userInfo
});

export default rootReducer;
