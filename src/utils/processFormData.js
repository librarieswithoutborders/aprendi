import convertToUrlPath from "./convertToUrlPath"

const youtubeGetId = (url) => {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
      return match[2];
  } else {
      return 'error';
  }
}

const vimeoGetId = (url) => {
  var regExp = /(www\.)?vimeo.com\/(\d+)($|\/)/;
  var match = url.match(regExp);

  if (match){
      return match[2]
  }
  else {
      return 'error'
  }
}

const processVideoUrl = (url) => {
  if (url.match(/youtu/)) {
    console.log("is youtube")
    let id = youtubeGetId(url)

    return {video_provider: "youtube", resource_url: "https://www.youtube.com/embed/" + id, resource_id: id}
  } else if (url.match(/vimeo/)) {
    let id = vimeoGetId(url)

    return {video_provider: "vimeo", resource_url: "https://player.vimeo.com/video/" + id, resource_id: id}
  }
}


const processFormData = (data, action, resourceTypeOverride) => {
  console.log("processing form data")
  let retObject = {}
  Object.assign(retObject, data)

  if (resourceTypeOverride) {
    retObject.resource_type = resourceTypeOverride
  }

  if (action === "create" && !retObject.path) {
    retObject.path = convertToUrlPath(data.title || data.team_name)
  }

  if (retObject.resource_type === "video") {
    let results = processVideoUrl(data.resource_url)
    retObject.video_provider = results.video_provider
    retObject.resource_url = results.resource_url
    retObject.image_url = results.video_provider === "youtube" ? "https://img.youtube.com/vi/" + results.resource_id + "/0.jpg" : null
  }

  if (retObject.resource_type === "pdf") {
    retObject.image_url = retObject.resource_url.replace("/pdf/", "/images/").replace(".pdf", ".png")
  }

  console.log(retObject)

  return retObject
}

export default processFormData
