import React from 'react';
import {connect} from 'react-redux'
import {showAdminModal, showWarningModal} from '../actions/index'
import {fetchTeam, deleteTeam, updateTeam, teamApproveUserRequest} from '../actions/team'
import {fetchResourceList, showResourceViewer} from '../actions/resource'
import {removeUserFromTeam, addUserToTeam} from '../actions/user'

import {Link} from 'react-router-dom';
import PageHeader from './PageHeader'
import Grid from './Grid'
import Search from './Search'
import LoadingIcon from './LoadingIcon'
import canUserEdit from '../utils/canUserEdit'


const TeamHomePage = ({teamInfo, updateTeam, deleteTeam, createNewCollection, createNewResource, history, showResourceViewer, addUserToTeam, removeUserFromTeam, editingMode, approveUserRequest, isCoreAdmin, currUser, userJoinTeamRequest}) => {
  const headerContents = {
    title: teamInfo.team_name,
    image_url: teamInfo.image_url,
    description: teamInfo.description
  }

  return (
    <div className="team-home-page">
      <PageHeader
        contents={headerContents}
        type="team"
        editingMode={editingMode}
        editFunc={() => updateTeam(teamInfo)}
        deleteFunc={() => deleteTeam(teamInfo)}
        joinFunc={currUser && currUser.permissions && !editingMode ? () => userJoinTeamRequest(currUser.permissions, teamInfo) : null}/>

      <div className="team-home-page__contents">
        {editingMode && teamInfo.pending_users && teamInfo.pending_users.length > 0 &&
          <div className="team-home-page__section">
            <h5 className="team-home-page__section-title">Pending User Requests</h5>
            {teamInfo.pending_users &&
              <Grid
                data={teamInfo.pending_users.sort((a, b) => {
                  if (a.name < b.name) {
                    return -1;
                  }
                  if (a.name > b.name) {
                    return 1;
                  }
                  return 0;
                })}
                type="user"
                buttonClickHandler={{
                  func: user => approveUserRequest(user, teamInfo),
                  text: 'Approve User Join Request',
                  onlyAllowCurrUser: false
                }}
                isDraggable={false}
                editingMode={editingMode}
                createNewText="Add User to Team"
              />
            }
          </div>
        }
        <div className="team-home-page__section">
          <h5 className="team-home-page__section-title">Collections</h5>
          {teamInfo.collections &&
            <Grid
              data={teamInfo.collections.sort((a, b) => {
                if (a.title < b.title) {
                  return -1;
                }
                if (a.title > b.title) {
                  return 1;
                }
                return 0;
              })}
              type="collection"
              createNew={() => createNewCollection(teamInfo._id)}
              clickHandler={(data, i) => {
                console.log(data, i); history.push(`/${data[i].path}`)
              }}
              isDraggable={false}
              editingMode={editingMode}
              createNewText="Create New Collection"
            />
          }
          {!teamInfo.collections &&
            <h5 className="team-home-page__placeholder-text">{`${teamInfo.team_name} has not created any collections yet.`}</h5>
          }
        </div>
        <div className="team-home-page__section">
          <h5 className="team-home-page__section-title">Resources</h5>
          {editingMode && <div className="team-home-page__button button button-white" onClick={() => createNewResource(teamInfo._id)}>+ Create New Resource</div>}
          {teamInfo.resources && teamInfo.resources.length > 0 &&
            <div className="team-home-page__search" >
              <Search
                type="resource"
                itemList={teamInfo.resources}
                onSelect={resource => showResourceViewer(resource)}/>
            </div>
          }
          {!teamInfo.resources || teamInfo.resources.length === 0 &&
            <h5 className="team-home-page__placeholder-text">{`${teamInfo.team_name} has not added any resources yet.`}</h5>
          }
        </div>
        {editingMode &&
          <div className="team-home-page__section">
            <h5 className="team-home-page__section-title">Users</h5>
            {teamInfo.users &&
              <Grid
                data={teamInfo.users.sort((a, b) => {
                  if (a.name < b.name) {
                    return -1;
                  }
                  if (a.name > b.name) {
                    return 1;
                  }
                  return 0;
                })}
                type="user"
                createNew={() => addUserToTeam(teamInfo)}
                buttonClickHandler={{
                  func: user => removeUserFromTeam(user, teamInfo),
                  text: isCoreAdmin ? 'Remove User From Team' : 'Leave this Team',
                  onlyAllowCurrUser: true
                }}
                isDraggable={false}
                editingMode={editingMode}
                createNewText="Add User to Team"
              />
            }
            {!teamInfo.users &&
              <h5 className="team-home-page__placeholder-text">{`${teamInfo.team_name} currently has no team members.`}</h5>
            }
          </div>
        }
      </div>
    </div>
  )
}

class TeamHomePageContainer extends React.Component {
  constructor() {
    super()
  }

  componentWillMount() {
    const {teamInfo, fetchTeam, match, fetchedResourceLists, fetchResourceList, currCollection} = this.props
    const {teamPath} = match.params

    console.log(teamInfo)

    if (!teamInfo || teamInfo.path !== teamPath) {
      fetchTeam(teamPath);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log(this.props)
    const {history, match} = this.props;
    const {teamPath} = match.params

    if (nextProps.teamInfo === 'Not Found') {
      history.replace(`/teams/?not_found=${teamPath}`)
    }

    // team path edited
    if (this.props.teamInfo && nextProps.teamInfo && this.props.teamInfo.path !== nextProps.teamInfo.path) {
      history.replace(`/teams/${nextProps.teamInfo.path}`)
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
    }
    return <LoadingIcon />
  }
}

const mapStateToProps = state => {
  const editingMode = canUserEdit(state.currUser, state.currTeam, 'team')
  return {
    teamInfo: state.currTeam,
    editingMode: editingMode,
    currUser: state.currUser,
    currCollection: state.currCollection,
    isCoreAdmin: state.currUser && state.currUser.permissions && state.currUser.permissions.core_admin
  }
}

const mapDispatchToProps = dispatch => ({
  fetchTeam: teamPath => {
    dispatch(fetchTeam(teamPath))
  },
  deleteTeam: teamInfo => {
    dispatch(showWarningModal({
      message: `Are you sure you would like to permanently delete team ${teamInfo.team_name} ?`,
      options: [
        {text: 'Yes', action: () => dispatch(deleteTeam(teamInfo))}
      ]
    }))
  },
  updateTeam: teamInfo => {
    dispatch(showAdminModal({action: 'update', type: 'team', data: teamInfo}))
  },
  addUserToTeam: teamInfo => {
    dispatch(showAdminModal({action: 'add_user', type: 'team', data: teamInfo}))
  },
  userJoinTeamRequest: (user, team) => {
    dispatch(addUserToTeam(user, team, 'pending'))
  },
  approveUserRequest: (user, teamInfo) => {
    dispatch(teamApproveUserRequest(user, teamInfo))
  },
  removeUserFromTeam: (user, teamInfo) => {
    dispatch(showWarningModal({
      message: `Are you sure you would like to remove ${user.name} from ${teamInfo.team_name} ?`,
      options: [
        {text: 'Yes', action: () => dispatch(removeUserFromTeam(user, teamInfo))}
      ]
    }))
  },
  createNewCollection: teamId => {
    dispatch(showAdminModal({action: 'create', type: 'collection', team: teamId}))
  },
  createNewResource: teamId => {
    dispatch(showAdminModal({action: 'create', type: 'resource', team: teamId, parent: null, showExisting: false}))
  },
  fetchResourceList: () => dispatch(fetchResourceList('all')),
  showResourceViewer: resource => {
    dispatch(showResourceViewer({parent: null, resourceList: [resource], currIndex: 0}))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamHomePageContainer)
