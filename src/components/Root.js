import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from '../routes'
import TopNav from './TopNav'
import AdminModal from './AdminModal'
import ResourceViewer from './ResourceViewer'
import { connect } from 'react-redux'
import { hideAdminModal, hideResourceViewer, getUserTeam } from '../actions/actions.js';

class Root extends Component {
  // componentWillReceiveProps(nextProps) {
  //   if (window.location.hash)
  //
  // }

  render() {
    const { store, history, adminModalContent, resourceViewerContent, hideAdminModal, hideResourceViewer, setUserInfo } = this.props;
    console.log(history)
    window.loginCallback = getUserTeam
    let showOverlay = adminModalContent || resourceViewerContent
    return (
      <Provider store={store}>
      <Router>
        <div>
          {adminModalContent && <AdminModal />}
          {showOverlay && <div className="content-overlay" onClick={() => {hideAdminModal(); hideResourceViewer(); window.location.hash = "";}}></div>}
          {resourceViewerContent && <ResourceViewer />}
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
    resourceViewerContent: state.resourceViewerContent
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
    getUserTeam: (userInfo) => {
      dispatch(getUserTeam(userInfo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
