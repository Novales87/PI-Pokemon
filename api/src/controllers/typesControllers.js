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

async function createType(req, res, next) {
  try {
    // Obtenemos el tipo del cuerpo de la solicitud
    const newType = req.body.type;

    // Verificamos si el tipo ya existe en la tabla
    const typeFromDB = await Types.findOne({ where: { name: newType }});
    if (!typeFromDB) {
      // Si el tipo no existe, lo insertamos en la tabla
      await Types.create({ name: newType });
      // Obtenemos todos los tipos de la tabla y los enviamos como respuesta
      const typesFromDB = await Types.findAll();
      res.send({message: "Tipo creado con éxito", types: typesFromDB});
    } else {
      // Si el tipo ya existe, enviamos una respuesta de error
      res.status(409).send({ error: "Tipo ya existente" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}




module.exports = {
  getAllTypes, createType
};
