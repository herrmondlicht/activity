import getCountryController from '../controllers/countries.controller'
import express from 'express'
export default ({ router = express.Router(), controller = getCountryController() } = {}) => {
  router.get('/countries/multiple', controller.getCountryWithNamesInArray)
  router.get('/countries/:name', controller.getCountryByName)
  return router
}