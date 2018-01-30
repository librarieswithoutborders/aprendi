import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { login, logout, isLoggedIn } from '../utils/AuthService';

class TopNav extends Component {
  constructor() {
    super()
  }

  render() {
    console.log(this.props)
    return (
      <div className="top-nav">
        <div className="top-nav__contents">
          <Link to="/">
            <h1 className="top-nav__logo">My Library Guide</h1>
          </Link>
          <div className="top-nav__left">
            <h5 className="top-nav__link">About</h5>
          </div>
          <div className="top-nav__right">
            {
              (isLoggedIn()) ? ( <button className="btn btn-danger log" onClick={() => logout(this.props.history)}>Log out </button> ) : ( <button className="btn btn-info log" onClick={() => login()}>Log In</button> )
            }
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(TopNav);
