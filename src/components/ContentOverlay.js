import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {hideAdminModal} from '../actions/index'
import {hideResourceViewer} from '../actions/resource'

class ContentOverlay extends React.Component {
  render() {
    console.log(this.props)
    const {hideAdminModal, hideResourceViewer} = this.props
    return (
      <div
        className="content-overlay"
        onClick={() => {
          hideAdminModal(); hideResourceViewer(); this.props.history.replace(this.props.location.pathname);
        }}
      />
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  hideAdminModal: () => {
    dispatch(hideAdminModal())
  },
  hideResourceViewer: () => {
    dispatch(hideResourceViewer())
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContentOverlay))
