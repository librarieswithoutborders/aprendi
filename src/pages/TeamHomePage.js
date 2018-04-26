import React from 'react';
import {connect} from 'react-redux'

import PageHeader from '../components/sitewide-components/PageHeader'
import Grid from '../components/sitewide-components/Grid'
import Search from '../components/sitewide-components/Search'
import LoadingIcon from '../components/sitewide-components/LoadingIcon'

import {showAdminModal, showWarningModal} from '../actions/index'
import {fetchTeam, deleteTeam, teamApproveUserRequest, teamDenyUserRequest} from '../actions/team'
import {fetchResourceList, showResourceViewer} from '../actions/resource'
import {removeUserFromTeam, addUserToTeam} from '../actions/user'
import canUserEdit from '../utils/canUserEdit'
import canUserRequestToJoin from '../utils/canUserRequestToJoin'


const TeamHomePage = ({teamInfo, updateTeam, deleteTeam, createNewCollection, createNewResource, history, showResourceViewer, addUserToTeam, removeUserFromTeam, editingMode, userCanJoin, approveUserRequest, denyUserRequest, isCoreAdmin, currUserPermissions, userJoinTeamRequest}) => {
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
        joinFunc={userCanJoin ? () => userJoinTeamRequest(currUserPermissions, teamInfo) : null}/>

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
                button2ClickHandler={{
                  func: user => denyUserRequest(user, teamInfo),
                  text: 'Deny User Join Request',
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
                history.push(`/${data[i].path}`)
              }}
              isDraggable={false}
              editingMode={editingMode}
              createNewText="Create New Collection"
            />
          }
          {!editingMode && (!teamInfo.collections || teamInfo.collections.length === 0) &&
            <h5 className="team-home-page__placeholder-text">{`${teamInfo.team_name} has not created any collections yet.`}</h5>
          }
        </div>
        {editingMode &&
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
        }
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
                  func: isCoreAdmin ? user => removeUserFromTeam(user, teamInfo, false) : user => removeUserFromTeam(user, teamInfo, true),
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
    const {teamInfo, fetchTeam, match} = this.props
    const {teamPath} = match.params

    if (!teamInfo || teamInfo.path !== teamPath) {
      fetchTeam(teamPath);
    }
  }

  componentWillReceiveProps(nextProps) {
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
  const editingMode = canUserEdit(state.currUserPermissions, state.currTeam, 'team')
  const userCanJoin = canUserRequestToJoin(state.currUserPermissions, state.currTeam)

  return {
    teamInfo: state.currTeam,
    editingMode: editingMode,
    userCanJoin: userCanJoin,
    currUserPermissions: state.currUserPermissions,
    currCollection: state.currCollection,
    isCoreAdmin: state.currUserPermissions && state.currUserPermissions.core_admin
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
  denyUserRequest: (user, teamInfo) => {
    dispatch(teamDenyUserRequest(user, teamInfo))
  },
  removeUserFromTeam: (user, teamInfo, isSelf) => {
    const message = isSelf ? `Are you sure you would like to leave ${teamInfo.team_name}?` : `Are you sure you would like to remove ${user.name} from ${teamInfo.team_name}?`
    dispatch(showWarningModal({
      message: message,
      options: [
        {text: 'Yes', action: () => dispatch(removeUserFromTeam(user, teamInfo, isSelf))}
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
