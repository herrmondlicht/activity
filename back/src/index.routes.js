import express from 'express'

import countryRoutes from "./modules/countries/countries.routes";
import reelRoutes from "./modules/reel-game/reel.routes";

let router = express.Router();

router.use('/countries', countryRoutes())
router.use('/reel', reelRoutes())

export default router