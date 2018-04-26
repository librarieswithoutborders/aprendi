import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import HomePage from './HomePage'
import PageHeader from '../components/sitewide-components/PageHeader'
import Grid from '../components/sitewide-components/Grid'
import LoadingIcon from '../components/sitewide-components/LoadingIcon'
import CoreAdminPortal from '../components/admin-components/CoreAdminPortal'
import Search from '../components/sitewide-components/Search'

import {showAdminModal, showWarningModal} from '../actions/index'
import {addUserToTeam, sendUserInfoRequest} from '../actions/user'


const UserHomePage = ({currUserInfo, currUserPermissions, history, userJoinTeamRequest, editingMode, createTeam}) => {
  let mainContent;
  let title = 'Welcome '
  title += currUserInfo.given_name

  const headerContents = {
    title: title
  }

  if (!currUserPermissions || currUserPermissions === 'Invalid') {
    mainContent = <LoadingIcon />
  } else if (currUserPermissions.core_admin) {
    mainContent = (
      <div className="team-home-page__contents">
        <div className="team-home-page__section">
          <CoreAdminPortal history={history}/>
        </div>
      </div>
    )
  } else {
    mainContent = (
      <div className="team-home-page__contents">
        {!currUserPermissions.teams || currUserPermissions.teams.length === 0 &&
          <div className="team-home-page__section">
            <div className="team-home-page__section__text-container">
              <p className="team-home-page__section__text">To get started adding and editing content, you must first join a team.</p>
              <p className="team-home-page__section__text">Using the options below, choose whether you would like to create a new team or request to join an existing one.</p>
            </div>
          </div>
        }
        {currUserPermissions.teams &&
          <div className="team-home-page__section">
            <h5 className="team-home-page__section-title">My Teams</h5>
            <Grid
              data={currUserPermissions.teams}
              type="team"
              createNew={() => createTeam(currUserPermissions)}
              clickHandler={(teams, index) => {
                history.push(`/teams/${teams[index].path}`)
              }}
              isDraggable={false}
              editingMode={editingMode}
              createNewText="Create New Team"
            />
          </div>
        }
        {currUserPermissions && currUserPermissions.pending_teams && currUserPermissions.pending_teams.length > 0 &&
          <div className="team-home-page__section">
            <h5 className="team-home-page__section-title">Pending Requests</h5>
            <Grid
              data={currUserPermissions.pending_teams}
              type="team"
              clickHandler={(teams, index) => history.push(`/teams/${teams[index].path}`)}
              isDraggable={false}
              editingMode={false}
            />
          </div>
        }
        <div className="team-home-page__section">
          <h5 className="team-home-page__section-title">Join Existing Teams</h5>
          <div className="team-home-page__search" >
            <Search
              type="team"
              showAll={false}
              onSelect={item => userJoinTeamRequest(currUserPermissions, item)}
              filterList={d => currUserPermissions}/>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="team-home-page">
      <PageHeader contents={headerContents} type="team" />
      {mainContent}
    </div>
  )
}

class UserHomePageContainer extends React.Component {
  constructor() {
    super()
  }

  componentWillMount() {
    const {currUserPermissions} = this.props

    if (currUserPermissions === 'Invalid') {
      this.props.sendUserInfoRequest()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currUserPermissions === 'Invalid') {
      this.props.sendUserInfoRequest()
    }
  }

  render() {
    const {currUserInfo, history} = this.props

    if (currUserInfo) {
      if (currUserInfo === 'Logged out') {
        return (
          <HomePage history={history} />
        )
      } else if (currUserInfo != 'Fetching') {
        return (
          <UserHomePage {...this.props} />
        );
      }
    }

    return (
      <LoadingIcon />
    );
  }
}

const mapStateToProps = state => ({
  currUserInfo: state.currUserInfo,
  currUserPermissions: state.currUserPermissions,
  editingMode: true
})

const mapDispatchToProps = dispatch => ({
  userJoinTeamRequest: (user, team) => {
    dispatch(showWarningModal({
      message: `Request permission to join ${team.team_name}?`,
      options: [
        {text: 'Yes', action: () => dispatch(addUserToTeam(user, team, 'pending'))}
      ]
    }))
  },
  createTeam: user => {
    dispatch(showAdminModal({action: 'create', type: 'team', user: user}))
  },
  sendUserInfoRequest: () => {
    dispatch(sendUserInfoRequest())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePageContainer)
