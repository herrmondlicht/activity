import getReelController from './reel.controller'
import express from 'express'
export default ({ router = express.Router(), controller = getReelController() } = {}) => {
  router.get('/spin', controller.runReel)
  return router
}