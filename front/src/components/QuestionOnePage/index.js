import React from 'react'
import propTypes from 'prop-types'

import getApiHandler from '../../utils/api'
import SearchBar from "../SearchBar";
import styles from './styles/QuestionOnePage.css'
import CountryDetails from '../Country/CountryDetails';
import { Checkbox, LinearProgress } from '@material-ui/core';

export const createQuestionOnePage = (React, { APIHandler = getApiHandler() } = {}) => {


  class QuestionOnePage extends React.Component {

    static propTypes = {}

    state = {
      data: [],
      searchFullText: false,
      isFetching: false
    }

    toggleLoading = (value) => this.setState({ isFetching: value })

    searchCountryByName = (name, searchFullText = this.state.searchFullText) => {
      const FETCHING_TRUE = true
      if (name) {
        this.toggleLoading(FETCHING_TRUE)
        return APIHandler.searchCountryByName({ name, searchFullText })
          .then(data => this.setState({ data, isFetching: !FETCHING_TRUE }))
      }
    }

    handleSearchFullText = event =>
      this.setState({ searchFullText: event.target.checked });

    render() {
      const result = this.state.data[0]
      const { searchFullText, isFetching } = this.state
      return (
        <div className={styles['question-one-page']}>
          <div className={styles['question-one-page__search-bar-container']}>
            <div>
              Enter your input below and press enter to trigger the search
            </div>
            <div className={styles['question-one-page__search-bar-container__search-bar']}>
              <SearchBar searchFor={this.searchCountryByName} />
              <div>
                <Checkbox
                  checked={searchFullText}
                  onChange={this.handleSearchFullText}
                />
                Search Full Text
              </div>
            </div>
          </div>
          <div className={styles['question-one-page__details']}>
            {result && <CountryDetails data={result} />}
            {isFetching &&
              <LinearProgress />}
          </div>
        </div >
      )
    }
  }

  return QuestionOnePage

}

export default createQuestionOnePage(React)