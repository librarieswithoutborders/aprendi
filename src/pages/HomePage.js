import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import Transition from 'react-transition-group/Transition'
import ScrollAnimation from 'react-animate-on-scroll'
import {isMobile} from 'react-device-detect'

import { login } from '../utils/AuthService'
import SvgIcon from '../components/sitewide-components/SvgIcon'
import UserHomePage from './UserHomePage'

const FadeIn = ({children, duration, delay}) => {
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out ${delay}ms`,
    opacity: 0
  }

  const transitionStyles = {
    entering: { opacity: 0 },
    entered:  { opacity: 1 },
  }

  return (
    <Transition in={true} appear={true} timeout={duration}>
      {(state) => {
        return (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}>
              {children}
          </div>
        )
      }}
    </Transition>
  )
}


class HomePage extends React.Component {
  render() {
    return (
      <div className="home-page">
        <div className="home-page__section title-section">
          <div className="home-page__section__content-container" >
            <FadeIn duration={800} delay={0} >
              <h1 className="home-page__section__title">Welcome to Aprendi</h1>
            </FadeIn>
            <FadeIn duration={800} delay={100} >
              <div className="home-page__section__content">
                <p className="home-page__text-main">Powered by <a className="home-page__text-link" href="https://www.librarieswithoutborders.org/" target="_blank">Libraries Without Borders</a></p>
                <div className="home-page__section__button-container">
                  <Link to="/collections/"><div className="button button-transparent">Browse Collections</div></Link>
                  <Link to="/teams/"><div className="button button-transparent">Browse Teams</div></Link>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="home-page__section__overlay" />
        </div>
        <div className="home-page__section white">
          <h1 className="home-page__section__title">What is Aprendi?</h1>
          <div className="home-page__section__content">
            <p className="home-page__text-main">Aprendi is a tool built by Libraries Without Borders to help communities curate local resources in a dynamic, reliable, and relevant fashion.</p>
            <p className="home-page__text-main extra-space">They do this by creating:</p>
            <div className="home-page__create-options">
              <div className="home-page__create-options__item">
                <div className="home-page__create-options__icon-container">
                  <SvgIcon className="home-page__create-options__icon" name='folder' />
                </div>
                <h5 className="home-page__create-options__title">Collections</h5>
                <p className="home-page__create-options__text">Sets of resources, which may include videos, PDFs, embedded or external websites, images, and notes</p>
              </div>
              <hr className="home-page__create-options__divider" />
              <div className="home-page__create-options__item">
                <div className="home-page__create-options__icon-container">
                  <SvgIcon className="home-page__create-options__icon" name='video' />
                  <SvgIcon className="home-page__create-options__icon" name='document' />
                  <SvgIcon className="home-page__create-options__icon" name='embed' />
                  <SvgIcon className="home-page__create-options__icon" name='website' />
                  <SvgIcon className="home-page__create-options__icon" name='image' />
                  <SvgIcon className="home-page__create-options__icon" name='text' />
                </div>
                <h5 className="home-page__create-options__title">Resources</h5>
                <p className="home-page__create-options__text">Video, PDFs, embedded or external websites, images, or notes you wish to share</p>
              </div>
              <hr className="home-page__create-options__divider" />
              <div className="home-page__create-options__item">
                <div className="home-page__create-options__icon-container">
                  <SvgIcon className="home-page__create-options__icon" name='team' />
                </div>
                <h5 className="home-page__create-options__title">Teams</h5>
                <p className="home-page__create-options__text">Groups of other users to collaborate with in creating content</p>
              </div>
            </div>
          </div>
        </div>
        <div className="home-page__section blue">
          <h1 className="home-page__section__title">Get Started</h1>
          <div className="home-page__section__content">
            <div className="home-page__option-grid">
              <div className="home-page__option-grid__item">
                <Link to="/collections/">
                  <div className="home-page__option-grid__item__content-container">
                    <h5 className="home-page__option-grid__item__title">Explore</h5>
                    <h5 className="home-page__option-grid__item__text">Browse collections of resources based on the topics that most interest you</h5>
                    <h5 className="home-page__option-grid__item__sub-text">Click here to get started!</h5>
                  </div>
                </Link>
              </div>
              <div className="home-page__option-grid__item">
                <div className="home-page__option-grid__item__content-container" onClick={() => login()}>
                  <h5 className="home-page__option-grid__item__title">Curate</h5>
                  <h5 className="home-page__option-grid__item__text">Collect and organize information yourself</h5>
                  <h5 className="home-page__option-grid__item__sub-text">Click here to connect a gmail account.  Then you will be asked to either join an existing team or create your own. After that, it’s all up to you!</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-page__section white">
          <h1 className="home-page__section__title">Project Sponsors</h1>
          <div className="home-page__section__content">
            <img id="logo-lwb" src="https://s3.us-east-2.amazonaws.com/aprendi/static/logos/lwb_logo.jpg" />
            <p className="home-page__text-main extra-space">Libraries Without Borders is a 501(c)(3) non-profit dedicated to improving access to information in the US and around the world.</p>
            <p className="home-page__text-main extra-space bold">Additional Sponsors:</p>
            <div className="home-page__sponsor-box">
              <img id="logo-minnesota" src="https://s3.us-east-2.amazonaws.com/aprendi/static/logos/mndoe_logo.png" />
              <img id="logo-eastern-shore" src="https://s3.us-east-2.amazonaws.com/aprendi/static/logos/commeasternshore_logo.png" />
              <img id="logo-united-way" src="https://s3.us-east-2.amazonaws.com/aprendi/static/logos/unitedway_logo.png" />
            </div>
          </div>
        </div>
        <div className="home-page__section blue">
          <h1 className="home-page__section__title">Contact</h1>
          <div className="home-page__section__content">
            <p>For questions, concerns, or feedback please contact <a className="home-page__text__link" href="mailto:admin@librarieswithoutborders.us">admin@librarieswithoutborders.org</a></p>
          </div>
        </div>
      </div>
    );
  }
}

class HomePageContainer extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {currUserInfo, history} = this.props

    if (currUserInfo && currUserInfo !== 'Logged out') {
      return (
        <UserHomePage history={history} />
      )
    } else {
      return (
        <HomePage />
      )
    }
  }
}

const mapStateToProps = state => ({
  currUserInfo: state.currUserInfo,
})

export default connect(mapStateToProps)(HomePageContainer)
