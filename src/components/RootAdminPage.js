import React from 'react';
import { showAdminModal, deleteTeam, fetchTeamList } from '../actions/actions.js';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';


const RootAdminPage = ({teams, createTeam, deleteTeam}) => {
  console.log(teams)
  return (
    <div>
      <h5>Teams</h5>
      <button onClick={() => createTeam({team_id:"new_team", team_name:"New Team"})} >Create New Team</button>
      <ul>
        {teams.map((team) => {
          return (
            <li>
              <Link to={'/teams/' + team.path} >
                <span>{team.team_name}</span>
              </Link>
              <button onClick={() => deleteTeam(team)} >Delete Team</button>
            </li>
          )
        })}
      </ul>
    </div>
  )

}

class RootAdminPageContainer extends React.Component {
  componentWillMount() {
    const {teams, fetchTeamList} = this.props;

    if (teams.length === 0) {
      fetchTeamList();
    }
  }

  render() {
    const {teams, createTeam, deleteTeam} = this.props;
    if (teams) {
      return <RootAdminPage teams={teams} createTeam={createTeam} deleteTeam={deleteTeam}/>
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
    createTeam: (teamInfo) => {
      dispatch(showAdminModal({action:"create", type:"team"}))
    },
    deleteTeam: (teamInfo) => {
      dispatch(deleteTeam(teamInfo))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootAdminPageContainer)
