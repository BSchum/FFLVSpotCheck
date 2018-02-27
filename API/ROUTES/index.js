const router = require('express').Router();

router.use('/spot', require('./spot.js'));
router.use('/pratique', require('./pratique.js'));
router.use('/weather', require('./weather.js'));

module.exports = router;