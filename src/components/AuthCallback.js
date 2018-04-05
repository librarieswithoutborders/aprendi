"use strict";

import React from 'react'
import { setIdToken, setAccessToken, getUserByHash, getParameterByName, isLoggedIn } from '../utils/AuthService';
import { connect } from 'react-redux'
import { setUserInfo } from '../actions/user';
// import {withRouter} from "react-router-dom";

class AuthCallback extends React.Component {

  constructor() {
    super()
  }

  componentWillMount() {
    console.log("component mounted")
    console.log(localStorage)
    console.log(window.opener)
    setAccessToken();
    setIdToken();



    // getUserByHash(window.location.hash).then(userInfo => {
    //   console.log("got user")
    // window.opener.location.reload()
    // window.close()
    // });

  }

  render() {
    return (
      <div>
        <h5>Access Token Callback Results</h5>
        {!window.location.hash &&
          (
            <div>
              <p>No Window Hash Found</p>
            </div>
          )
        }
        {window.location.hash &&
          (
            <div>
              <p>{"Window Hash is: " + window.location.hash}</p>
              <p>{"access token is: " + getParameterByName('access_token')}</p>
              <p>{"id token is: " + getParameterByName('id_token')}</p>
            </div>
          )
        }
        <br />
        <br />
        <h5>Local Storage Results</h5>
        {!localStorage &&
          (
            <div>
              <p>No Local Storage Found on this device</p>
            </div>
          )
        }
        {localStorage &&
          (
            <div>
              <p>{"Local Storage Length: " + localStorage.length}</p>
              <p>Local Storage on this device contains:</p>
              <p>{"access_token: " + localStorage.access_token}</p>
              <p>{"id_token: " + localStorage.id_token}</p>
            </div>
          )
        }
        {!window.localStorage &&
          (
            <div>
              <p>No Window indexed Local Storage Found on this device</p>
            </div>
          )
        }
        {window.localStorage &&
          (
            <div>
              <p>{"Window Indexed Local Storage Length: " + window.localStorage.length}</p>
              <p>Window Indexed Local Storage on this device contains:</p>
              <p>{"access_token: " + window.localStorage.access_token}</p>
              <p>{"id_token: " + window.localStorage.id_token}</p>
            </div>
          )
        }
        <br />
        <br />
        <h5>Window Location Results</h5>
        {(!window || !window.opener) &&
          (
            <div>
              <p>No Window Opener Access found on this device</p>
            </div>
          )
        }
        {(window && window.opener) &&
          (
            <div>
              <p>Window Opener was found</p>
            </div>
          )
        }
        {(window && window.opener && window.opener.location) &&
          (
            <div>
              <p>Window Opener Location was found</p>
            </div>
          )
        }
        {(window && window.opener && window.opener.location && window.opener.location.reload) &&
          (
            <div>
              <p>Window Opener Location Reload Function was found</p>
            </div>
          )
        }
        <br />
        <br />
        <h5>Final Assessment</h5>
        {!isLoggedIn() &&
          (
            <div>
              <p>User login was unsuccessful - mehhhh</p>
            </div>
          )
        }
        {isLoggedIn() &&
          (
            <div>
              <p>User is successfully logged in!</p>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: (user) => {
      dispatch(setUserInfo(user))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthCallback)
