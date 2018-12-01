import getCountryController from '../controllers/countries.controller'
import express from 'express'
export default ({ router = express.Router(), controller = getCountryController() } = {}) => {
  router.get('/countries/:name', controller.getCountryByName)
  return router
}