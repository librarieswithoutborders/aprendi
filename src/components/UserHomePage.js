import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PageHeader from './PageHeader'
import Grid from './Grid'
import LoadingIcon from './LoadingIcon'
import { showAdminModal, removeUserFromTeam } from '../actions/actions.js';
import HomePage from './HomePage'

const UserHomePage = ({user, history, removeUserFromTeam, addUserToTeam, editingMode}) => {
  console.log(user)
  let headerContents = {
    title: 'Welcome Back ' + user.userInfo.given_name
  }
  return (
    <div className="team-home-page">
      <PageHeader contents={headerContents} type="team" />
      <div className="team-home-page__contents">
        <div className="team-home-page__section">
          <h5 className="team-home-page__section-title">My Teams</h5>
          <div className="button" onClick={() => createTeam()}>+ Create New Team</div>
          {user.permissions.teams &&
            <Grid
              data={user.permissions.teams}
              type="team"
              createNew={user => addUserToTeam(user)}
              clickHandler={(teams, index) => history.push('/teams/' + teams[index].path)}
              buttonClickHandler={team => removeUserFromTeam(user, team)}
              isDraggable={false}
              editingMode={editingMode}
            />
          }
        </div>
      </div>
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
      return (
        <UserHomePage {...this.props} />
      );
    } else {
      return (
        <HomePage />
      );
    }

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
    createTeam: () => {
      dispatch(showAdminModal({action:"create", type:"team"}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePageContainer)
