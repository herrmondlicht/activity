import getCountryController from './countries.controller'
import express from 'express'
export default ({ router = express.Router(), controller = getCountryController() } = {}) => {
  router.get('/multiple', controller.getCountryWithNamesInArray)
  router.get('/:name', controller.getCountryByName)
  router.get('/', controller.getCountriesList)
  return router
}