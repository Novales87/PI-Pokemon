const { Router } = require('express');
const { getPokemons, savePokemon  } = require('../controllers/pokemonControllers');
const router = Router();

router.get('/', getPokemons )
router.post('/', savePokemon)



module.exports = router;
