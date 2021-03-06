import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
const dateFormat = require('dateformat');

import SvgIcon from './SvgIcon'

class ResourceExistingSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: this.props.resources
    };
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.resources && this.props.resources && nextProps.resources !== this.props.resources) {
    this.setState({
      value: '',
      suggestions: nextProps.resources.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      })
    })
    // }
  }

  render() {
    const {value, suggestions} = this.state;


    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.onChange.bind(this)
    };

    return (
      <div className="search">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={props => this.onSuggestionsFetchRequested(props)}
          onSuggestionSelected={(event, props) => this.onSuggestionSelected(event, props)}
          onSuggestionsClearRequested={() => {}}
          renderSuggestion={props => this.renderSuggestion(props)}
          getSuggestionValue={props => this.getSuggestionValue(props)}
          focusFirstSuggestion = {true}
          alwaysRenderSuggestions = {true}
          inputProps={inputProps}
        />
      </div>
    );
  }

  onChange(event, {newValue, method}) {
    if (method !== 'click') {
      this.setState({
        value: newValue
      });
    }
  }

  // Autosuggest will call this function every time you need to update suggestions.
  onSuggestionsFetchRequested({value}) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  onSuggestionSelected(event, {suggestion}) {
    this.props.onSelect(suggestion)
  }

  getSuggestions(value) {
    const {resources} = this.props
    if (!value) {
      return resources
    }

    const inputValue = value.trim().toLowerCase();

    return resources.filter(resource => resource.title.indexOf(inputValue) > -1)
  }

  getSuggestionValue(value) {
    return value.title
  }

  renderSuggestion({title, resource_type, updatedAt}) {
    let iconName;

    if (resource_type === 'video') {
      iconName = 'video'
    } else if (resource_type === 'richtext') {
      iconName = 'text'
    } else {
      iconName = 'document'
    }
    return (
      <div className="search__results-list__item">
        <SvgIcon name={iconName} />
        <h5 className="search__results-list__item__title">{title}</h5>
        <h5 className="search__results-list__item__subheading">{`Last Updated: ${dateFormat(updatedAt, 'm/d/yy - h:MM TT')}`}</h5>
      </div>
    )
  }
}

export default ResourceExistingSearch
