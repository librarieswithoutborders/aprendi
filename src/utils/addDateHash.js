const addDateHash = (file) => {
  let nameSplitPieces = file.name.split('.')
  let newFileName = nameSplitPieces[0] + '_' + +new Date()
  newFileName += nameSplitPieces[1] ? '.' + nameSplitPieces[1] : ''

  let blob = file.slice(0, -1, file.type)

  return new File([blob], newFileName, {type: file.type})
}

export default addDateHash
