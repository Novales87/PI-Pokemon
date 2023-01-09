import axios from "axios";

export function getAllPokemons(){
    return async (dispatch) => {
        const res = await axios("http://localhost:3001/pokemon");
        return dispatch({ type: "GET_POKEMONS", payload: res.data });
    }
    
}

export function getAllTypes(){
  return async (dispatch) => {
      const res = await axios("https://pokeapi.co/api/v2/type");
      return dispatch({ type: "GET_TYPES", payload: res.data });
  }
  
}