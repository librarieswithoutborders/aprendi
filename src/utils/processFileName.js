const sanitize = require("sanitize-filename");

const processFileName = (file, addDateHash) => {
  console.log(file)
  let matched = file.name.match(/(.+?)(\.[^.]*$|$)/)
  let placeholder, withoutExtension, extension
  console.log(withoutExtension)

  if (matched) {
    [placeholder, withoutExtension, extension] = matched
  } else {
    withoutExtension = "user-uploaded-image"
  }

  console.log(withoutExtension, extension)

  withoutExtension = sanitize(withoutExtension.replace(" ", "-"))

  if (addDateHash) {
    withoutExtension = withoutExtension + '_' + +new Date()
  }

  let newFileName = extension ? withoutExtension + extension : withoutExtension

  console.log(newFileName)

  let blob = file.slice(0, -1, file.type)

  return new File([blob], newFileName, {type: file.type})
}

export default processFileName
