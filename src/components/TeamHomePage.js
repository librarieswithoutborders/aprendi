import React from 'react';
import { connect } from 'react-redux'
import { getTeamInfo, showAdminModal } from '../actions/actions.js';
import { Link } from 'react-router-dom';



const TeamHomePage = ({teamInfo, createNewCollection}) => {
  return (
    <div>
      <h1>{teamInfo.team_name}</h1>
      {teamInfo.users &&
        <ul>
          {teamInfo.users.map(user => {
            return (
              <li>
                <span>{user.name}</span>
                <span>{user.email}</span>
                <span>{user.last_login}</span>
              </li>
            )
          })}
        </ul>
      }
      <button onClick={() => { createNewCollection(teamInfo.team_id) }}>Create New Collection</button>
      {teamInfo.collections &&
        <ul>
          {teamInfo.collections.map(collection => {
            return (
              <li>
                <Link to={"/" + collection.url}>
                  <span>{collection.title}</span>
                  <span>{collection.url}</span>
                  <span>{collection.createdAt}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}

class TeamHomePageContainer extends React.Component {
  constructor() {
    super()
  }

  componentWillMount() {
    const {teamInfo, getTeamInfo, fetchCollectionsByTeam, match} = this.props
    const {teamId} = match.params

    console.log(teamInfo)

    if (!teamInfo || teamInfo.team_id !== teamId) {
      getTeamInfo(teamId);
    }
  }

  render() {
    const {teamInfo, createNewCollection} = this.props

    if (teamInfo) {
      return (
        <TeamHomePage teamInfo={teamInfo} createNewCollection={createNewCollection}/>
      );
    } else {
      return <h5>Loading Team Info</h5>
    }

  }
}

const mapStateToProps = (state) => {
  return {
    teamInfo: state.currTeamInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTeamInfo: (teamId) => {
      dispatch(getTeamInfo(teamId))
    },
    createNewCollection: (teamId) => {
      dispatch(showAdminModal({ formType:"collection", data: {team: teamId} }))
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamHomePageContainer)
