import React from 'react'
import { Link } from 'react-router-dom'
import Transition from 'react-transition-group/Transition'
import ScrollAnimation from 'react-animate-on-scroll'
import {isMobile} from 'react-device-detect'

import { login } from '../utils/AuthService'

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
              <h1 className="home-page__section__title">Welcome to My Library Guide</h1>
            </FadeIn>
            <FadeIn duration={800} delay={100} >
              <div className="home-page__section__content">
                <p>My Library Guide is a tool developed by Libraries Without Borders to enable people to curate and add content Lorem Ipsum</p>
                <div className="home-page__section__button-container">
                  <Link to="/collections/"><div className="button button-transparent">Browse Collections</div></Link>
                  <Link to="/teams/"><div className="button button-transparent">Browse Teams</div></Link>
                  {!isMobile && <div className="button button-transparent" onClick={() => login()}>Admin</div>}
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="home-page__section__overlay" />
        </div>
        <div className="home-page__section white">
          <h1 className="home-page__section__title">About the Project</h1>
          <div className="home-page__section__content">
            <p>Links to LWB US homepage somwehere in here</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis augue non lorem tempor elementum. Vivamus mollis non sapien eget efficitur. Integer eget metus ut mauris iaculis consectetur eu eget libero. Sed risus lorem, rutrum eget velit eu, fermentum tincidunt magna. Morbi ac pulvinar massa, et mollis nisi. Suspendisse dictum et ligula quis ultricies. Sed nec elit iaculis, auctor orci ut, ullamcorper nibh.</p>
            <p>Suspendisse potenti. Aliquam a auctor odio. In hac habitasse platea dictumst. Donec accumsan iaculis convallis. Ut nec diam in neque vehicula porta. Ut vitae mi nec neque porta sollicitudin eget et risus. Proin diam magna, mattis at purus et, pulvinar aliquet enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec sodales eros odio, quis congue lectus feugiat ac.</p>
            <p>Aliquam eu imperdiet magna. Nulla posuere semper nunc, in varius orci pellentesque et. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed porta erat ex. Etiam a lorem fringilla velit lobortis fringilla. Ut rhoncus non quam eget elementum. Pellentesque facilisis libero vel odio blandit, a luctus sapien tempus. Nam elementum eu ante vitae consectetur.</p>
          </div>
        </div>
        <div className="home-page__section blue">
          <h1 className="home-page__section__title">Starting Guide</h1>
          <div className="home-page__section__content">
            <h5 className="home-page__text__main">My Library Guide allows you to find and explore resources collected by members of your community to answer common questions you might have.</h5>
            <p className="home-page__text__sub">Here are some example resource collections to get you started:</p>
            <p className="home-page__text__sub">Feel free to explore all of the collections that have been created here.</p>
            <h5 className="home-page__text__main">Want to create resource collections of your own?</h5>

          </div>
        </div>
        <div className="home-page__section white">
          <h1 className="home-page__section__title">Contact</h1>
          <div className="home-page__section__content">
            <p>For questions, concerns, or feedback please contact <a className="home-page__text__link" href="mailto:adam.echelman@librarieswithoutborders.org">adam.echelman@librarieswithoutborders.org</a></p>
            <p>My Library Guide is an open source project initiated by Libraries without Borders</p>
            <div className="button button-white"><a href="https://github.com/librarieswithoutborders/mylibraryguide">View the Github Repo</a></div>
          </div>
        </div>
      </div>
    );
  }
}


export default HomePage
