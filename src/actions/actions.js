import * as types from './actionTypes';

export function fetchResources() {
  return {
    type: types.FETCH_RESOURCES,
    payload: {
      request:{
        method:'get',
        url:'/api/jokes/food'
      }
    }
  }
}
