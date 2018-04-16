import {combineReducers} from 'redux';

import {collectionList, currCollection} from './collection'
import {teamList, currTeam} from './team'
import {userList, currUser} from './user'
import {resourceList, sharedResourceList, resourceViewerContent} from './resource'


const adminModalContent = (state = null, action) => {
  switch (action.type) {
    case 'HIDE_ADMIN_MODAL':
      return null
    case 'SHOW_ADMIN_MODAL':
      return action.content
    default:
      return state
  }
}

const warningModalContent = (state = null, action) => {
  switch (action.type) {
    case 'HIDE_WARNING_MODAL':
      return null
    case 'SHOW_WARNING_MODAL':
      return action.content
    default:
      return state
  }
}

const updateStatus = (state = null, action) => {
  const splitPieces = action.type.split('_')
  if (splitPieces[0] === 'CREATE' || splitPieces[0] === 'UPDATE' || splitPieces[0] === 'DELETE') {
    return action
  } else if (action.type === 'FILE_UPLOAD') {
    return action
  } else if (action.type === 'TEAM_APPROVE_USER_REQUEST') {
    return action
  } else if (action.type === 'TEAM_DENY_USER_REQUEST') {
    return action
  } else if (action.type === 'TEAM_JOIN_REQUEST') {
    return action
  }
  return state
}


const fileUploadStatus = (state = null, action) => {
  switch (action.type) {
    case 'FILE_UPLOAD':
      if (action.status === 'SUCCESS') {
        return action.data
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  currTeam,
  currUser,
  currCollection,
  teamList,
  userList,
  collectionList,
  resourceList,
  sharedResourceList,
  resourceViewerContent,
  adminModalContent,
  warningModalContent,
  updateStatus,
  fileUploadStatus
});

export default rootReducer;
