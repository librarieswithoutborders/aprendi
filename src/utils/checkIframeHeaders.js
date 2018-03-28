const checkIframeHeaders = (url, callback) => {
  var req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.send(null);
  var headers = req.getAllResponseHeaders().toLowerCase();
  console.log(headers);
  return headers
}

export default checkIframeHeaders
