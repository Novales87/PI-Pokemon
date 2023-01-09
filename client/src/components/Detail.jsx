import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import style from './Detail.module.css' 
import Cargando from '../images/cargando.gif'
const Detail = () => {
  const { id } = useParams(); // Obtienes el id de la ruta (ej. /pokemon/1)
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => {
        setPokemon(response.data);
        
      })
      .catch(error => {
        setError(error);
      });
  }, [id]);

  if (error) {
    return <div className={style.Detail_container}>
    <h1>Pokemon {id} {error.response.data }</h1>
    <Link to='/home'>
    <button>Home</button>
    </Link>
    </div>
  }


  if (!pokemon) {
    return <div>
    <img style={{ width: '100%', paddingleft: 'auto', paddingright: 'auto'} }  src={Cargando} alt="cargando"/>
    <p style={{ color: 'white' }}>Cargando información del Pokémon...</p>;
    </div>
  }

  return (
    <div className={style.Detail_container}>
    <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
    <div className={style.Detail_info}>
    <img src={pokemon.sprites.other.home.front_default} alt={pokemon.id}/>
    <ul>
     <li>Id: {pokemon.id}</li>
     <li>Altura: {pokemon.height}</li>
     <li>Peso: {pokemon.weight} </li>
     <li>Types: {pokemon.types.map(el => el.type.name).join(', ')}</li>
     <li>hp: {pokemon.stats[0].base_stat} </li>
     <li> attack: {pokemon.stats[1].base_stat}</li>
     <li>defense: {pokemon.stats[2].base_stat}</li>
     <li> speed: {pokemon.stats[5].base_stat}</li>
     </ul>
     </div>
    <Link to='/home'>
<button>Home</button>
</Link>
    </div>
  );
};

export default Detail;


