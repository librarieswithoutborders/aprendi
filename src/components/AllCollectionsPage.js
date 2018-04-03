import React from 'react';
import {showAdminModal} from '../actions/index'
import {deleteTeam} from '../actions/team'
import {fetchCollectionList} from '../actions/collection'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Grid from './Grid'
import PageHeader from './PageHeader'
import canUserEdit from '../utils/canUserEdit'
import LoadingIcon from './LoadingIcon'

const AllCollectionsPage = ({collections, createTeam, deleteTeam, history, editingMode, currUser, notFoundRedirected}) => {
  console.log(notFoundRedirected)

  let headerContents = {
    title: notFoundRedirected ? "Collection at Path /" + notFoundRedirected + " Not Found" : "Collections",
    description: notFoundRedirected ? "Browse Other Collections Below:" : null
  }

  return (
    <div>
      <PageHeader contents={headerContents} type="collection" />
      <Grid
        data={collections}
        type="collection"
        createNew={null}
        clickHandler={(collections, i) => history.push('/' + collections[i].path)}
        isDraggable={false}
        editingMode={editingMode}
        createNewText="Create New Collection"
        showTeam={true}
      />
    </div>
  )

}

class AllCollectionsPageContainer extends React.Component {
  componentWillMount() {
    const {collections, fetchCollectionList} = this.props;

    if (!collections) {
      fetchCollectionList();
    }
  }

  render() {
    const {collections, createTeam, deleteTeam} = this.props;
    if (collections) {
      return <AllCollectionsPage {...this.props} />
    } else {
      return <LoadingIcon />
    }

  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  let canEdit = canUserEdit(state.currUser, null, null)
  return {
    collections: state.collectionList,
    editingMode: canEdit,
    currUser: state.currUser,
    notFoundRedirected: ownProps.history.location.search === "" ? null : ownProps.history.location.search.replace("?not_found=", "")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollectionList: () => {
      dispatch(fetchCollectionList())
    },
    createTeam: (user) => {
      dispatch(showAdminModal({action:"create", type:"collection", user: user}))
    },
    deleteTeam: (collectionInfo) => {
      dispatch(deleteTeam(collectionInfo))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCollectionsPageContainer)
