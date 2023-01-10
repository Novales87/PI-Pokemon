const axios = require('Axios');
const headers = {
  headers: {
      "accept-encoding": null,
  }
}

async function getAllTypes(req, res, next){
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type", headers);
    res.send(response.data.results);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAllTypes
};
