import processFileName from '../utils/processFileName'

export let dbPath
if (process.env.NODE_ENV === 'production') {
  dbPath = 'https://aprendiserver.herokuapp.com'
} else if (process.env.NODE_ENV === 'staging') {
  dbPath = 'https://aprendiserver-staging.herokuapp.com'
} else {
  dbPath = 'http://localhost:3333'
}

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

export function showWarningModal(content) {
  return {
    type: 'SHOW_WARNING_MODAL',
    content
  }
}

export function hideWarningModal() {
  return {
    type: 'HIDE_WARNING_MODAL'
  }
}

export function uploadFile(file, addHash, callback) {
  const newFile = processFileName(file, addHash)

  return dispatch => {
    dispatch(setUpdateStatus({type: 'UPLOAD_FILE', status: 'INITIATED'}))

    return getS3SignedRequest(newFile, response => {
      console.log(response)
      if (!response || !response.signedUrl) {
        dispatch(setUpdateStatus({type: 'UPLOAD_FILE', status: 'FAILED'}))
        return
      }
      const finalUploadedUrl = response.signedUrl.split('?')[0]

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

            callback ? callback(finalUploadedUrl) : null
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
