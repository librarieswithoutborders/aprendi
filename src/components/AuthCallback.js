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
    getUserInfo(window.location.hash).then(userInfo => {
      this.props.setUserInfo(userInfo)
      this.props.history.push("/")
      // this.props.history.push("/users/" + userInfo)
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
