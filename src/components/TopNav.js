import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import { connect } from 'react-redux'
import { sendUserInfoRequest, setUserInfo } from '../actions/actions.js';


class TopNav extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    const { currUser, sendUserInfoRequest } = this.props
    console.log("component mounting")
    console.log(currUser)
    if (!currUser) {
      sendUserInfoRequest()
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="top-nav">
        <div className="top-nav__contents">
          <div className="top-nav__right">
            {
              (isLoggedIn()) ?
              (
                <div>
                  {this.props.currUser && <h5>{this.props.currUser.userInfo.name}</h5> }
                  <div className="button" onClick={() => logout(this.props.history, this.props.clearUserInfo)}>Log out</div>
                </div>
              ) :
              ( <div className="button" onClick={() => login()}>Log In</div> )
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currUser: state.currUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendUserInfoRequest: () => {
      dispatch(sendUserInfoRequest())
    },
    clearUserInfo: () => {
      dispatch(setUserInfo())
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopNav));
