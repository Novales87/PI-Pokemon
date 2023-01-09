const { Router } = require('express');
const { getPokemons } = require('../controllers/pokemonControllers');
const router = Router();

router.use('/', getPokemons )


module.exports = router;
