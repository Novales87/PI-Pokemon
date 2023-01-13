const axios = require('axios');
const { Pokemon , Types } = require("../db.js");
const headers = {
  headers: {
      "accept-encoding": null,/* "accept-encoding" es una cabecera HTTP que se utiliza para indicar al servidor qué tipos de codificación de contenido son aceptables para el cliente. Cuando se establece en "null", se está indicando al servidor que no se acepta ningún tipo de codificación de contenido. Esto significa que el servidor debe enviar la respuesta sin utilizar ningún tipo de compresión, lo que puede resultar en un tamaño de respuesta más grande.*/
  }
}





async function getPokemons (req, res, next) {
  try {
    // Obtenemos los Pokémones de la base de datos
    const pokemonsFromDB = await Pokemon.findAll({
      include: [{
        model: Types,
        attributes: ['name']
      }]
    });

    // Procesamos los pokemons de la base de datos para que tengan el mismo formato que los de la API
    const formattedPokemonsFromDB = pokemonsFromDB.map(pokemon => {
      return {
        name: pokemon.name,
        types: pokemon.types.map(type => type.name),
        image: pokemon.image,
        id: pokemon.id,
        attack: pokemon.attack
      }
    });

    // Hacemos una solicitud a la API para obtener los Pokémones
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40', headers);

    // Procesamos la respuesta de la API y extraemos los nombres y URL de los Pokémones
    const pokemonData = response.data.results;

    // Hacemos una solicitud a la URL de cada Pokémon para obtener sus detalles
    const pokemonDetails = await Promise.all(pokemonData.map(async pokemon => {
      const detailsResponse = await axios.get(pokemon.url, headers);
      return {
        name: pokemon.name,
        types: detailsResponse.data.types.map(type => type.type.name),
        image: detailsResponse.data.sprites.other.dream_world.front_default,
        id: detailsResponse.data.id,
        attack: detailsResponse.data.stats[1].base_stat
      };
    }));

    // Concatenamos los Pokémones de la base de datos con los que vienen de la API
    const allPokemons = pokemonsFromDB.map(pokemon => {
      return {
      name: pokemon.name,
      types: pokemon.types.map(type => type.name),
      image: pokemon.image,
      id: pokemon.id,
      attack: pokemon.attack,
      }
      }).concat(pokemonDetails);
      res.send(allPokemons);
    } catch (error) {
      // Manejamos cualquier error que ocurra durante la solicitud
      next(error);
      }
      }


async function savePokemon(req, res) {
  try {
      const { name, hp, attack, defense, speed, height, weight, image, typeIds } = req.body;
      // Crear el Pokemon
      const newPokemon = await Pokemon.create({ name, hp, attack, defense, speed, height, weight, image });
      // agregar relaciones con los tipos
      await newPokemon.addTypes(typeIds);
      res.json({ message: 'Pokemon created successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error', error });
  }
}

async function getPokemonById (req, res, next) {
  try {
    // Obtenemos el ID del Pokémon de la ruta
    const id = req.params.id;
console.log(id);
    // buscamos el Pokemon en la base de datos
    const pokemonFromDB = await Pokemon.findByPk(id, {
      include: [{
        model: Types,
        attributes: ['name']
      }]
    });
    
    let pokemon = {};
    if(pokemonFromDB) {
        // Procesamos los pokemons de la base de datos para que tengan el mismo formato que los de la API
        pokemon = {
          name: pokemonFromDB.name,
          types: pokemonFromDB.types.map(type => type.name),
          image: pokemonFromDB.image,
          id: pokemonFromDB.id,
          attack: pokemonFromDB.attack
        }
    } else {
        // Hacemos una solicitud a la API para obtener los Pokémones
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`, headers);
        // Procesamos la respuesta de la API y extraemos los nombres y URL de los Pokémones
        pokemon = {
          name: response.data.name,
          types: response.data.types.map(type => type.type.name),
          image: response.data.sprites.front_default,
          id: response.data.id,
          attack: response.data.stats[1].base_stat
        };
    }
    res.send(pokemon);
  } catch (error) {
    // Manejamos cualquier error que ocurra durante la solicitud
    next(error);
  }
}



module.exports = {
  getPokemons, savePokemon, getPokemonById
};



