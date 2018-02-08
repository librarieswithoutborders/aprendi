import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from '../routes'
import TopNav from './TopNav'
import AdminModal from './AdminModal'
import ResourceViewer from './ResourceViewer'
import { connect } from 'react-redux'
import { hideAdminModal } from '../actions/actions.js';

class Root extends Component {
  render() {
    const { store, adminModalContent, resourceViewerContent, hideAdminModal } = this.props;

    return (
      <Provider store={store}>
      <Router>
        <div>
          {adminModalContent && <AdminModal />}
          {adminModalContent && <div className="content-overlay" onClick={() => hideAdminModal()}></div>}
          {resourceViewerContent && <ResourceViewer />}
          <div className="content">
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
