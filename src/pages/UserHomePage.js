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
import {removeUserFromTeam, addUserToTeam, sendUserInfoRequest} from '../actions/user'


const UserHomePage = ({user, history, removeUserFromTeam, userJoinTeamRequest, editingMode, createTeam}) => {
  console.log('IN USER HOME PAGE')
  console.log(history)
  let mainContent;
  let title = 'Welcome '
  title += user.permissions && user.permissions.teams && user.permissions.teams.length > 0 ? 'Back ' : ''
  title += user.userInfo.given_name

  const headerContents = {
    title: title
  }

  if (!user.permissions || user.permissions === 'Invalid') {
    mainContent = <LoadingIcon />
  } else if (user.permissions.core_admin) {
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
        {!user.permissions.teams || user.permissions.teams.length === 0 &&
          <div className="team-home-page__section">
            <div className="team-home-page__section__text-container">
              <p className="team-home-page__section__text">To get started adding and editing content, you must first join a team.</p>
              <p className="team-home-page__section__text">Using the options below, choose whether you would like to create a new team or request to join an existing one.</p>
            </div>
          </div>
        }
        {user.permissions.teams &&
          <div className="team-home-page__section">
            <h5 className="team-home-page__section-title">My Teams</h5>
            <Grid
              data={user.permissions.teams}
              type="team"
              createNew={() => createTeam(user)}
              clickHandler={(teams, index) => {
                console.log('HEREEEEE!', history); history.push(`/teams/${teams[index].path}`)
              }}
              isDraggable={false}
              editingMode={editingMode}
              createNewText="Create New Team"
            />
          </div>
        }
        {user.permissions && user.permissions.pending_teams && user.permissions.pending_teams.length > 0 &&
          <div className="team-home-page__section">
            <h5 className="team-home-page__section-title">Pending Requests</h5>
            <Grid
              data={user.permissions.pending_teams}
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
              onSelect={item => userJoinTeamRequest(user.permissions, item)}
              filterList={d => user.permissions}/>
          </div>
        </div>
      </div>
    )
  }
  // } else {
  //   mainContent = (
  //     <div className="team-home-page__contents">
  //       <h5 className="team-home-page__text">Get started by <span className="team-home-page__text__link" onClick={() => createTeam(user) }>creating a new team</span> or asking a team administrator to add you to their team.</h5>
  //     </div>
  //   )
  // }


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
    const {user} = this.props

    if (user && user.permissions === 'Invalid') {
      this.props.sendUserInfoRequest()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.permissions === 'Invalid') {
      this.props.sendUserInfoRequest()
    }
  }

  render() {
    const {user} = this.props

    if (user) {
      if (user === 'Logged out') {
        return (
          <HomePage />
        )
      } else if (user != 'fetching') {
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
  user: state.currUser,
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
  removeUserFromTeam: (user, teamInfo) => {
    dispatch(removeUserFromTeam(user, teamInfo))
  },
  createTeam: user => {
    dispatch(showAdminModal({action: 'create', type: 'team', user: user}))
  },
  sendUserInfoRequest: () => {
    dispatch(sendUserInfoRequest())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePageContainer)
