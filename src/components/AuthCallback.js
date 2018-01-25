import { Component } from 'react';
import { setIdToken, setAccessToken } from '../utils/AuthService';

class AuthCallback extends Component {

  constructor() {
    super()
  }

  componentDidMount() {
    setAccessToken();
    setIdToken();
    window.location.href = "/";
  }

  render() {
    return null;
  }
}

export default AuthCallback;
