import React from 'react';
import {showAdminModal} from '../actions/index'
import {deleteTeam, fetchTeamList} from '../actions/team'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import Grid from './Grid'
import PageHeader from './PageHeader'
import canUserEdit from '../utils/canUserEdit'
import LoadingIcon from './LoadingIcon'


const AllTeamsPage = ({teams, createTeam, deleteTeam, history, editingMode, currUser, notFoundRedirected}) => {
  console.log(notFoundRedirected)

  const headerContents = {
    title: notFoundRedirected ? `Team at Path /${notFoundRedirected} Not Found` : 'Teams',
    description: notFoundRedirected ? 'Browse Other Teams Below:' : null
  }

  return (
    <div>
      <PageHeader contents={headerContents} type="team" />
      <Grid
        data={teams}
        type="team"
        createNew={() => createTeam(currUser)}
        clickHandler={(teams, i) => history.push(`/teams/${teams[i].path}`)}
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
    }
    return <LoadingIcon />
  }
}

const mapStateToProps = (state, ownProps) => {
  const canEdit = canUserEdit(state.currUser, null, null)
  return {
    teams: state.teamList,
    editingMode: canEdit,
    currUser: state.currUser,
    notFoundRedirected: ownProps.history.location.search === '' ? null : ownProps.history.location.search.replace('?not_found=', '')
  }
}

const mapDispatchToProps = dispatch => ({
  fetchTeamList: () => {
    dispatch(fetchTeamList())
  },
  createTeam: user => {
    dispatch(showAdminModal({action: 'create', type: 'team', user: user}))
  },
  deleteTeam: teamInfo => {
    dispatch(deleteTeam(teamInfo))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllTeamsPageContainer)
