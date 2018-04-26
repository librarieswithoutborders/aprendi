import React, {Component} from 'react';
import {connect} from 'react-redux'

import PageHeader from '../components/sitewide-components/PageHeader'
import Breadcrumbs from '../components/sitewide-components/Breadcrumbs'
import Grid from '../components/sitewide-components/Grid'

import {showAdminModal, showWarningModal} from '../actions/index'
import {deleteCollection, updateCollection, invalidateCurrCollection, collectionReorderChildren} from '../actions/collection'
import {deleteSubcollection, updateSubcollection, subcollectionReorderChildren} from '../actions/subcollection'
import {showResourceViewer, hideResourceViewer} from '../actions/resource'
import canUserEdit from '../utils/canUserEdit'


class CollectionPage extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    const {data, history, location} = this.props

    // subcollection does not exist -> redirect to one level up heirarchy
    if (!data) {
      const splitPieces = history.location.pathname.split('/');
      // url has trailing /
      if (splitPieces[splitPieces.length - 1] === '') {
        splitPieces.pop()
      }
      splitPieces.pop()
      history.replace(splitPieces.join('/'))
    }

    if (location.hash != '') {
      this.renderResourceFromHash(location.hash.replace('#', ''))
    }
  }

  renderResourceFromHash(hash) {
    const {data, setResourceViewerContent, hideResourceViewer, location, history, breadcrumbs} = this.props
    const type = breadcrumbs.length > 1 ? 'subcollection' : 'collection'
    let hashFound = false
    data.resources.forEach((d, i) => {
      if (d.path === hash) {
        hashFound = true
        setResourceViewerContent({parentType: type, parentId: data._id, parentTitle: data.title}, data.resources, i)
        return
      }
    })

    if (!hashFound) {
      history.replace(location.pathname)
      hideResourceViewer()
    }
  }

  componentWillReceiveProps(nextProps) {
    const {location, history} = this.props
    if (nextProps.location.hash != this.props.location.hash) {
      this.renderResourceFromHash(nextProps.location.hash.replace('#', ''))
    }
    if (nextProps.resourceViewerContent && this.props.resourceViewerContent && nextProps.resourceViewerContent.currIndex != this.props.resourceViewerContent.currIndex) {
      const newHash = nextProps.resourceViewerContent.resourceList[nextProps.resourceViewerContent.currIndex].path
      history.push(`${location.pathname}#${newHash}`)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log("IN SHOULD COMPONENT UPDATE")
    for (const key in nextProps) {
      // console.log(key)
      // console.log(nextProps[key], this.props[key])
      // console.log(nextProps[key] === this.props[key])
      // console.log("-----------")
    }
    return true
  }

  render() {
    const {data, parent, parentType, breadcrumbs, createSubcollection, updateCollection, deleteCollection, updateOrder, createResource, setResourceViewerContent, history, location, currTeam, editingMode} = this.props
    const type = breadcrumbs.length > 1 ? 'subcollection' : 'collection'

    const headerContents = {
      title: data.title,
      byline: type === 'collection' ? {label: data.team.team_name, path: `/teams/${data.team.path}`} : null,
      image_url: data.image_url,
      created_by: type === 'collection' && data.created_by && data.contact_email ? {name: data.created_by, email: data.contact_email, image: data.created_by_image} : null
    }

    return (
      <div className="collection">
        <PageHeader
          contents={headerContents}
          type={type}
          editingMode={editingMode}
          editFunc={() => updateCollection({data: data, type: type, parent: {parentData: parent}})}
          deleteFunc={() => deleteCollection({data: data, type: type, parent: parent, parentType: parentType, history: history})}/>
        <Breadcrumbs data={breadcrumbs} currTeam={currTeam} />
        <div className="collection__contents">
          {(editingMode || (data.subcollections && data.subcollections.length > 0)) &&
            <div className="collection__section">
              <div className="collection__section-contents">
                <Grid
                  data={data.subcollections}
                  type="subcollection"
                  createNew={() => createSubcollection({parentData: data, parentType: type})}
                  clickHandler={(itemList, clickedIndex) => {
                    let newUrl = location.pathname
                    newUrl += location.pathname.charAt(location.pathname.length - 1) === '/' ? '' : '/'
                    newUrl += itemList[clickedIndex].path
                    return history.push(newUrl);
                  }}
                  reOrderHandler={newOrder => updateOrder({data: data, newOrder: newOrder, parentType: type, childType: 'subcollection'})}
                  isDraggable={true}
                  editingMode={editingMode}
                  createNewText="Create New Subcollection"
                />
              </div>
            </div>
          }
          {(editingMode || (data.subcollections && data.subcollections.length > 0 && data.resources && data.resources.length > 0)) &&
            <hr className="collection__divider" />
          }
          {(editingMode || (data.resources && data.resources.length > 0)) &&
            <div className="collection__section">
              <div className="collection__section-contents">
                <Grid
                  data={data.resources}
                  type="resource"
                  createNew={() => createResource({parentId: data._id, parentType: type, parentResources: data.resources.map(d => d._id)}, currTeam._id)}
                  clickHandler={(elem, i) => {
                    let newUrl = location.pathname
                    newUrl += location.pathname.charAt(location.pathname.length - 1) === '#' ? '' : '#'
                    newUrl += elem[i].path
                    history.push(newUrl);
                    setResourceViewerContent({parentType: type, parentId: data._id}, data.resources, i)
                  }}
                  reOrderHandler={newOrder => updateOrder({data: data, newOrder: newOrder, parentType: type, childType: 'resource'})}
                  isDraggable={true}
                  editingMode={editingMode}
                  createNewText="Add New Resource"
                />
              </div>
            </div>
          }
          {(!editingMode && (!data.subcollections || data.subcollections.length === 0) && (!data.resources || data.resources.length === 0)) &&
            <h5 className="collection__placeholder-text">This collection does not have any content yet.</h5>
          }
          {data.disclaimer_message &&
            <div className="collection__disclaimer">
              <div className="collection__disclaimer__content" dangerouslySetInnerHTML={{__html: data.disclaimer_message}} />
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const canEdit = canUserEdit(state.currUserPermissions, state.currCollection, 'collection')
  return {
    resourceViewerContent: state.resourceViewerContent,
    currTeam: state.currTeam,
    editingMode: canEdit
  }
}

const mapDispatchToProps = dispatch => ({
  createSubcollection: parent => {
    dispatch(showAdminModal({action: 'create', type: 'subcollection', parent: parent}))
  },
  createResource: (parent, teamId) => {
    dispatch(showAdminModal({action: 'create', type: 'resource', parent: parent, showExisting: true, team: teamId}))
  },
  updateCollection: ({data, type, parent}) => {
    dispatch(showAdminModal({action: 'update', type: type, data: data, parent: parent}))
  },
  deleteCollection: ({data, type, parent, parentType, history}) => {
    const confirmFunc = type === 'collection' ? () => dispatch(deleteCollection(data)) : () => dispatch(deleteSubcollection({subcollectionInfo: data, parentId: parent._id, parentType: parentType}))

    dispatch(showWarningModal({
      message: `Are you sure you would like to permanently delete collection ${data.title} ?`,
      options: [
        {text: 'Yes', action: confirmFunc}
      ]
    }))
  },
  updateOrder: ({data, parentType, childType, newOrder}) => {
    const newData = {}
    Object.assign(newData, data)

    if (childType === 'subcollection') {
      newData.subcollections = newOrder
    } else {
      newData.resources = newOrder
    }
    if (parentType === 'collection') {
      dispatch(collectionReorderChildren({data: newData}))
    } else if (parentType === 'subcollection') {
      dispatch(subcollectionReorderChildren({data: newData}))
    }
  },
  setResourceViewerContent: (parent, resourceList, i) => {
    dispatch(showResourceViewer({parent: parent, resourceList: resourceList, currIndex: i}))
  },
  hideResourceViewer: () => dispatch(hideResourceViewer())
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage)
