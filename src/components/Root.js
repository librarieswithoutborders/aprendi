import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from '../routes'
import TopNav from './TopNav'
import AdminModal from './AdminModal'
import { connect } from 'react-redux'
import { hideAdminModal } from '../actions/actions.js';

class Root extends Component {
  render() {
    const { store, adminModal, hideAdminModal } = this.props;

    return (
      <Provider store={store}>
      <Router>
        <div>
          {adminModal && <AdminModal />}
          {adminModal && <div className="content-overlay" onClick={() => hideAdminModal()}></div>}
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
    adminModal: state.adminModal
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
