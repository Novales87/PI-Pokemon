const { Router } = require('express');
const  getAllTypes  = require('./allTypesRoute');

const allPokemonsRoutes = require('./allPokemonsRoutes.js');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/types', getAllTypes )
router.use('/pokemon/:id',allPokemonsRoutes)
router.use('/pokemons', allPokemonsRoutes )
router.use('/pokemon/name?name', allPokemonsRoutes);

module.exports = router;
