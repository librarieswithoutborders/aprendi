export const dbPath = process.env.NODE_ENV === 'production' ? 'https://mylibraryguide-server.herokuapp.com' : 'http://localhost:3333'

import processFileName from '../utils/processFileName'

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
    type: 'SHOW_ADMIN_MODAL',
    content
  }
}

export function hideAdminModal() {
  return {
    type: 'HIDE_ADMIN_MODAL'
  }
}

export function uploadFile(file, addHash, callback) {
  const newFile = processFileName(file, addHash)

  // let reader = new FileReader()
  // console.log(reader.readAsDataURL(newFile))

  return dispatch => {
    dispatch(setUpdateStatus({type: 'UPLOAD_FILE', status: 'INITIATED'}))

    return getS3SignedRequest(newFile, response => {
      console.log(response)
      if (!response || !response.signedUrl) {
        dispatch(setUpdateStatus({type: 'UPLOAD_FILE', status: 'FAILED'}))
        return
      }
      return fetch(
        response.signedUrl,
        {
          method: 'PUT',
          body: newFile
        }
      )
        .then(response => {
          console.log(response)
          if (response.status == 200) {
            dispatch(setUpdateStatus({type: 'UPLOAD_FILE', status: 'SUCCESS'}))
            callback ? callback(newFile.name) : null
          }
        })
    })
  }
}

export function takeWebScreenshot(url, callback) {
  return dispatch => {
    dispatch(setUpdateStatus({type: 'FILE_UPLOAD', status: 'INITIATED'}))

    return fetch(
      `${dbPath}/take-web-screenshot?url=${url}`,
      {
        method: 'GET'
      }
    ).then(response => response.json())
      .then(d => {
        console.log(d)
        callback(d)
        dispatch(setUpdateStatus({type: 'FILE_UPLOAD', status: 'SUCCESS', data: d}))
      })
  }
}

function getS3SignedRequest(file, callback) {
  return fetch(
    `${dbPath}/sign-s3?file-name=${file.name}&file-type=${file.type}`,
    {
      method: 'GET'
    }
  ).then(response => response.json())
    .then(callback)
}

export function checkExternalSiteHeaders(url, callback) {
  return fetch(
    url,
    {
      method: 'GET',
      mode: 'no-cors'
    }
  ).then(response => console.log(response))
    .then(callback)
}
