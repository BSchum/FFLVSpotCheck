const router = require('express').Router();
const pratiqueC = require('../CONTROLLERS/pratiquecontroller');

router.post('/', pratiqueC.createPratique);

router.put('/', pratiqueC.updatePratique);

router.post('/link', pratiqueC.linkSpotPratique);

router.get('/', pratiqueC.getAllPratique);

router.get('/:id', pratiqueC.getPratique);

router.delete('/:id', pratiqueC.deletePratique)

router.put('/', pratiqueC.updatePratique)



module.exports = router;