const router = require('express').Router();
const pratiqueC = require('../CONTROLLERS/pratiquecontroller');

router.post('/', pratiqueC.createPratique);

router.post('/link', pratiqueC.linkSpotPratique);

router.get('/', pratiqueC.getAllPratique);

router.get('/:id', pratiqueC.getPratique);

router.delete('/:id', pratiqueC.deletePratique)



module.exports = router;