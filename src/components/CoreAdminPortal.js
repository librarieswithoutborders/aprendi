import React from 'react';
import {showAdminModal} from '../actions/index'
import {deleteTeam, fetchTeamList, teamApproveUserRequest, teamDenyUserRequest, resetCurrTeam} from '../actions/team'
import {showResourceViewer} from '../actions/resource'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import PageHeader from './PageHeader'
import Search from './Search'
import LoadingIcon from './LoadingIcon'

const CoreAdminPortal = ({pendingRequests, teams, createTeam, deleteTeam, history, createResource, showResourceViewer, approveUserRequest, denyUserRequest}) => {
  console.log(teams)

  console.log('PENDING REQUESTS!')
  console.log(pendingRequests)

  return (
    <div className="core-admin-portal">
      <div className="core-admin-portal__contents">
        <div className="core-admin-portal__section">
          <h5 className="core-admin-portal__section-title">Pending User Requests</h5>
          { pendingRequests && pendingRequests.length > 0 &&
            <div className="core-admin-portal__section-contents">
              { pendingRequests.map(d => (
                <div className="core-admin-portal__request">
                  <h5 className="core-admin-portal__request__text">
                    {`${d.user.name} wants to join ${d.team.team_name}`}
                  </h5>
                  <div className="core-admin-portal__request__button" onClick={() => approveUserRequest(d.user, d.team)}>Approve Request</div>
                  <div className="core-admin-portal__request__button" onClick={() => denyUserRequest(d.user, d.team)}>Deny Request</div>
                </div>
              ))}
            </div>
          }
        </div>
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
            <Search type="team" showAll={true} onSelect={item => history.push(`/teams/${item.path}`)}/>
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
            <Search type="collection" showAll={true} onSelect={item => history.push(`/${item.path}`)}/>
          </div>
        </div>
        <div className="core-admin-portal__section">
          <h5 className="core-admin-portal__section-title">All Resources</h5>
          <div className="core-admin-portal__section-contents">
            <div className="core-admin-portal__button button button-white" onClick={() => createResource()}>Create New Resource</div>
            <Search type="resource" showAll={true} onSelect={resource => showResourceViewer(resource)}/>
          </div>
        </div>
      </div>
    </div>
  )
}

class CoreAdminPortalContainer extends React.Component {
  componentWillMount() {
    const {teams, fetchTeamList, currTeam, resetCurrTeam} = this.props

    if (!teams) {
      fetchTeamList()
    }

    if (currTeam) {
      resetCurrTeam()
    }
  }

  componentWillReceiveProps(nextProps) {
    const {teams, fetchTeamList} = this.props

    if (nextProps.teams === 'Invalid' && teams != 'Invalid') {
      fetchTeamList();
    }
  }

  getPendingRequests(propsObject) {
    const {teams} = propsObject

    let fullList = []

    if (teams && teams.length > 0) {
      teams.forEach(team => {
        console.log(team)
        if (team.pending_users.length > 0) {
          const thisTeamsList = team.pending_users.map(d => ({team: team, user: d}))
          fullList = [...fullList, ...thisTeamsList]
        }
      })
    }

    return fullList
  }

  render() {
    const {teams} = this.props;

    if (teams && teams != 'Invalid') {
      return <CoreAdminPortal pendingRequests={this.getPendingRequests(this.props)} {...this.props} />
    }
    return <LoadingIcon />
  }
}

const mapStateToProps = (state, ownProps) => ({
  teams: state.teamList,
  currTeam: state.currTeam
})

const mapDispatchToProps = dispatch => ({
  resetCurrTeam: () => {
    dispatch(resetCurrTeam())
  },
  fetchTeamList: () => {
    dispatch(fetchTeamList())
  },
  createTeam: () => {
    dispatch(showAdminModal({action: 'create', type: 'team'}))
  },
  deleteTeam: teamInfo => {
    dispatch(deleteTeam(teamInfo))
  },
  approveUserRequest: (user, teamInfo) => {
    dispatch(teamApproveUserRequest(user, teamInfo))
  },
  denyUserRequest: (user, teamInfo) => {
    dispatch(teamDenyUserRequest(user, teamInfo))
  },
  createResource: () => {
    dispatch(showAdminModal({action: 'create', type: 'resource', team: null, parent: null, showExisting: false}))
  },
  showResourceViewer: resource => {
    dispatch(showResourceViewer({parent: null, resourceList: [resource], currIndex: 0}))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CoreAdminPortalContainer)
