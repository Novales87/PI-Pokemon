
const initialState = {
    pokemons: [],
    types: [],
  };
  
  function reducer(state = initialState, { type, payload }) {
    switch (type) {
      case 'GET_POKEMONS':
        return {
          ...state,
          pokemons: payload,
        };
      case 'GET_TYPES':
        return {
          ...state,
          types: payload,
        };
     
      default:
        return state;
    }
  }
  
  export default reducer;