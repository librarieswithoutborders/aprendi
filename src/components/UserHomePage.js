import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PageHeader from './PageHeader'
import Grid from './Grid'
import LoadingIcon from './LoadingIcon'
import { showAdminModal } from '../actions/index'
import { removeUserFromTeam } from '../actions/user'
import HomePage from './HomePage'
import CoreAdminPortal from './CoreAdminPortal'

const UserHomePage = ({user, history, removeUserFromTeam, addUserToTeam, editingMode, createTeam}) => {
  console.log(user)
  let mainContent;
  let title = 'Welcome '
  title += user.permissions && user.permissions.teams && user.permissions.teams.length > 0 ? "Back " : ""
  title += user.userInfo.given_name

  let headerContents = {
    title: title
  }

  if (!user.permissions) {
    mainContent = <LoadingIcon />
  } else if (user.permissions.core_admin) {
    mainContent = (
      <div className="team-home-page__contents">
        <div className="team-home-page__section">
          <CoreAdminPortal history={history}/>
        </div>
      </div>
    )
  } else if (user.permissions.teams && user.permissions.teams.length > 0) {
    mainContent = (
      <div className="team-home-page__contents">
        <div className="team-home-page__section">
          <h5 className="team-home-page__section-title">My Teams</h5>
          <div className="button" onClick={() => createTeam(user)}>+ Create New Team</div>
            <Grid
              data={user.permissions.teams}
              type="team"
              clickHandler={(teams, index) => history.push('/teams/' + teams[index].path)}
              isDraggable={false}
              editingMode={editingMode}
            />
        </div>
      </div>
    )
  } else {
    mainContent = (
      <div className="team-home-page__contents">
        <h5 className="team-home-page__text">Get started by <span className="team-home-page__text__link" onClick={() => createTeam(user) }>creating a new team</span> or asking a team administrator to add you to their team.</h5>
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

  render() {
    const {user} = this.props

    console.log(this.props)

    if (user) {
      if (user === "Logged out") {
        return (
          <HomePage />
        )
      } else if (user != "fetching") {
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

const mapStateToProps = (state) => {
  return {
    user: state.currUser,
    editingMode: true
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUserToTeam: (userInfo) => {
      dispatch(showAdminModal({action:"add_team", type:"user", data:userInfo}))
    },
    removeUserFromTeam: (user, teamInfo) => {
      dispatch(removeUserFromTeam(user, teamInfo))
    },
    createTeam: (user) => {
      dispatch(showAdminModal({action:"create", type:"team", user: user}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePageContainer)
