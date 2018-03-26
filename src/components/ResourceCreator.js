import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchResourceList, collectionAddExistingResource, subcollectionAddExistingResource, hideAdminModal, invalidateCurrCollection } from '../actions/actions.js'
import ResourceTypeSelector from './ResourceTypeSelector'
import ResourceExistingSearch from './ResourceExistingSearch'


class ResourceCreator extends Component {
  constructor() {
    super()

    this.state = {
      activeTab: 0
    }
  }

  setActiveTab(newActiveTab) {
    if (newActiveTab != this.state.activeTab) {
      this.setState({
        activeTab: newActiveTab
      })
    }
  }

  existingResourceSelected(resource) {
    const {parent, addExistingResource} = this.props

    addExistingResource(resource, parent)
  }

  render() {
    const {setResourceType, showExisting, currTeam, parent} = this.props
    const {activeTab} = this.state

    let currResourceList = currTeam.resources
    if (parent && parent.parentResources) {
      currResourceList = currResourceList.filter(d => parent.parentResources.indexOf(d._id) < 0)
    }

    if (!showExisting) {
      return (
        <div className="resource-creator">
          <ResourceTypeSelector setResourceType={setResourceType} />
        </div>
      )
    } else {
      return (
        <div className="resource-creator">
          <div className="resource-creator__tab-container">
            <div className={activeTab === 0 ? "resource-creator__tab active" : "resource-creator__tab"} onClick={() => this.setActiveTab(0)}>Search Existing Resources</div>
            <div className={activeTab === 1 ? "resource-creator__tab active" : "resource-creator__tab"} onClick={() => this.setActiveTab(1)}>Upload New Resource</div>
            <div className="resource-creator__tab-mask" style={{left: activeTab === 0 ? "0" : "50%" }}></div>
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
}

const mapStateToProps = (state, ownProps) => {
  return {
    currTeam: state.currTeam,
    parent: state.adminModalContent.parent
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addExistingResource: (resource, parent) => {
      if (parent.parentType === "collection") {
        dispatch(collectionAddExistingResource(resource, parent.parentId))
      } else {
        dispatch(subcollectionAddExistingResource(resource, parent.parentId))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceCreator)
