"use strict";

import React from 'react'
import { setIdToken, setAccessToken, getUserByHash, getParameterByName, isLoggedIn } from '../utils/AuthService';
import { connect } from 'react-redux'
import { sendUserInfoRequest } from '../actions/user';
// import {withRouter} from "react-router-dom";

class AuthCallback extends React.Component {
  constructor() {
    super()
  }

  componentWillMount() {
    setAccessToken()
    setIdToken()
    window.close()
  }

  render() {
    return null
  }
}

const mapStateToProps = () => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // setUserInfo: (user) => {
    //   dispatch(setUserInfo(user))
    // },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthCallback)
