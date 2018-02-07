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
      <button onClick={() => { createNewCollection(teamInfo._id) }}>Create New Collection</button>
      {teamInfo.collections &&
        <ul>
          {teamInfo.collections.map(collection => {
            return (
              <li>
                <Link to={"/" + collection.path}>
                  <span>{collection.title}</span>
                  <span>{collection.path}</span>
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
    const {teamPath} = match.params

    console.log(teamInfo)

    if (!teamInfo || teamInfo.path !== teamPath) {
      getTeamInfo(teamPath);
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
    getTeamInfo: (teamPath) => {
      dispatch(getTeamInfo(teamPath))
    },
    createNewCollection: (teamId) => {
      dispatch(showAdminModal({action:"create", type:"collection", team:teamId}))    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamHomePageContainer)
