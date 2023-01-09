const axios = require('Axios');
const headers = {
  headers: {
      "accept-encoding": null,/* "accept-encoding" es una cabecera HTTP que se utiliza para indicar al servidor qué tipos de codificación de contenido son aceptables para el cliente. Cuando se establece en "null", se está indicando al servidor que no se acepta ningún tipo de codificación de contenido. Esto significa que el servidor debe enviar la respuesta sin utilizar ningún tipo de compresión, lo que puede resultar en un tamaño de respuesta más grande.*/
  }
}



async function getPokemons (req, res, next) {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40', headers);

    // procesa la respuesta de la API y extrae los nombres y URL de los Pokémon
    const pokemonData = response.data.results;

    // hace una solicitud a la URL de cada Pokémon para obtener sus detalles
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

    // envía los nombres, tipos e imagens de los Pokémones al cliente
    res.send(pokemonDetails);
  } catch (error) {
    // maneja cualquier error que ocurra durante la solicitud
    res.send(error);
    next(error);
  }
}




module.exports = {
  getPokemons
};



