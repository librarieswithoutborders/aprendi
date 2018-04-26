const convertToUrlPath = input => {
  const spaceRegex = new RegExp(' ', 'g')
  const safeRegex = new RegExp(/[^a-zA-Z0-9-_]+/, 'g')
  return input.replace(spaceRegex, '-').replace(safeRegex, '').toLowerCase();
}

export default convertToUrlPath
