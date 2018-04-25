import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import AdminModal from '../components/admin-components/AdminModal'
import WarningModal from '../components/admin-components/WarningModal'
import UpdateStatusBar from '../components/admin-components/UpdateStatusBar'
import TopNav from '../components/sitewide-components/TopNav'
import ResourceViewer from '../components/sitewide-components/ResourceViewer'
import ScrollToTop from '../components/sitewide-components/ScrollToTop'
import ContentOverlay from '../components/sitewide-components/ContentOverlay'

import {sendUserInfoRequest, setCurrUserInfo, fetchUserPermissions} from '../actions/user'
import {isLoggedIn, setAuthCallback} from '../utils/AuthService';

import routes from '../routes'


class Root extends Component {
  componentWillMount() {
    const {authCallback} = this.props;

    setAuthCallback(authCallback)
    if (isLoggedIn()) {
      console.log('calling sendUserInfoRequest from root mount')
      this.props.sendUserInfoRequest()
    }
  }

  render() {
    const {store, adminModalContent, warningModalContent, resourceViewerContent, hideAdminModal, hideResourceViewer, setUserInfo, updateStatus} = this.props;

    const showOverlay = adminModalContent || warningModalContent || resourceViewerContent
    return (
      <Provider store={store}>
        <Router>
          <ScrollToTop>
            <div>
              {warningModalContent && <WarningModal />}
              {adminModalContent && <AdminModal />}
              {showOverlay && <ContentOverlay />}
              {resourceViewerContent && <ResourceViewer />}
              {updateStatus &&
              <UpdateStatusBar statusObject={updateStatus} />
              }
              <div className={showOverlay ? 'content fixed' : 'content'}>
                <TopNav />
                <div className="content-container">
                  {routes}
                </div>
              </div>
            </div>
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = state => ({
  adminModalContent: state.adminModalContent,
  warningModalContent: state.warningModalContent,
  resourceViewerContent: state.resourceViewerContent,
  updateStatus: state.updateStatus
})

const mapDispatchToProps = dispatch => ({
  sendUserInfoRequest: () => {
    dispatch(sendUserInfoRequest())
  },
  authCallback: user => {
    console.log('in set user info')
    dispatch(setCurrUserInfo(user))
    dispatch(fetchUserPermissions(user))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Root)
