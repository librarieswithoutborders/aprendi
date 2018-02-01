import * as types from './actionTypes';

export function fetchResources() {
  return {
    type: types.FETCH_RESOURCES,
    payload: {
      request:{
        method:'get',
        url:'/resources'
      }
    }
  }
}

export function fetchCollectionList() {
  return {
    type: types.FETCH_COLLECTION_LIST,
    payload: {
      request:{
        method:'get',
        url:'/collections'
      }
    }
  }
}

export function fetchCollectionData(collectionId) {
  return {
    type: types.FETCH_COLLECTION_DATA,
    payload: {
      request:{
        method:'get',
        url:'/collection/' + collectionId
      }
    }
  }
}

export function editCollection() {
  return {
    type: types.FETCH_COLLECTION_DATA,
    payload: {
      request:{
        method:'get',
        url:'/collection'
      }
    }
  }
}

export function showAdminModal() {
  return {
    type: types.SHOW_ADMIN_MODAL
  }
}

export function hideAdminModal() {
  return {
    type: types.HIDE_ADMIN_MODAL
  }
}

export function setUserInfo(user) {
  return {
    type: types.SET_USER_INFO,
    user: user
  }
}
