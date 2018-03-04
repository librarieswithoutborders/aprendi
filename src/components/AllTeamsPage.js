import React from 'react';
import { showAdminModal, deleteTeam, fetchTeamList } from '../actions/actions.js';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Grid from './Grid'
import PageHeader from './PageHeader'
import canUserEdit from '../utils/canUserEdit'


const AllTeamsPage = ({teams, createTeam, deleteTeam, history, editingMode, currUser}) => {
  console.log(teams)

  let headerContents = {
    title: "Teams"
  }

  return (
    <div>
      <PageHeader contents={headerContents} type="team" />
      <Grid
        data={teams}
        type="team"
        createNew={() => createTeam(currUser)}
        clickHandler={team => history.push('/teams/' + team.path)}
        isDraggable={false}
        editingMode={editingMode}
        createNewText="Create New Team"
      />
    </div>
  )

}

class AllTeamsPageContainer extends React.Component {
  componentWillMount() {
    const {teams, fetchTeamList} = this.props;

    if (!teams) {
      fetchTeamList();
    }
  }

  render() {
    const {teams, createTeam, deleteTeam} = this.props;
    if (teams) {
      return <AllTeamsPage {...this.props} />
    } else {
      return <h5>Loading Teams</h5>
    }

  }
}

const mapStateToProps = (state, ownProps) => {
  let canEdit = canUserEdit(state.currUser, null, null)
  return {
    teams: state.teamList,
    editingMode: canEdit,
    currUser: state.currUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeamList: () => {
      dispatch(fetchTeamList())
    },
    createTeam: (user) => {
      dispatch(showAdminModal({action:"create", type:"team", user: user}))
    },
    deleteTeam: (teamInfo) => {
      dispatch(deleteTeam(teamInfo))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTeamsPageContainer)
