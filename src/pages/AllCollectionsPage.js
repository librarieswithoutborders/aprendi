import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Grid from '../components/sitewide-components/Grid'
import PageHeader from '../components/sitewide-components/PageHeader'
import LoadingIcon from '../components/sitewide-components/LoadingIcon'

import {fetchCollectionList} from '../actions/collection'
import canUserEdit from '../utils/canUserEdit'

const AllCollectionsPage = ({collections, history, editingMode, notFoundRedirected}) => {
  const headerContents = {
    title: notFoundRedirected ? `Collection at Path /${notFoundRedirected} Not Found` : 'Collections',
    description: notFoundRedirected ? 'Browse Other Collections Below:' : null
  }

  return (
    <div>
      <PageHeader contents={headerContents} type="collection" />
      <Grid
        data={collections}
        type="collection"
        createNew={null}
        clickHandler={(collections, i) => history.push(`/${collections[i].path}`)}
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
    const {collections, fetchCollectionList} = this.props

    if (!collections) {
      fetchCollectionList()
    }
  }

  render() {
    const {collections} = this.props
    if (collections) {
      return <AllCollectionsPage {...this.props} />
    }
    return <LoadingIcon />
  }
}

const mapStateToProps = (state, ownProps) => {
  const canEdit = canUserEdit(state.currUserPermissions, null, null)
  return {
    collections: state.collectionList,
    editingMode: canEdit,
    notFoundRedirected: ownProps.history.location.search === '' ? null : ownProps.history.location.search.replace('?not_found=', '')
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionList: () => {
    dispatch(fetchCollectionList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllCollectionsPageContainer)
