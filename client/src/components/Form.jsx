import React from 'react';
import style from './Form.module.css';
import { Link } from 'react-router-dom';
const PokemonForm = () => {
  const [name, setName] = React.useState('');
  const [types, setTypes] = React.useState('');
  const [id, setId] = React.useState('');
  const [stats, setStats] = React.useState({
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
  });
  const [height, setHeight] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [image, setImage] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // aquí puedes enviar los datos del formulario a tu servidor o hacer cualquier otra cosa que necesites hacer con ellos
    console.log(name, types, id, stats, weight, height, image)
    alert(`Pokemon creado con el nombre: ${name} id: ${id}`);
  };

  return (
    <div className={style.Padre}>
    <div className={style.Form}>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="types">Tipos:</label>
      <input
        type="text"
        id="types"
        value={types}
        onChange={(e) => setTypes(e.target.value)}
      />

      <label htmlFor="id">Número de Pokémon (ID):</label>
      <input
        type="text"
        id="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <fieldset>
        <legend>Estadísticas</legend>
        <label htmlFor="hp">Vida:</label>
        <input
          type="number"
          id="hp"
          value={stats.hp}
          onChange={(e) => setStats({ ...stats, hp: e.target.value })}
        />

        <label htmlFor="attack">Ataque:</label>
        <input
          type="number"
          id="attack"
          value={stats.attack}
          onChange={(e) => setStats({ ...stats, attack: e.target.value })}
        />

        <label htmlFor="defense">Defensa:</label>
        <input
          type="number"
          id="defense"
          value={stats.defense}
          onChange={(e) => setStats({ ...stats, defense: e.target.value })}
        />

        <label htmlFor="speed">Velocidad:</label>
        <input
          type="number"
          id="speed"
          value={stats.speed}
          onChange={(e) => setStats({ ...stats, speed: e.target.value })}
        />
      </fieldset>

      <label htmlFor="height">Altura:</label>
<input
  type="number"
  id="height"
  value={height}
  onChange={(e) => setHeight(e.target.value)}
/>

<label htmlFor="weight">Peso:</label>
<input
  type="number"
  id="weight"
  value={weight}
  onChange={(e) => setWeight(e.target.value)}
/>

<label htmlFor="image">Imagen:</label>
<input
  type="text"
  id="image"
  value={image}
  onChange={(e) => setImage(e.target.value)}
/>

<button type="submit">Crear Pokémon</button>
</form>

</div>
<Link to='/home'>
<button>Home</button>
</Link>
</div>)};
export default PokemonForm;