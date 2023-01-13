const { Router } = require('express');
const { getAllTypes, createType } = require('../controllers/typesControllers');

const router = Router();

router.get('/', getAllTypes )
router.post('/', createType )


module.exports = router;
