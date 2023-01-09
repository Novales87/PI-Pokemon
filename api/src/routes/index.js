const { Router } = require('express');

const allPokemonsRoutes = require('./allPokemonsRoutes.js');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemon', allPokemonsRoutes )

module.exports = router;
