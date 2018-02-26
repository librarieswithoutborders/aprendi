
const convertToUrlPath = (input) => {
  console.log("converting to url path")
  let regex = new RegExp(" ", 'g')
  return input.replace(regex, "-").replace("?", "").toLowerCase();
}

export default convertToUrlPath
