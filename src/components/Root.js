import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from '../routes'
import TopNav from './TopNav'
import AdminModal from './AdminModal'
import ResourceViewer from './ResourceViewer'
import { connect } from 'react-redux'
import { hideAdminModal } from '../actions/index'
import { sendUserInfoRequest } from '../actions/user'
import { hideResourceViewer} from '../actions/resource'

import UpdateStatusBar from './UpdateStatusBar'
import { isLoggedIn } from '../utils/AuthService';


class Root extends Component {
  componentWillMount() {
    console.log("user logged in", isLoggedIn())
    if (isLoggedIn()) {this.props.sendUserInfoRequest()}
  }

  render() {
    const { store, adminModalContent, resourceViewerContent, hideAdminModal, hideResourceViewer, setUserInfo, updateStatus } = this.props;
    console.log("Root props", this.props)
    // window.loginCallback = getUserTeam
    let showOverlay = adminModalContent || resourceViewerContent
    return (
      <Provider store={store}>
      <Router>
        <div>
          {adminModalContent && <AdminModal />}
          {showOverlay && <div className="content-overlay" onClick={() => {hideAdminModal(); hideResourceViewer(); window.location.hash = "";}}></div>}
          {resourceViewerContent && <ResourceViewer />}
          {updateStatus &&
            <UpdateStatusBar statusObject={updateStatus} />
          }
          <div className={showOverlay ? "content fixed" : "content"}>
            <TopNav />
            <div className="content-container">
              {routes}
            </div>
          </div>
        </div>
      </Router>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adminModalContent: state.adminModalContent,
    resourceViewerContent: state.resourceViewerContent,
    updateStatus: state.updateStatus,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideAdminModal: () => {
      dispatch(hideAdminModal())
    },
    hideResourceViewer: () => {
      dispatch(hideResourceViewer())
    },
    sendUserInfoRequest: () => {
      dispatch(sendUserInfoRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
