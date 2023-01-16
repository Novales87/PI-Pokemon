import axios from "axios";

export function getAllPokemons(){
    return async (dispatch) => {
        const res = await axios("http://localhost:3001/pokemons");
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
    if(!/^[a-zA-Z0-9]+$/.test(pokemonId)) {
    try {
    const response = await axios.delete(`http://localhost:3001/pokemons/${pokemonId}`);
    if (response.status === 200) {
    alert("Pokemon eliminado exitosamente");
    }
    dispatch({ type: "DELETE_POKEMON", payload: pokemonId });
    } catch (error) {
    alert("Error al eliminar Pokemon");
    }
    }else{
    dispatch({ type: "DELETE_POKEMON", payload: pokemonId });
    }
    }
    }


