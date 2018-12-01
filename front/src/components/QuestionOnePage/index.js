import React from 'react'
import propTypes from 'prop-types'

import getApiHandler from '../../utils/api'
import SearchBar from "../SearchBar";
import styles from './styles/QuestionOnePage.css'

export const createQuestionOnePage = (React, { APIHandler = getApiHandler() } = {}) => {


  class QuestionOnePage extends React.Component {

    static propTypes = {}

    state = {
      data: []
    }

    searchCountryByName = (name) =>
      name && APIHandler.searchCountryByName({ name })
        .then(data => this.setState({ data }))

    render() {
      return (
        <div>
          <SearchBar searchFor={this.searchCountryByName} />
          <div>
            {this.state.data.map(s => <div>{s.name}</div>)}
          </div>
        </div>
      )
    }

  }

  return QuestionOnePage

}

export default createQuestionOnePage(React)