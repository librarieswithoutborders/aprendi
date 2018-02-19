import React from 'react';
import { connect } from 'react-redux'
import { getTeamInfo, showAdminModal, fetchResourceList, showResourceViewer } from '../actions/actions.js';
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader'
import Grid from './Grid'
import ResourceExistingSearch from './ResourceExistingSearch'
import LoadingIcon from './LoadingIcon'

// hard-coded temporarily
const currTeam = "all"

const TeamHomePage = ({teamInfo, teamResources, createNewCollection, createNewResource, history, showResourceViewer}) => {
  console.log(history)
  let headerContents = {
    title: teamInfo.team_name
  }
  return (
    <div className="team-home-page">
      <PageHeader contents={headerContents} />
      <div className="team-home-page__contents">
        <div className="team-home-page__section">
          <h5 className="team-home-page__section-title">Collections</h5>
          {teamInfo.collections &&
            <Grid
              data={teamInfo.collections}
              type="collection"
              createNew={() => createNewCollection(teamInfo._id)}
              clickHandler={(data, i) => { history.push("/" + data[i].path)}}
            />
          }
        </div>
        <hr className="team-home-page__section-divider" />
        <div className="team-home-page__section">
          <h5 className="team-home-page__section-title">Resources</h5>
          <div className="button" onClick={() => createNewResource(teamInfo._id)}>+ Create New Resource</div>
          {teamResources && teamResources.length > 0 &&
            <ResourceExistingSearch
              resources={teamResources}
              onSelect={resource => showResourceViewer(resource)}/>
          }
        </div>
        <hr className="team-home-page__section-divider" />
        <div className="team-home-page__section">
          <h5 className="team-home-page__section-title">Users</h5>
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
    const {teamInfo, getTeamInfo, match, fetchedResourceLists, fetchResourceList} = this.props
    const {teamPath} = match.params

    console.log(teamInfo)

    if (!teamInfo || teamInfo.path !== teamPath) {
      getTeamInfo(teamPath);
    }

    if (!fetchedResourceLists[currTeam]) {
      fetchResourceList(currTeam)
    }
  }

  render() {
    const {teamInfo, createNewCollection, createNewResource, history, fetchedResourceLists, showResourceViewer} = this.props

    if (teamInfo && fetchedResourceLists[currTeam]) {
      return (
        <TeamHomePage teamInfo={teamInfo} teamResources={fetchedResourceLists[currTeam]} createNewCollection={createNewCollection} createNewResource={createNewResource} showResourceViewer={showResourceViewer} history={history} />
      );
    } else {
      return <LoadingIcon />
    }

  }
}

const mapStateToProps = (state) => {
  return {
    teamInfo: state.currTeamInfo,
    fetchedResourceLists: state.fetchedResourceLists,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTeamInfo: (teamPath) => {
      dispatch(getTeamInfo(teamPath))
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
