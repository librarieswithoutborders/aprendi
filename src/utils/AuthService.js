import decode from 'jwt-decode';
import auth0 from 'auth0-js';
import {sendUserInfoRequest} from '../actions/user'
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
    scope: 'openid profile email read:users user_id id',
    connection: 'google-oauth2'
  },
  () => {
    window.location.reload()
  });
}

export function logout(history, clearUserInfo) {
  clearIdToken();
  clearAccessToken();
  clearUserInfo();

}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({pathname: '/'});
  }
}

export function getIdToken() {
  if (window.localStorage && window.localStorage.getItem(ID_TOKEN_KEY)) {
    return window.localStorage.getItem(ID_TOKEN_KEY);
  } else {
    return null;
  }
}

export function getAccessToken() {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  window.localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
export function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  window.localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function isLoggedIn() {
  const idToken = getIdToken();
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
  return new Promise((resolve) => {
    auth.parseHash({ hash: hash }, function(err, authResult) {
      if (err) { return console.log(err); }

      auth.client.userInfo(authResult.accessToken, function(err, user) {
        resolve(user);
      });
    });
  })
}

export async function getCurrUser() {
  return new Promise((resolve, reject) => {
    if (!isLoggedIn()) { resolve(null) }

    let accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY)
    auth.client.userInfo(accessToken, function(err, user) {
      resolve(user);
    });
  })
}
