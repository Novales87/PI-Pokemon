import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import style from './Detail.module.css' 
import Cargando from '../images/cargando.gif'

const Detail = () => {
  const { id } = useParams(); 
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let url = '';
    if (!isNaN(id)) {
      url = `http://localhost:3001/pokemons/${id}`;
    } else if(/^[a-zA-Z-]+$/.test(id)) {
      url = `http://localhost:3001/pokemons/name/${id}`;
    }else {
      url = `http://localhost:3001/pokemons/${id}`;
    }
    axios.get(url)
      .then(response => {
        setPokemon(response.data);
      })
      .catch(error => {
        setError(error);
      });
     
  }, [id]);


  if (error) {
    return <div className={style.Detail_container}>
    <h1>Pokémon " {id} " No encontrado o inexistente </h1>
    <p>{error.response.data }</p>
    <Link to='/home'>
    <button>Home</button>
    </Link>
    </div>
  }


  if (!pokemon) {
    return <div >
    <img style={{ width: '100%', paddingleft: 'auto', paddingright: 'auto'} }  src={Cargando} alt="cargando"/>
    <p style={{ color: 'white' }}>Cargando información del Pokémon...</p>;
    </div>
  }

  return (
    <div className={style.Detail_container}>
    <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
    <div className={style.Detail_info}>
    <img src={pokemon.image} alt={pokemon.id}/>
    <ul>
     <li>Id: {pokemon.id}</li>
     <li>Height: {pokemon.height}</li>
     <li>Weight: {pokemon.weight} </li>
     <li>Type: {pokemon.types.join(', ')}</li>
     <li>hp: {pokemon.hp} </li>
     <li> attack: {pokemon.attack} </li>
     <li>defense: {pokemon.defense} </li>
     <li> speed: {pokemon.speed}</li>
     </ul>
     </div>
    <Link to='/home'>
<button>Home</button>
</Link>
    </div>
  );
};

export default Detail;


