function processExternalSiteUrl(url) {
  let retVal = ''

  if (url.slice(0, 8) === 'https://') {
    retVal = url
  } else if (url.slice(0, 7) === 'http://') {
    retVal = `https://${url.slice(7)}`
  } else {
    retVal = `https://${url}`
  }

  return retVal
}

export default processExternalSiteUrl
