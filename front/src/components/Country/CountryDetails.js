import React from 'react'
import propTypes from 'prop-types'
import styles from './styles/CountryDetails.css'
import CountryDetailsField from './CountryDetailsField';

export const createCountryDetails = (React) => {
  
  const CountryDetails = ({ data }) =>
    <div className={styles['country-details']}>
      <div className={styles['country-details__flag-container']}>
        <img src={data.flag} className={styles['country-details__flag-container__flag']} alt="flag" />
      </div>
      <div className={styles['country-details__body']}>
        <div className={styles['country-details__body__block']}>
          <CountryDetailsField value={data.name} title={'Name'} />
          <CountryDetailsField value={data.capital} title={'Capital'} />
          <CountryDetailsField value={data.region} title={'Region'} />
        </div>
        <div className={styles['country-details__body__block']}>
          <CountryDetailsField value={data.population} title={'Population'} />
          <CountryDetailsField value={data.demonym} title={'Demonym'} />
          <CountryDetailsField value={data.currencies && data.currencies[0] && data.currencies[0].name} title={'Main Currency'} />
        </div>

      </div>
    </div>

  return CountryDetails

}

export default createCountryDetails(React)