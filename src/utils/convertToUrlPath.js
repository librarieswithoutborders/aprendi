
const convertToUrlPath = (input) => {
  console.log("converting to url path")
  let spaceRegex = new RegExp(" ", 'g')
  let safeRegex = new RegExp(/[^a-zA-Z0-9/-]+/, 'g')
  return input.replace(spaceRegex, "-").replace(safeRegex, "").toLowerCase();
}

export default convertToUrlPath
