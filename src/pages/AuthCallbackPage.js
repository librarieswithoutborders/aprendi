import React from 'react'

import {setIdToken, setAccessToken, getUserByHash, getParameterByName, isLoggedIn} from '../utils/AuthService';
import {sendUserInfoRequest} from '../actions/user';

class AuthCallbackPage extends React.Component {
  componentWillMount() {
    setAccessToken()
    setIdToken()
    window.close()
  }

  render() {
    return null
  }
}

export default AuthCallbackPage
