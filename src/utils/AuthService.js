import decode from 'jwt-decode';
import Auth0Lock from 'auth0-lock'
const ID_TOKEN_KEY = 'id_token';
const PROFILE_KEY = 'profile'

const CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const CLIENT_DOMAIN = process.env.AUTH0_DOMAIN;
const AUDIENCE = process.env.API_AUDIENCE;

console.log(process.env)

const lock = new Auth0Lock(
  CLIENT_ID,
  CLIENT_DOMAIN,
  {
    autoclose: true,
    rememberLastLogin: true,
    connection: 'google-oauth2',
    allowedConnections: ['google-oauth2'],
    auth: {
      audience: AUDIENCE,
      responseType: 'token id_token',
      redirect: false,
      autoParseHash: true,
      sso: false,
      params: {
        prompt: 'select_account',
        scope: 'openid profile email read:users user_id id'
      }
    }
  }
);


export function setAuthCallback(cb) {
  console.log("setting auth callback")
  lock.on('authenticated', authResult => {
    // Use the token in authResult to getUserInfo() and save it to localStorage
    lock.getUserInfo(authResult.accessToken, (error, profile) => {
      if (error) {
        // Handle error
        return;
      }

      console.log('AUTH RESULT', authResult, profile)

      localStorage.setItem(ID_TOKEN_KEY, authResult.accessToken);
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      cb(profile)
      // window.location.reload()
    });
  });
}

export function login() {
  lock.show()
}

export function logout(history, clearUserInfo) {
  clearIdToken();
  clearUserInfo();
}

export function getIdToken() {
  if (window.localStorage && window.localStorage.getItem(ID_TOKEN_KEY)) {
    return window.localStorage.getItem(ID_TOKEN_KEY);
  }
  return null;
}

function clearIdToken() {
  window.localStorage.removeItem(ID_TOKEN_KEY);
}

export function isLoggedIn() {
  const idToken = getIdToken();

  console.log("calling is logged in", idToken)
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export async function getCurrUser() {
  return new Promise((resolve, reject) => {
    if (!isLoggedIn()) { resolve(null) }

    let profile = window.localStorage.getItem(PROFILE_KEY)

    console.log("PROFILE IS", profile)

    if (profile) {
      resolve(JSON.parse(profile))
    } else {
      let accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY)
      lock.getUserInfo(accessToken, (error, profile) => {
        if (error) {
          // Handle error
          return;
        }

        resolve(profile)
      });
    }

  })
}
