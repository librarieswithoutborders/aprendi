import React, { Component } from 'react';
import { fetchResources } from '../actions/actions.js';
import { connect } from 'react-redux'


class HomePage extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    console.log(this.props)
    this.props.fetchResources()
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Welcome to My Library Guide</h1>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    resources: state.fetchedResources
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchResources: () => {
      dispatch(fetchResources())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
