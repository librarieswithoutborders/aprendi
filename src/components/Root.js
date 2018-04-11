import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import routes from '../routes'
import TopNav from './TopNav'
import AdminModal from './AdminModal'
import ResourceViewer from './ResourceViewer'
import ScrollToTop from './ScrollToTop'
import ContentOverlay from './ContentOverlay'
import {connect} from 'react-redux'
import {sendUserInfoRequest} from '../actions/user'

import UpdateStatusBar from './UpdateStatusBar'
import {isLoggedIn} from '../utils/AuthService';


class Root extends Component {
  componentWillMount() {
    if (isLoggedIn()) {
      this.props.sendUserInfoRequest()
    }
  }

  render() {
    const {store, adminModalContent, resourceViewerContent, hideAdminModal, hideResourceViewer, setUserInfo, updateStatus} = this.props;

    const showOverlay = adminModalContent || resourceViewerContent
    return (
      <Provider store={store}>
        <Router>
          <ScrollToTop>
            <div>
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
  resourceViewerContent: state.resourceViewerContent,
  updateStatus: state.updateStatus
})

const mapDispatchToProps = dispatch => ({
  sendUserInfoRequest: () => {
    dispatch(sendUserInfoRequest())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Root)
