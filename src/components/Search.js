import React, { Component } from 'react';
import SvgIcon from './SvgIcon'
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux'
import { fetchUserList, fetchTeamList, fetchCollectionList, fetchResourceList, addUserToTeam } from '../actions/actions.js';


class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
  		value: '',
  		suggestions: this.props.data,
    };
	}

	componentWillReceiveProps(nextProps) {
		console.log("receiving new PROPSSSSS")
		console.log(nextProps.data, this.props.data)
		// if (nextProps.data && this.props.data && nextProps.data !== this.props.data) {
			this.setState({
				value: '',
				suggestions: nextProps.data
			})
		// }
	}

	render() {
		const { value, suggestions } = this.state;

		console.log(suggestions)
		console.log(this.props.data)

		const inputProps = {
  		placeholder: 'Search',
  		value,
  		onChange: this.onChange.bind(this)
    };

		return (
      <div className="search">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={(props) => this.onSuggestionsFetchRequested(props)}
          onSuggestionSelected={(event, props) => this.onSuggestionSelected(event, props)}
          onSuggestionsClearRequested={() => {}}
          renderSuggestion={(props) => this.renderSuggestion(props)}
          getSuggestionValue={(props) => this.getSuggestionValue(props)}
          focusFirstSuggestion = {true}
          alwaysRenderSuggestions = {true}
          inputProps={inputProps}
        />
      </div>
    );
	}

	onChange(event, { newValue, method }) {
    console.log("on change", event, newValue, method)
		if (method !== "click") {
			this.setState({
	      value: newValue
	    });
		}
	}

	// Autosuggest will call this function every time you need to update suggestions.
	onSuggestionsFetchRequested({value}) {
		console.log("updating suggestions", value)

    this.setState({
      	suggestions: this.getSuggestions(value),
    });
	}

  onSuggestionSelected(event, {suggestion}) {
    console.log("selected", suggestion, event)

    console.log("dispatching action to set resource data")
    this.props.onSelect(suggestion, this.props.parent)
	}

	getSuggestions(value) {
    console.log("getting suggestions", value)
    const {data, type} = this.props
    if (!value) { return data }

    const inputValue = value.trim().toLowerCase();
	  const inputLength = inputValue.length;

    return data.filter(item => {
			if (type === "team") {
				return item.team_name.toLowerCase().indexOf(inputValue) > -1
			} else if (type === "user") {
				return item.name.toLowerCase().indexOf(inputValue) > -1
			} else {
				return item.title.toLowerCase().indexOf(inputValue) > -1
			}
    })
	}

	getSuggestionValue(value) {
    console.log("getting suggestion value", value)
    return value.title
	}

  renderSuggestion(item) {
		console.log(item)
		const {type} = this.props

		if (type === "user") {
	    return (
	      <div className="search__results-list__item">
					<SvgIcon name="user" />
	        <h5 className="search__results-list__item__title">{item.name}</h5>
					<h5 className="search__results-list__item__subheading">{item.email}</h5>
					<h5 className="search__results-list__item__subheading">{item.teams && item.teams.map((d, i) => i > 0 ? ', ' + d.team_name : d.team_name)}</h5>
	      </div>
    	)
		} else if (type === "team") {
			return (
	      <div className="search__results-list__item">
					<SvgIcon name="team" />
	        <h5 className="search__results-list__item__title">{item.team_name}</h5>
					<h5 className="search__results-list__item__subheading">{item.users && item.users.length + " Members"}</h5>
	      </div>
    	)
		} else if (type === "collection") {
			return (
	      <div className="search__results-list__item">
					<SvgIcon name="folder" />
	        <h5 className="search__results-list__item__title">{item.title}</h5>
					<h5 className="search__results-list__item__subheading">{"/" + item.path}</h5>
	      </div>
    	)
		} else {
			let iconName
			if (item.resource_type === "video") {
				iconName = "video"
			} else if (item.resource_type === "richtext") {
				iconName = "text"
			} else {
				iconName = "document"
			}
			return (
	      <div className="search__results-list__item">
					<SvgIcon name={iconName} />
	        <h5 className="search__results-list__item__title">{item.title}</h5>
	      </div>
    	)
		}

	}
}

class SearchContainer extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		const {type, data, fetchItemList} = this.props
		console.log(data)
		if (!data) {
			fetchItemList()
		}
	}

	render() {
		const {data, onSelect} = this.props;
    if (data) {
      return <Search {...this.props} />
    } else {
      return <h5>Loading Users</h5>
    }
	}

}

const mapStateToProps = (state, ownProps) => {
	console.log(ownProps)
	const {type} = ownProps

	if (type === 'user') {
		return {
			parent: state.currTeam,
	    data: state.userList && !ownProps.showAll ? state.userList.filter(d => d.teams && d.teams.findIndex(team => team._id === state.currTeam._id) < 0) : state.userList
	  }
	} else if (type === 'team') {
		return {
			parent: state.currUser ? state.currUser.permissions : null,
	    data: state.teamList && !ownProps.showAll ? state.teamList.filter(d => d.users && d.users.indexOf(state.currUser.permissions._id) < 0) : state.teamList
	  }
	} else if (type === 'collection') {
		return {
			parent: null,
	    data: state.collectionList
	  }
	} else {
		return {
			parent: null,
	    data: state.resourceList
	  }
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	console.log(ownProps)
	const {type} = ownProps

	if (type === 'user') {
		return {
			fetchItemList: () => {
	      dispatch(fetchUserList())
	    },
			// onSelect: (user, team) => {
			// 	dispatch(addUserToTeam(user, team))
			// }
	  }
	} else if (type === 'team') {
		return {
			fetchItemList: () => {
	      dispatch(fetchTeamList())
	    },
			// onSelect: (team, user) => {
			// 	dispatch(addUserToTeam(user, team))
			// }
	  }
	} else if (type === 'collection') {
		return {
			fetchItemList: () => {
	      dispatch(fetchCollectionList())
	    },
		}
	} else {
		return {
			fetchItemList: () => {
	      dispatch(fetchResourceList())
	    },
		}
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
