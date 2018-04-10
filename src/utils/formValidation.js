const validUrl = require('valid-url');
const $ = require('jquery')

import {youtubeGetId, vimeoGetId} from './processFormData'

// import {isCollectionPathTaken} from '../actions/collection'

export const maxLength = maxLen => input => input && input.length > maxLen ? `Input is greater than maximum length (${maxLen} characters)` : null

const reservedPaths = [
  'collection', 'collections', 'team', 'teams', 'resource', 'resources', 'subcollection', 'subcollections', 'admin', 'callback', 'mylibraryguide', 'my-library-guide', 'my_library_guide', '_', '-', '?', '!', '#'
]

export const isValidPath = input => {
  console.log(input)
  console.log('validating url')

  if (reservedPaths.includes(input)) {
    return 'Path is Reserved.  Please Enter a Different Path'
  }

  return !input || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input) ? null : 'Please Enter a Valid Url Path'
}

export const isValidEmail = input => {
  console.log(input)
  console.log('validating email')

  const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return input && emailRe.test(input) ? null : 'Please Enter a Valid Email'
}

export const isValidUrl = input => {
  let testInput = input

  console.log(testInput.slice(0, 7))

  if (testInput.slice(0, 7) !== 'http://' || testInput.slice(0, 8) !== 'https://') {
    testInput = `http://${testInput}`
  }

  console.log('checking', testInput)

  return validUrl.isWebUri(testInput) ? null : 'Please Enter a Valid Url'
}

export const isValidVideoUrl = input => {
  const urlInvalid = isValidUrl(input)

  if (urlInvalid) {
    return urlInvalid
  }

  console.log(youtubeGetId(input), vimeoGetId(input))

  if (youtubeGetId(input) === 'error' && vimeoGetId(input) === 'error') {
    return 'Please Enter a Valid Youtube or Vimeo URL'
  }
}

export const isValidEmbed = input => {
  // return new Promise(resolve, reject) {
  //   let retVal = isValidUrl(input)
  //   console.log(retVal)
  //   // url returned an error message
  //   if (retVal) {
  //     resolve(retVal)
  //   } else {
  //     $.get("//" + input).done(function () {
  //       resolve(null)
  //     }).fail(function () {
  //       resolve("Url does not allow embedding")
  //     })
  //   }
  // }
}

// export const isPathTaken = (path) => {
//   return new Promise((resolve, reject) => {
//     console.log(path)
//     if (!path || path.length === 0) { resolve(false); return; }
//     isCollectionPathTaken(path).then(isTaken => {
//       console.log(isTaken)
//
//       resolve(isTaken ? "Path has already been taken, please try a different path" : null)
//     })
//   })
// }
