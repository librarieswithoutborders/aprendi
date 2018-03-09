import React from 'react';
import { connect } from 'react-redux'
import { fetchTeam, deleteTeam, updateTeam, resetCurrTeam, showAdminModal, fetchResourceList, showResourceViewer, removeUserFromTeam} from '../actions/actions.js';
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader'
import Grid from './Grid'
import ResourceExistingSearch from './ResourceExistingSearch'
import LoadingIcon from './LoadingIcon'
import canUserEdit from '../utils/canUserEdit'

// hard-coded temporarily
const currTeam = "all"

const TeamHomePage = ({teamInfo, updateTeam, deleteTeam, createNewCollection, createNewResource, history, showResourceViewer, addUserToTeam, removeUserFromTeam, editingMode}) => {
  let headerContents = {
    title: teamInfo.team_name,
    image_url: teamInfo.image_url,
    description: teamInfo.description
  }
  return (
    <div className="team-home-page">
      <PageHeader contents={headerContents} type="team" editingMode={editingMode} editFunc={() => updateTeam(teamInfo)} deleteFunc={() => deleteTeam(teamInfo)}/>
      <div className="team-home-page__contents">
        <div className="team-home-page__section">
          <h5 className="team-home-page__section-title">Collections</h5>
          {teamInfo.collections &&
            <Grid
              data={teamInfo.collections}
              type="collection"
              createNew={() => createNewCollection(teamInfo._id)}
              clickHandler={(data, i) => { history.push("/" + data[i].path)}}
              isDraggable={false}
              editingMode={editingMode}
              createNewText="Create New Collection"
            />
          }
        </div>
        <hr className="team-home-page__section-divider" />
        <div className="team-home-page__section">
          <h5 className="team-home-page__section-title">Resources</h5>
          {editingMode && <div className="button" onClick={() => createNewResource(teamInfo._id)}>+ Create New Resource</div>}
          {teamInfo.resources && teamInfo.resources.length > 0 &&
            <ResourceExistingSearch
              resources={teamInfo.resources}
              onSelect={resource => showResourceViewer(resource)}/>
          }
        </div>
        <hr className="team-home-page__section-divider" />
        <div className="team-home-page__section">
          <h5 className="team-home-page__section-title">Users</h5>
          {teamInfo.users &&
            <Grid
              data={teamInfo.users}
              type="user"
              createNew={() => addUserToTeam(teamInfo)}
              buttonClickHandler={(user) => removeUserFromTeam(user, teamInfo)}
              isDraggable={false}
              editingMode={editingMode}
              createNewText="Add User to Team"
            />
          }
        </div>
      </div>
    </div>
  )
}

class TeamHomePageContainer extends React.Component {
  constructor() {
    super()
  }

  componentWillMount() {
    const {teamInfo, fetchTeam, match, fetchedResourceLists, fetchResourceList} = this.props
    const {teamPath} = match.params

    console.log(teamInfo)

    if (!teamInfo || teamInfo.path !== teamPath) {
      fetchTeam(teamPath);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log(this.props)
    const {history, resetCurrTeam} = this.props;

    if (nextProps.teamInfo === "Not Found") {
      resetCurrTeam()
      history.push("/teams/")
    }

    // team path edited
    if (this.props.teamInfo && nextProps.teamInfo && this.props.teamInfo.path !== nextProps.teamInfo.path) {
      history.replace("/teams/" + nextProps.teamInfo.path)
    }

    // team was deleted
    if (this.props.teamInfo && !nextProps.teamInfo) {
      history.replace('/teams')
    }
  }

  render() {
    const {teamInfo} = this.props

    if (teamInfo) {
      return (
        <TeamHomePage {...this.props} />
      );
    } else {
      return <LoadingIcon />
    }

  }
}

const mapStateToProps = (state) => {

  return {
    teamInfo: state.currTeam,
    editingMode: canUserEdit(state.currUser, state.currTeam, "team")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeam: (teamPath) => {
      dispatch(fetchTeam(teamPath))
    },
    deleteTeam: (teamInfo) => {
      dispatch(deleteTeam(teamInfo))
    },
    updateTeam: (teamInfo) => {
      dispatch(showAdminModal({action:"update", type:"team", data:teamInfo}))
    },
    resetCurrTeam: () => {
      dispatch(resetCurrTeam())
    },
    addUserToTeam: (teamInfo) => {
      dispatch(showAdminModal({action:"add_user", type:"team", data:teamInfo}))
    },
    removeUserFromTeam: (user, teamInfo) => {
      dispatch(removeUserFromTeam(user, teamInfo))
    },
    createNewCollection: (teamId) => {
      dispatch(showAdminModal({action:"create", type:"collection", team:teamId}))
    },
    createNewResource: (teamId) => {
      dispatch(showAdminModal({action:"create", type:"resource", team:teamId, parent: null, showExisting: false}))
    },
    fetchResourceList: () => dispatch(fetchResourceList("all")),
    showResourceViewer: (resource) => {
      dispatch(showResourceViewer({parent: null, resourceList: [resource], currIndex: 0}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamHomePageContainer)
