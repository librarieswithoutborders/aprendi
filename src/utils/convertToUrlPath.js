
const convertToUrlPath = input => {
  console.log('converting to url path')
  const spaceRegex = new RegExp(' ', 'g')
  const safeRegex = new RegExp(/[^a-zA-Z0-9/-]+/, 'g')
  return input.replace(spaceRegex, '-').replace(safeRegex, '').toLowerCase();
}

export default convertToUrlPath
