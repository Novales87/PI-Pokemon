import React from 'react'
import style from'./card.module.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePokemon } from '../redux/actions';


const PokeCard = ({name, types, img,id}) => {
  const dispatch = useDispatch();
  const onClose = (id) => {
    if (window.confirm(`¿Estás seguro de eliminar al pobre Pokémon?`)) {
        dispatch(deletePokemon(id))
    }
  }


  return (
    
    <div className={style.card} key={name}>
    <button onClick={() => onClose(id)}>X</button>
       <h5>{name.toUpperCase()}</h5>
       <Link to={`/pokemon/${id}`}>
  <img src={img} alt={name}/>
</Link>
        <h6> {types.join(', ')}</h6>
      </div>
   
  )
}

export default PokeCard
