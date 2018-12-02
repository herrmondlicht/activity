import React from 'react'
import propTypes from 'prop-types'
import styles from './styles/CountryDetails.css'
import CountryDetailsField from './CountryDetailsField';

export const createCountryDetails = (React) => {


  class CountryDetails extends React.Component {

    static propTypes = {
      data: propTypes.object
    }



    render() {
      const { data } = this.props
      return (
        <div className={styles['country-details']}>
          <div className={styles['country-details__header']}>
            <img src={data.flag} className={styles['country-details__header__flag']} alt="flag" />
          </div>
          <div className={styles['country-details__body']}>
            <CountryDetailsField value={data.name} title={'Name'} />
            <CountryDetailsField value={data.capital} title={'Capital'} />
            <CountryDetailsField value={data.region} title={'Region'} />
            <CountryDetailsField value={data.population} title={'Population'} />
            <CountryDetailsField value={data.demonym} title={'Demonym'} />
            <CountryDetailsField value={data.currencies[0] && data.currencies[0].name} title={'Main Currency'} />
          </div>
        </div>
      )
    }

  }

  return CountryDetails

}

export default createCountryDetails(React)