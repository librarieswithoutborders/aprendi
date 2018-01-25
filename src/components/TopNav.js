import React from 'react';
import { Link } from 'react-router-dom';
import { login, logout, isLoggedIn } from '../utils/AuthService';

const TopNav = () => {
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
            (isLoggedIn()) ? ( <button className="btn btn-danger log" onClick={() => logout()}>Log out </button> ) : ( <button className="btn btn-info log" onClick={() => login()}>Log In</button> )
          }

        </div>
      </div>
    </div>
  );
};

export default TopNav;
