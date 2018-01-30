import React from 'react';
import CollectionGrid from './CollectionGrid';

class UserHomePage extends React.Component {
  constructor() {
    super()
  }
  render() {
    console.log(this.props)
    const {params} = this.props.match;
    return (
      <div>
        <h1>Welcome to My Library Guide</h1>
        <h5>{"username: " + params.userId}</h5>
        <CollectionGrid />
      </div>
    );
  }
}

export default UserHomePage;
