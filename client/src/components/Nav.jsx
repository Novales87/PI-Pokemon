import React, { useState } from 'react';
import style from './Nav.module.css';
import Logo from '../images/poke.png';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';




function Nav() {
  
 
  // Inicializamos el estado del input de búsqueda con un string vacío
  const [inputValue, setInputValue] = useState('');
  // Obtenemos acceso a la historia del navegador
  const history = useHistory();

  // Esta función se ejecuta al enviar el formulario de búsqueda
  const handleSubmit = (event) => {
    // Prevenimos que se envíe el formulario y se recargue la página
    event.preventDefault();
    // Redirigimos a la ruta '/pokemon/:id' con el valor del input en minúsculas
    // como parámetro 'id'
    history.push(`/pokemon/${inputValue.toLowerCase()}`)
  }

  // Esta función se ejecuta al cambiar el valor del input
  const handleChange = (event) => {
    // Actualizamos el estado del input con el nuevo valor ingresado
    setInputValue(event.target.value);
  }

  return (
    <div className={style.nav}>
      
      {/* Al hacer clic en el logotipo, se redirige a la ruta '/home' */}
      <img src={Logo} alt="logo"/>
      <div className={style.busqueda}>
      {/* Al hacer clic en este enlace, se redirige a la ruta '/crear-pokemon' */}
      <Link to="/crear-pokemon">Create Pokémon</Link>
      {/* Al enviar el formulario, se ejecuta la función 'handleSubmit' */}
      <form onSubmit={handleSubmit}>
        {/* Al cambiar el valor del input, se ejecuta la función 'handleChange' */}
        <input placeholder='search' onChange={handleChange} value={inputValue} /> 
        <button disabled={!inputValue}>search</button>
      </form>

      </div>
    </div>
  );
}

export default Nav;


