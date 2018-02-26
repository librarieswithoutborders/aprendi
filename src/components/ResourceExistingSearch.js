import React, { Component } from 'react';
import SvgIcon from './SvgIcon'
import Autosuggest from 'react-autosuggest';

class ResourceExistingSearch extends Component {
	constructor(props) {
		super(props);

		this.state = {
  		value: '',
  		suggestions: this.props.resources,
    };
	}

	render() {
		const { value, suggestions } = this.state;

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
    this.props.onSelect(suggestion)
	}

	getSuggestions(value) {
    console.log("getting suggestions", value)
    const {resources} = this.props
    if (!value) { return resources }

    const inputValue = value.trim().toLowerCase();
	  const inputLength = inputValue.length;

    return resources.filter(resource => {
      return resource.title.indexOf(inputValue) > -1
    })

	}

	getSuggestionValue(value) {
    console.log("getting suggestion value", value)
    return value.title
	}

  renderSuggestion({title, resource_type, updatedAt}) {
		let iconName;

		if (resource_type === "video") {
			iconName = "video"
		} else if (resource_type === "richtext") {
			iconName = "text"
		} else {
			iconName = "document"
		}
    return (
      <div className="search__results-list__item">
				<SvgIcon name={iconName} />
        <h5 className="search__results-list__item__title">{title}</h5>
				<h5 className="search__results-list__item__subheading">{"Last Updated: " + updatedAt}</h5>
      </div>
    )

	}
}

export default ResourceExistingSearch
