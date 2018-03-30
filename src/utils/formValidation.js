const validUrl = require('valid-url');
import {isCollectionPathTaken} from '../actions/collection'

export const maxLength = (maxLen) => {
  return (input) => {
    return input && input.length > maxLen ? "Input is greater than maximum length (" + maxLen + " characters)" : null
  }

}

export const isValidPath = (input) => {
  console.log(input)
  console.log("validating url")

  return !input || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input) ? null : "Please Enter a Valid Url Path"
}

export const isValidEmail = (input) => {
  console.log(input)
  console.log("validating email")

  const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return input && emailRe.test(input) ? null : "Please Enter a Valid Email"
}

export const isValidUrl = (input) => {
  let testInput = input

  console.log(testInput.slice(0, 7))

  if (testInput.slice(0, 7) !== "http://" || testInput.slice(0, 8) !== "https://") {
    testInput = "http://" + testInput
  }

  console.log("checking", testInput)

  return validUrl.isWebUri(testInput) ? null : "Please Enter a Valid Url"
}

export const isPathTaken = (path) => {
  return new Promise((resolve, reject) => {
    console.log(path)
    if (!path || path.length === 0) { resolve(false); return; }
    isCollectionPathTaken(path).then(isTaken => {
      console.log(isTaken)

      resolve(isTaken ? "Path has already been taken, please try a different path" : null)
    })
  })
}
