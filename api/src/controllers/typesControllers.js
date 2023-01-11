const axios = require('axios');
const { Types } = require("../db.js");

const headers = {
  headers: {
      "accept-encoding": null,
  }
}

async function getAllTypes(req, res, next){
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type", headers);
    // Iteramos sobre cada uno de los types que viene de la API
    const types = response.data.results.map(async type => {
      // Verificamos si el type ya existe en la tabla
      const typeFromDB = await Types.findOne({ where: { name: type.name }});
      if (!typeFromDB) {
        // Si el type no existe, lo insertamos
        await Types.create({ name: type.name });
      }
      return type;
    });
    // Obtenemos todos los types de la tabla y los enviamos como respuesta
    const typesFromDB = await Types.findAll();
    res.send(typesFromDB);
  } catch (error) {
    console.error(error);
    next(error)
  }
}



module.exports = {
  getAllTypes
};
