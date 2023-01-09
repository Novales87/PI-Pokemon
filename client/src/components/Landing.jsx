import React from 'react';
import Pokeball from '../images/pokeball-1.gif';
import Logo from '../images/poke.png';
import styles from'./Landing.module.css';
import { Link } from 'react-router-dom';
function Landing() {
  return (
    <div className={styles.Landing_page}> 
        <img src={Pokeball} alt="fondo" className={styles.pokeball} />
        <img src={Logo} alt="Logo" className={styles.logo} />
        <Link to={`/home`}>
  <button>Entrar</button>
</Link>
        
    </div>
  )
}

export default Landing;