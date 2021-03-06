import React from 'react'
import propTypes from "prop-types";
import { TextField } from '@material-ui/core';

export const createSearchBar = (React) => {


  class SearchBar extends React.Component {

    static propTypes = {
      searchFor: propTypes.func.isRequired
    }

    state = {
      textInput: ''
    }

    setTextInput = (event) => this.setState({ textInput: event.target.value });

    handleTextFieldEnter = ({ key }) =>
      key === 'Enter' && this.props.searchFor(this.state.textInput);


    render() {
      return (
        <TextField
          style={{ height: '100%', flexGrow: 1 }}
          value={this.state.textInput}
          onKeyPress={this.handleTextFieldEnter}
          onChange={this.setTextInput}
        />
      )
    }
  }

  return SearchBar

}

export default createSearchBar(React)