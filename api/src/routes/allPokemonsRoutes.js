const { Router } = require('express');
const { getPokemons, savePokemon, getPokemonById,getPokemonByName  } = require('../controllers/pokemonControllers');
const router = Router();

//router.get('/', getPokemons )
//router.post('/', savePokemon)
//router.get(':id', getPokemonById)
//router.get('/pokemons/:id', getPokemons.getPokemonById)

router.get('/', getPokemons )
router.post('/', savePokemon)
router.get('/:id', getPokemonById)
router.get('/name/:name', getPokemonByName);
module.exports = router;
