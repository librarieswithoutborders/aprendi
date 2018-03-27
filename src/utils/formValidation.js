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
