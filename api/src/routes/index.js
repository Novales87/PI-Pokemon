const { Router } = require('express');
const  getAllTypes  = require('./allTypesRoute');

const allPokemonsRoutes = require('./allPokemonsRoutes.js');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemon', allPokemonsRoutes )
router.use('/types', getAllTypes )

module.exports = router;
