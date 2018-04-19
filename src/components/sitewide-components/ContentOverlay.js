import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

import {hideAdminModal, showWarningModal} from '../../actions/index'
import {hideResourceViewer} from '../../actions/resource'

class ContentOverlay extends React.Component {
  render() {
    const {hideAdminModal, hideResourceViewer, adminModalContent, resourceViewerContent} = this.props
    return (
      <div
        className="content-overlay"
        onClick={() => {
          if (adminModalContent) {
            hideAdminModal();
          }
          if (resourceViewerContent) {
            hideResourceViewer();
            this.props.history.replace(this.props.location.pathname);
          }
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  adminModalContent: state.adminModalContent,
  resourceViewerContent: state.resourceViewerContent
})

const mapDispatchToProps = dispatch => ({
  hideAdminModal: () => {
    dispatch(showWarningModal({
      message: 'Are you sure you want to leave?',
      submessage: 'Changes will not be saved.',
      options: [{text: 'Leave Editor', action: () => dispatch(hideAdminModal())}]
    }))
  },
  hideResourceViewer: () => {
    dispatch(hideResourceViewer())
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContentOverlay))
