import React from 'react'
import propTypes from 'prop-types'

import getApiHandler from '../../utils/api'
import SearchBar from "../SearchBar";
import styles from './styles/CountryQuestion.css'
import { Checkbox, LinearProgress } from '@material-ui/core';
import CountryList from '../Country/CountryList';
import CustomAppBar from '../CustomAppBar';

export const createCountryQuestion = ({ APIHandler = getApiHandler() } = {}) => {

  class CountryQuestion extends React.Component {

    static propTypes = {}

    state = {
      data: [],
      searchFullText: false,
      isFetching: false
    }

    toggleLoading = (value) => this.setState({ isFetching: value })


    triggerSearch = (name, searchFullText = this.state.searchFullText) =>
      name
        ? this.setState({ isFetching: true }, () => this.searchMultipleCountryNames(name, searchFullText))
        : this.setState({ isFetching: true }, this.callRetrieveAllAPI)

    treatNameArray = (name) => name.split(';').map(str => str.trim())

    searchMultipleCountryNames = async (name, searchFullText) => {
      const nameArray = this.treatNameArray(name)
      const queryObject = { nameArray }

      const responseData = await this.callSearchAPI(queryObject, searchFullText)
      return this.setState({ data: responseData, isFetching: false })
    }

    callSearchAPI = async (queryObject, searchFullText) => {
      return await APIHandler.searchMultipleCountriesName({
        queryObject,
        fullText: searchFullText
      })
    }

    callRetrieveAllAPI = () => APIHandler.getAllCountries().then(data => this.setState({ data, isFetching: false }))

    componentDidMount = () => this.triggerSearch()

    handleSearchFullText = event =>
      this.setState({ searchFullText: event.target.checked });

    render() {
      const { searchFullText, isFetching, data } = this.state
      return (
        <div className='container'>
          {/* the repetition of this header component is known, 
          I made it this way so it wouldn't impact the development on other features due time
          This though, for an application this size is not that bad */}
          <CustomAppBar title={'Question One '} />
          <div className={'page-container-content'}>
            <div className={styles['question-one-page']}>
              <SearchHeader
                searchMultipleCountryNames={this.triggerSearch}
                searchFullText={searchFullText}
                handleSearchFullText={this.handleSearchFullText}
              />
              <div className={styles['question-one-page__details']}>
                {isFetching &&
                  <LinearProgress />}
                {data && <CountryList data={data} />}
              </div>
            </div >
          </div>

        </div>

      )
    }
  }

  return CountryQuestion

}


/**
 * I wouldn't put this component in it's own file yet, since it's only been used by QuestionOne and has no state
 */
const SearchHeader = ({ searchMultipleCountryNames, searchFullText, handleSearchFullText }) => (
  <div className={styles['question-one-page__search-bar-container']}>
    <div>
      Enter your input below and press enter to trigger the search.<br />
      If you want to search multiple countries, please divide them using ";"
    </div>
    <div className={styles['question-one-page__search-bar-container__search-bar']}>
      <SearchBar searchFor={searchMultipleCountryNames} />
      <div>
        <Checkbox
          checked={searchFullText}
          onChange={handleSearchFullText}
        />
        Search Full Text
      </div>
    </div>
  </div>
)

export default createCountryQuestion()