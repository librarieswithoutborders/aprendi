import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchResourceList, addResourceToCollection, hideAdminModal, invalidateCurrCollection } from '../actions/actions.js'
import ResourceTypeSelector from './ResourceTypeSelector'
import ResourceExistingSearch from './ResourceExistingSearch'

// hard-coded for now but will be dynamic
const currTeam = "all"

class ResourceCreator extends Component {
  constructor() {
    super()

    this.state = {
      activeTab: 0
    }
  }

  componentWillMount() {
    console.log(this.props)
    const {fetchedResourceLists, fetchResourceList} = this.props

    if (!fetchedResourceLists[currTeam]) {
      fetchResourceList(currTeam)
    }
  }

  setActiveTab(newActiveTab) {
    if (newActiveTab != this.state.activeTab) {
      this.setState({
        activeTab: newActiveTab
      })
    }
  }

  existingResourceSelected(resourceId) {
    const {parent, addResourceToCollection} = this.props

    addResourceToCollection(resourceId, parent)
  }

  render() {
    console.log(this.props)
    const {setResourceType, fetchedResourceLists} = this.props
    const {activeTab} = this.state

    const currResourceList = fetchedResourceLists[currTeam]

    return (
      <div className="resource-creator">
        <div className="resource-creator__tab-container">
          <div className={activeTab === 0 ? "resource-creator__tab active" : "resource-creator__tab"} onClick={() => this.setActiveTab(0)}>Search Existing Resources</div>
          <div className={activeTab === 1 ? "resource-creator__tab active" : "resource-creator__tab"} onClick={() => this.setActiveTab(1)}>Upload New Resource</div>
        </div>
        {activeTab === 0 &&
          <div className="resource-creator__tab-contents">
            {currResourceList &&
              <ResourceExistingSearch resources={currResourceList} onSelect={resourceId => this.existingResourceSelected(resourceId)}/>
            }
          </div>
        }
        {activeTab === 1 &&
          <div className="resource-creator__tab-contents">
            <ResourceTypeSelector setResourceType={setResourceType} />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    fetchedResourceLists: state.fetchedResourceLists,
    parent: state.adminModalContent.parent
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchResourceList: () => dispatch(fetchResourceList("all")),
    addResourceToCollection: (resourceId, parent) => dispatch(addResourceToCollection(resourceId, parent)).then(response => existingResourceSelectCallback(response, dispatch))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceCreator)

const existingResourceSelectCallback = (response, dispatch, type) => {
  console.log(response.payload)
  if (response.payload.status === 200) {
    dispatch(hideAdminModal())
    dispatch(invalidateCurrCollection())
  }
}
