import React, { Component } from 'react';
import SvgIcon from './SvgIcon'
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux'
import { fetchUserList, fetchTeamList, fetchCollectionList, fetchResourceList, addUserToTeam, updateUser } from '../actions/actions.js';


class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
  		value: '',
  		suggestions: this.props.data,
			extendedView: null
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
		const { value, suggestions, extendedView } = this.state;

		console.log(suggestions)

		console.log(this.props.data)

		console.log(extendedView)

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
		const { extendedView } = this.state

		if (this.props.onSelect) {
    	this.props.onSelect(suggestion, this.props.parent)

			this.setState({
				value: '',
				suggestions: this.props.data
			})

		} else {
			this.setState({
				extendedView: extendedView === suggestion ? null : suggestion
			})
		}
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
		const {type, changeUserPermissions, showAll} = this.props
		const {extendedView} = this.state

		if (type === "user") {
	    return (
	      <div className={extendedView && extendedView._id === item._id ? "search__results-list__item extended" : "search__results-list__item"}>
					<div className="search__results-list__item__listing">
						<SvgIcon name="user" />
		        <h5 className="search__results-list__item__title">{item.name}</h5>
						<h5 className="search__results-list__item__subheading">{item.email}</h5>
					</div>
					<div className="search__results-list__item__extended-view">
						{extendedView && extendedView._id === item._id &&
							<div className="search__results-list__item__extended-view__contents">
								<div className="search__results-list__item__extended-view__field">
									<h5 className="search__results-list__item__extended-view__field__label">Teams:</h5>
									<h5 className="search__results-list__item__extended-view__field__value">{item.teams && item.teams.map((d, i) => i > 0 ? ', ' + d.team_name : d.team_name)}</h5>
								</div>
								<div className="search__results-list__item__extended-view__field">
									<h5 className="search__results-list__item__extended-view__field__label">Joined Date:</h5>
									<h5 className="search__results-list__item__extended-view__field__value">{item.created_at}</h5>
								</div>
								<div className="search__results-list__item__extended-view__field">
									<h5 className="search__results-list__item__extended-view__field__label">Core Admin:</h5>
									<h5 className="search__results-list__item__extended-view__field__value">{String(item.core_admin)}</h5>
								</div>
								{!item.core_admin &&
									<div className="search__results-list__item__extended-view__button button" onClick={() => { changeUserPermissions({_id: item._id, core_admin: !item.core_admin}) }} >Give Core Admin Permissions</div>
								}
							</div>
						}
					</div>
				</div>
    	)
		} else if (type === "team") {
			return (
	      <div className="search__results-list__item">
					<div className="search__results-list__item__listing">
						<SvgIcon name="team" />
		        <h5 className="search__results-list__item__title">{item.team_name}</h5>
						<h5 className="search__results-list__item__subheading">{item.users && item.users.length + " Members"}</h5>
					</div>
				</div>
    	)
		} else if (type === "collection") {
			return (
	      <div className="search__results-list__item">
					<div className="search__results-list__item__listing">
						<SvgIcon name="folder" />
		        <h5 className="search__results-list__item__title">{item.title}</h5>
						<h5 className="search__results-list__item__subheading">{item.team.team_name}</h5>
						<h5 className="search__results-list__item__subheading right">{"/" + item.path}</h5>
					</div>
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
					<div className="search__results-list__item__listing">
						<SvgIcon name={iconName} />
		        <h5 className="search__results-list__item__title">{item.title}</h5>
						{showAll && item.team && item.team.team_name &&
							<h5 className="search__results-list__item__subheading">{item.team.team_name}</h5>
						}
					</div>
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
			changeUserPermissions: (userInfo) => {
				dispatch(updateUser({data: userInfo}))
			}
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
