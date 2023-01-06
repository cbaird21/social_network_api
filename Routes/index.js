const router = require('express').Router();

// import all api routes from the api directory
const apiRoutes = require('./api');

// add prefix of '/api' to api routes
router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong routes!'));

module.exports = router;