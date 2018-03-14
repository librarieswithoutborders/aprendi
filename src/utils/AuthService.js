import decode from 'jwt-decode';
import auth0 from 'auth0-js';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const CLIENT_DOMAIN = process.env.AUTH0_DOMAIN;
// const CLIENT_DOMAIN = 'librarieswithoutborders.auth0.com'
const REDIRECT = process.env.CALLBACK_URL;
const AUDIENCE = process.env.API_AUDIENCE;

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

export function login() {
  auth.popup.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: 'openid profile email read:users user_id id'
  });
}

export function logout(history, clearUserInfo) {
  clearIdToken();
  clearAccessToken();
  clearUserInfo();
  history.replace('/');
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({pathname: '/'});
  }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function isLoggedIn() {
  console.log("calling is logged in")
  const idToken = getIdToken();
  console.log(!!idToken && !isTokenExpired(idToken))
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export async function getUserByHash(hash) {
  console.log(hash)
  return new Promise((resolve) => {
    // let userInfo;
    auth.parseHash({ hash: hash }, function(err, authResult) {
      if (err) { return console.log(err); }

      auth.client.userInfo(authResult.accessToken, function(err, user) {
        // Now you have the user's information
        console.log(user)
        resolve(user);
      });
    });
  })
}

export async function getCurrUser() {
  if (!isLoggedIn()) { return null; }

  let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  console.log(accessToken)
  return new Promise((resolve) => {
    auth.client.userInfo(accessToken, function(err, user) {
      // Now you have the user's information
      console.log(user)
      resolve(user);
    });
  })
}
