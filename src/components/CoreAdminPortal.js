import React from 'react';
import {showAdminModal} from '../actions/index'
import {deleteTeam, fetchTeamList} from '../actions/team'
import {showResourceViewer} from '../actions/resource'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader'
import Search from './Search'

const CoreAdminPortal = ({teams, createTeam, deleteTeam, history, createResource, showResourceViewer}) => {
  console.log(teams)

  return (
    <div className="core-admin-portal">
      <div className="core-admin-portal__contents">
        <div className="core-admin-portal__section">
          <h5 className="core-admin-portal__section-title">View Analytics</h5>
          <div className="core-admin-portal__section-contents">
            <h5>Link to Google Analytics Dashboard</h5>
          </div>
        </div>
        <div className="core-admin-portal__section">
          <h5 className="core-admin-portal__section-title">All Teams</h5>
          <div className="core-admin-portal__section-contents">
            <div className="core-admin-portal__button button button-white" onClick={() => createTeam()}>Create New Team</div>
            <Search type="team" showAll={true} onSelect={item => history.push('/teams/' + item.path)}/>
          </div>
        </div>
        <div className="core-admin-portal__section">
          <h5 className="core-admin-portal__section-title">All Users</h5>
          <div className="core-admin-portal__section-contents">
            <Search type="user" showAll={true} />
          </div>
        </div>
        <div className="core-admin-portal__section">
          <h5 className="core-admin-portal__section-title">All Collections</h5>
          <div className="core-admin-portal__section-contents">
            <Search type="collection" showAll={true} onSelect={item => history.push('/' + item.path)}/>
          </div>
        </div>
        <div className="core-admin-portal__section">
          <h5 className="core-admin-portal__section-title">All Resources</h5>
          <div className="core-admin-portal__section-contents">
            <div className="core-admin-portal__button button button-white" onClick={() => createResource()}>Create New Shared Resource</div>
            <Search type="resource" showAll={true} onSelect={resource => showResourceViewer(resource)}/>
          </div>
        </div>
      </div>
    </div>
  )

}

class CoreAdminPortalContainer extends React.Component {
  componentWillMount() {
    const {teams, fetchTeamList} = this.props;

    if (!teams) {
      fetchTeamList();
    }
  }

  render() {
    const {teams} = this.props;
    if (teams) {
      return <CoreAdminPortal {...this.props} />
    } else {
      return <h5>Loading Teams</h5>
    }

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teams: state.teamList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeamList: () => {
      dispatch(fetchTeamList())
    },
    createTeam: () => {
      dispatch(showAdminModal({action:"create", type:"team"}))
    },
    deleteTeam: (teamInfo) => {
      dispatch(deleteTeam(teamInfo))
    },
    createResource: () => {
      dispatch(showAdminModal({action:"create", type:"resource", team:null, parent: null, showExisting: false}))
    },
    showResourceViewer: (resource) => {
      dispatch(showResourceViewer({parent: null, resourceList: [resource], currIndex: 0}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreAdminPortalContainer)
