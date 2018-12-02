
export default ({ API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT, getFromServer = fetch } = {}) => ({

  searchCountryByName: ({ name = '', searchFullText = false }) => {
    const endpoint = `${API_ENDPOINT}/countries/${name}?fullText=${searchFullText}`;
    return getFromServer(endpoint)
      .then(res => res.json())
  },

  searchMultipleCountriesName: ({ queryObject, fullText }) => {
    const strQueryObject = JSON.stringify(queryObject)
    const endpoint = `${API_ENDPOINT}/countries/multiple?search=${strQueryObject}&searchFullText=${fullText}`;
    return getFromServer(endpoint)
      .then(res => res.json())
  },

  getAllCountries: () => {
    const endpoint = `${API_ENDPOINT}/countries`;
    return getFromServer(endpoint)
      .then(res => res.json())
  },

  spinTheWheel: () => {
    const endpoint = `${API_ENDPOINT}/reel/spin`;
    return getFromServer(endpoint)
      .then(res => res.json())
  }

})