
export default ({ API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT, getFromServer = fetch } = {}) => ({
  searchCountryByName: ({ name = '', searchFullText = false }) => {
    const endpoint = `${API_ENDPOINT}/countries/${name}?fullText=${searchFullText}`;
    return getFromServer(endpoint)
      .then(res => res.json())
  }
})