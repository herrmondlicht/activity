import express from 'express'

import countryRoutes from "./routes/countries.routes";

let router = express.Router();

router.use('/countries', countryRoutes({ router }))

export default router