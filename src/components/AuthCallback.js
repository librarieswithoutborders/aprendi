"use strict";

import { Component } from 'react';
import { setIdToken, setAccessToken, getUserInfo } from '../utils/AuthService';
import { connect } from 'react-redux'
import { setUserInfo } from '../actions/actions.js';
// import {withRouter} from "react-router-dom";

class AuthCallback extends Component {

  constructor() {
    super()
  }

  componentDidMount() {
    console.log(this.props)
    setAccessToken();
    setIdToken();
    console.log(window.opener)

    getUserInfo(window.location.hash).then(userInfo => {
      window.opener.loginCallback(userInfo)
      // window.close()
    });

  }

  render() {
    return null;
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
