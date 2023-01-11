import axios from "axios";

export function getAllPokemons(){
    return async (dispatch) => {
        const res = await axios("http://localhost:3001/pokemon");
        return dispatch({ type: "GET_POKEMONS", payload: res.data });
    }
    
}

export function getAllTypes(){
  return async (dispatch) => {
      const res = await axios("http://localhost:3001/types");
      return dispatch({ type: "GET_TYPES", payload: res.data });
  }
  
}

export function deletePokemon(pokemonId) {
    return async (dispatch) => {
       // await axios.delete(`http://localhost:3001/pokemon/${pokemonId}`);
        return dispatch({ type: "DELETE_POKEMON", payload: pokemonId });
    }
}


