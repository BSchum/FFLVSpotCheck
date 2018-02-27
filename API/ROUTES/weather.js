const router = require('express').Router();
const weatherC = require('../CONTROLLERS/weathercontroller.js');

router.put('/', weatherC.updateWeather)
router.get('/:id', weatherC.getWeather)
router.get('/flyable/:id', weatherC.checkWeather)
router.post('/name', weatherC.getWeatherByName)

module.exports = router;