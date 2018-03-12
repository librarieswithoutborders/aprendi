import React from 'react';
import { showAdminModal, deleteTeam, fetchCollectionList } from '../actions/actions.js';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Grid from './Grid'
import PageHeader from './PageHeader'
import canUserEdit from '../utils/canUserEdit'


const AllCollectionsPage = ({collections, createTeam, deleteTeam, history, editingMode, currUser}) => {
  console.log(collections)

  let headerContents = {
    title: "Collections"
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
      return <h5>Loading Collections</h5>
    }

  }
}

const mapStateToProps = (state, ownProps) => {
  let canEdit = canUserEdit(state.currUser, null, null)
  return {
    collections: state.collectionList,
    editingMode: canEdit,
    currUser: state.currUser
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
