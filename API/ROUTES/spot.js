const router = require('express').Router();
const spotC = require('../CONTROLLERS/spotcontroller');

router.post('/', spotC.createSpot);

router.put('/:id', spotC.updateSpot);

router.get('/:id', spotC.readSpot);

router.get('/', spotC.readAllSpot);

router.delete('/:id', spotC.deleteSpot);
module.exports = router;