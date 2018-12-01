import fetch from 'isomorphic-fetch'

export default ({ fetchCountriesAPI = _fetchCountriesAPI } = {}) => (
  {
    getCountryByName: (req, res) => {
      const { params: { name }, query } = req;
      const paramsToCountryAPI = `name/${name}`
      fetchCountriesAPI({ params: paramsToCountryAPI, query })
        .then(country => res.status(200).json(country))
    },
    getCountryWithNamesInArray: () => { },
    getCountriesList: () => {

    }
  }
)

/*
I guess it's not necessary to write unit tests for the function below. This has to be an integration test.
 */
const _fetchCountriesAPI = ({
  countriesAPIEndpoint = process.env.COUNTRIES_ENDPOINT,
  params,
  query } = {}) => {
  const endpoint = makeAPIEndpoint(countriesAPIEndpoint)(params)(query)
  const request = createRequest('GET')

  return fetch(endpoint, request)
    .then(res => res.json())
}

export const makeAPIEndpoint =
  (endpoint) =>
    (params) =>
      (queryParamsObject = {}) => {
        const query = Object
          .keys(queryParamsObject)
          .reduce((prev, nextKey) => `${prev}${nextKey}=${queryParamsObject[nextKey]}&`, '?')
        return `${endpoint}/${params}${query}`
      }

export const createRequest = (method) => ({
  method,
  headers: new Headers({
    'Content-Type': 'application/json',
  })
});


