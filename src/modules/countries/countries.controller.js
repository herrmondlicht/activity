import fetch from 'isomorphic-fetch'

export default (
  { fetchCountriesAPI = _fetchCountriesAPI,
    returnResponse = _returnResponse,
    createPromiseNameArray = _createPromiseNameArray,
    removeErrorsFromArray = _removeErrorsFromArray } = {}) => (
    {
      getCountryByName: async (req, res) => {
        const { params: { name }, query } = req;
        const paramsToCountryAPI = `name/${name}`
        const responseFromAPI = await fetchCountriesAPI({ params: paramsToCountryAPI, query })
        return returnResponse(responseFromAPI, res)
      },
      getCountryWithNamesInArray: (req, res) => {
        const { search, searchFullText } = req.query
        const castedSearch = JSON.parse(search)
        const promiseArray = createPromiseNameArray(castedSearch.nameArray, searchFullText)
        Promise.all(promiseArray)
          .then(response => returnResponse(removeErrorsFromArray(response.flat()), res))
      },
      getCountriesList: async (req, res) => {
        const params = 'all'
        const responseFromAPI = await fetchCountriesAPI({ params })
        return returnResponse(responseFromAPI, res)
      }
    }
  )

const _returnResponse = (value, res) => res.status(200).json(value)

const _createPromiseNameArray = (nameArray, searchFullText) =>
  nameArray.map(name => {
    return _fetchCountriesAPI({ params: `name/${name}`, query: { fullText: searchFullText } })
  })

const _removeErrorsFromArray = (array) => array.filter(item => !item.status)

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


