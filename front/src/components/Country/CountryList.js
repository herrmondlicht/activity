import React from 'react'
import CountryDetails from './CountryDetails';
import { array } from 'prop-types';


const createCountryList = () => {
  const CountryList = ({ data = [] }) => (
    <div>
      {Array.isArray(data) && data.map(country => (
        <div style={{marginBottom:'20px'}}>
        {console.log(country)}
          <CountryDetails data={country} />
        </div>
      ))}
    </div>
  )

  CountryList.propTypes = {
    data: array
  }

  return CountryList
}


export default createCountryList()