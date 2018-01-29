import { combineReducers } from 'redux';

import * as types from '../actions/actionTypes'

function fetchedResources(state = [], action) {
  switch (action.type) {
    case "FETCH_RESOURCES_SUCCESS":
      console.log(action)
      return action.payload.data

    default:
      return state
  }
}


const rootReducer = combineReducers({
  fetchedResources
});

export default rootReducer;
