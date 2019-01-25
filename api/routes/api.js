const router = require('express').Router(),
    errorHandler = require('../utils/errors'),
    { catchErrors } = require('../utils/middleware'),
    api = require('../controllers/api')

// base route: /forecast

router
.post('/geo', catchErrors(api.geo))
.post('/location', catchErrors(api.location))
.post('/random', catchErrors(api.random))
.use(errorHandler)

module.exports = router