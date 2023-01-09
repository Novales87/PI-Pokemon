import React from 'react'
import style from'./card.module.css'
import { Link } from 'react-router-dom';


const PokeCard = ({name, types, img,id}) => {

  return (
    
       <div className={style.card} key={name}>
       <h3>{name.toUpperCase()}</h3>
       <Link to={`/pokemon/${id}`}>
  <img src={img} alt={name}/>
</Link>
        <h6> {types.join(', ')}</h6>
      </div>
   
  )
}

export default PokeCard
