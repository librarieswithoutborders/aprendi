import React from 'react';
import { connect } from 'react-redux'
import { getTeamInfo, showAdminModal, fetchResourceList } from '../actions/actions.js';
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader'
import Grid from './Grid'
import ResourceExistingSearch from './ResourceExistingSearch'
import LoadingIcon from './LoadingIcon'

// hard-coded temporarily
const currTeam = "all"

const TeamHomePage = ({teamInfo, teamResources, createNewCollection, createNewResource, history}) => {
  console.log(history)
  let headerContents = {
    title: teamInfo.team_name
  }
  return (
    <div className="team-home-page">
      <PageHeader contents={headerContents} />
      <div className="team-home-page__contents">
        <h5 className="team-home-page__section-title">Collections</h5>
        <div className="team-home-page__section">
          {teamInfo.collections &&
            <Grid
              data={teamInfo.collections}
              type="collection"
              createNew={() => createNewCollection(teamInfo._id)}
              clickHandler={(data, i) => { history.push("/" + data[i].path)}}
            />
          }
        </div>
        <h5 className="team-home-page__section-title">Resources</h5>
        <div className="team-home-page__section">
          {teamResources && teamResources.length > 0 &&
            <ResourceExistingSearch resources={teamResources} onSelect={resourceId => console.log(resourceId)}/>
          }
        </div>
        <h5 className="team-home-page__section-title">Users</h5>
        <div className="team-home-page__section">
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
    const {teamInfo, createNewCollection, history, fetchedResourceLists} = this.props

    if (teamInfo && fetchedResourceLists[currTeam]) {
      return (
        <TeamHomePage teamInfo={teamInfo} teamResources={fetchedResourceLists[currTeam]} createNewCollection={createNewCollection} history={history} />
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
    createNewResource: () => {
      dispatch(showAdminModal({action:"create", type:"resource", parent: null}))
    },
    fetchResourceList: () => dispatch(fetchResourceList("all")),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamHomePageContainer)
