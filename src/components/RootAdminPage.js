import React from 'react';
import { createTeam, deleteTeam, getFullTeamList } from '../actions/actions.js';
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
              <Link to={'/teams/' + team.team_id} >
                <span>{team.team_name}</span>
              </Link>
              <button onClick={() => deleteTeam(team._id)} >Delete Team</button>
            </li>
          )
        })}
      </ul>
    </div>
  )

}

class RootAdminPageContainer extends React.Component {
  componentWillMount() {
    const {teams, getFullTeamList} = this.props;

    if (teams.length === 0) {
      getFullTeamList();
    }
  }

  render() {
    const {teams, createTeam} = this.props;
    if (teams && teams.length > 0) {
      return <RootAdminPage teams={teams} createTeam={createTeam} deleteTeam={deleteTeam}/>
    } else {
      return <h5>Loading Teams</h5>
    }

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teams: state.fullTeamList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFullTeamList: () => {
      dispatch(getFullTeamList())
    },
    createTeam: (teamInfo) => {
      dispatch(createTeam(teamInfo))
    },
    deleteTeam: (id) => {
      dispatch(deleteTeam(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootAdminPageContainer)
