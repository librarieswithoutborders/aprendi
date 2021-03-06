const sanitize = require('sanitize-filename');

const processFileName = (file, addDateHash) => {
  const matched = file.name.match(/(.+?)(\.[^.]*$|$)/)
  let extension, placeholder, withoutExtension

  if (matched) {
    [placeholder, withoutExtension, extension] = matched
  } else {
    withoutExtension = 'user-uploaded-image'
  }

  withoutExtension = sanitize(withoutExtension.replace(new RegExp(' ', 'g'), '-'))

  if (addDateHash) {
    withoutExtension = `${withoutExtension}_${+new Date()}`
  }

  const newFileName = extension ? withoutExtension + extension.toLowerCase() : withoutExtension
  const blob = file.slice(0, -1, file.type)

  return new File([blob], newFileName, {type: file.type})
}

export default processFileName
