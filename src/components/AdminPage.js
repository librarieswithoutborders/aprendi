import React from 'react';
import { showAdminModal, deleteTeam, fetchTeamList } from '../actions/actions.js';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader'
import Search from './Search'

const AdminPage = ({teams, createTeam, deleteTeam, history}) => {
  console.log(teams)

  let headerContents = {
    title: "Admin"
  }

  return (
    <div>
      <PageHeader contents={headerContents} type="admin" />
      <h5>Teams</h5>
      <button onClick={() => createTeam({team_id:"new_team", team_name:"New Team"})} >Create New Team</button>
      <Search type="team" showAll={true} onSelect={item => history.push('/teams/' + item.path)}/>
      <Search type="collection" showAll={true} onSelect={item => history.push('/' + item.path)}/>
      <Search type="resource" showAll={true} onSelect={item => history.push('/' + item.path)}/>
    </div>
  )

}

class AdminPageContainer extends React.Component {
  componentWillMount() {
    const {teams, fetchTeamList} = this.props;

    if (!teams) {
      fetchTeamList();
    }
  }

  render() {
    const {teams} = this.props;
    if (teams) {
      return <AdminPage {...this.props} />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPageContainer)
