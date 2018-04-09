import React, { Component } from 'react';
import { withRouter } from 'react-router'


class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    console.log("UPDATINGG")
    console.log(this.props.location, prevProps.location)
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    console.log("SCROLLINGGGGG")
    console.log(this.props)
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
