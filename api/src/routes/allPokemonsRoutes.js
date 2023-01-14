const { Router } = require('express');
const { getPokemons, savePokemon, getPokemonById,getPokemonByName, deletePokemonById  } = require('../controllers/pokemonControllers');
const router = Router();

router.get('/', getPokemons )
router.post('/', savePokemon)
router.get('/:id', getPokemonById)
router.delete('/:id', deletePokemonById);
router.get('/name/:name', getPokemonByName);

module.exports = router;
