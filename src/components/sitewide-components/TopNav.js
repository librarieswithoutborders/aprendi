import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {isMobile} from 'react-device-detect'

import SvgIcon from './SvgIcon'

import {sendUserInfoRequest, logoutUser} from '../../actions/user'
import {login, logout, isLoggedIn} from '../../utils/AuthService'


class TopNav extends Component {
  constructor() {
    super()

    this.state = {
      dropdownExpanded: false
    }
  }

  toggleMenuExpansion() {
    this.setState({
      dropdownExpanded: !this.state.dropdownExpanded
    })
  }

  render() {
    const {currUserInfo, history, logoutUser} = this.props
    const {dropdownExpanded} = this.state

    if (currUserInfo === 'Fetching') {
      return null
    } else if (currUserInfo && currUserInfo !== 'Logged out') {
      return (
        <div className="top-nav">
          <div className="top-nav__contents">
            <div className={dropdownExpanded ? 'top-nav__button dropdown-expanded' : 'top-nav__button'} onClick={() => this.toggleMenuExpansion()}>
              <h5 className="top-nav__button__text">{currUserInfo.name}</h5>
              <SvgIcon name="arrow" className={this.state.dropdownExpanded ? 'top-nav__button__arrow up' : 'top-nav__button__arrow down'}/>
            </div>
            <div className={dropdownExpanded ? 'top-nav__dropdown expanded' : 'top-nav__dropdown'}>
              <h5 className="top-nav__dropdown__sub-text">{currUserInfo.email}</h5>
              <ul className="top-nav__dropdown__list">
                <li className="top-nav__dropdown__list-item" onClick={() => {
                  this.toggleMenuExpansion(); history.push('/')
                }}>My Home Page</li>
                <li className="top-nav__dropdown__list-item" onClick={() => {
                  this.toggleMenuExpansion(); logout(history, logoutUser)
                }}>Log Out</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="top-nav">
        {!isMobile &&
          <div className="top-nav__contents">
            <div className="top-nav__button" onClick={() => login()}>
              <h5 className="top-nav__button__text" >Admin</h5>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currUserInfo: state.currUserInfo
})

const mapDispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(logoutUser())
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopNav));
