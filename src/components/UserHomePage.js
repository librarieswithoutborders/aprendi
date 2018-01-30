import React from 'react';
import CollectionGrid from './CollectionGrid';
import { connect } from 'react-redux'


const UserHomePage = () => {

  return (
    <div>
      <h1>Welcome to My Library Guide</h1>
      <CollectionGrid />
    </div>
  )
}

class UserHomePageContainer extends React.Component {
  constructor() {
    super()
  }
  render() {
    console.log(this.props)
    const {params} = this.props.match;
    console.log(params)
    return (
      <UserHomePage />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = () => {
  return {
    // fetchCollectionList: () => {
    //   dispatch(fetchCollectionList())
    // },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePageContainer)
