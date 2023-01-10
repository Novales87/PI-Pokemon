const { Router } = require('express');
const { getAllTypes } = require('../controllers/typesControllers');

const router = Router();

router.use('/', getAllTypes )


module.exports = router;
