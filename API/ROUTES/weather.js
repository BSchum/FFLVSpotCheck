const router = require('express').Router();
const weatherC = require('../CONTROLLERS/weathercontroller.js');

router.put('/',               weatherC.updateWeather)
router.get('/:id',            weatherC.getWeather)
router.get('/',               weatherC.getWeathers)
router.get('/flyable/:id',    weatherC.checkWeather)
router.post('/flyable/name/', weatherC.checkWeatherByName)
router.post('/name',          weatherC.getWeatherByName)

module.exports = router;