"use strict";

import { Component } from 'react';
import { setIdToken, setAccessToken, getUserByHash } from '../utils/AuthService';
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

    // getUserByHash(window.location.hash).then(userInfo => {
    //   console.log("got user")
    window.opener.location.reload()
    window.close()
    // });

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
