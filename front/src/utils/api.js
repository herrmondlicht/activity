
export default ({ API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT, getFromServer = fetch } = {}) => ({
  searchCountryByName: ({ name = '' }) => {
    const endpoint = `${API_ENDPOINT}/countries/${name}`;
    return getFromServer(endpoint)
      .then(res => res.json())
  }
})