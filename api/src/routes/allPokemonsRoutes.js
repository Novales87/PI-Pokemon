const { Router } = require('express');
const { getPokemons, savePokemon, getPokemonById  } = require('../controllers/pokemonControllers');
const router = Router();

router.get('/', getPokemons )
router.post('/', savePokemon)
router.get('/', getPokemonById)



module.exports = router;
