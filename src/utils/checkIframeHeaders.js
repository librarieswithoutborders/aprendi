const checkIframeHeaders = (url, callback) => {
  const req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.send(null);
  const headers = req.getAllResponseHeaders().toLowerCase();
  return headers
}

export default checkIframeHeaders
