
import { getAllTypes } from '../redux/actions';
import style from './Form.module.css';
import { useEffect, useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function PokeForm() {
 const dispatch = useDispatch();
 const [newPokemon, setNewPokemon] = useState({
  name:"",
  hp:'',
  attack: '',
  defense: '',
  speed:'',
  height:'',
  weight:'',
  type:[],
  img:"" 
 })
 

 useEffect(() => {
      dispatch(getAllTypes());
  }, [dispatch]);
  
  const allTypes = useSelector(state => state.types);

  const handleName = (event) => {
    const name = event.target.value;
    if (!/^[a-zA-Z- ]*$/.test(name)) {
      alert("Error: solo se permiten letras y guion medio");
    } else {
      setNewPokemon((prevPokemon) => {
        return {
          ...prevPokemon,
          name: name,
        }
      });
      console.log(newPokemon);
    }
  }
  const handleNumber = (event) => {
    const number = parseInt(event.target.value);
    if (!/^[0-9]{1,3}$/.test(number)) {
      alert("Error: solo se permiten números de hasta 3 cifras");
    } else {
      setNewPokemon((prevPokemon) => {
        return {
          ...prevPokemon,
          hp: number,
        }
        
      });
      console.log(newPokemon)
    }
  }

  
const handleAttack = (event) => {
  const attack = parseInt(event.target.value);
  if (!/^[0-9]{1,3}$/.test(attack)) {
    alert("Error: solo se permiten números de hasta 3 cifras");
  } else {
    setNewPokemon((prevPokemon) => {
      return {
        ...prevPokemon,
        attack: attack,
      }
    });
    console.log(newPokemon)
  }
}

const handleDef = (event) => {
  const defense = parseInt(event.target.value);
  if (!/^[0-9]{1,3}$/.test(defense)) {
    alert("Error: solo se permiten números de hasta 3 cifras");
  } else {
    setNewPokemon((prevPokemon) => {
      return {
        ...prevPokemon,
        defense: defense,
      }
    });
    console.log(newPokemon)
  }
}
const handleSpeed = (event) => {
  const speed = parseInt(event.target.value);
  if (!/^[0-9]{1,3}$/.test(speed)) {
    alert("Error: solo se permiten números de hasta 3 cifras");
  } else {
    setNewPokemon((prevPokemon) => {
      return {
        ...prevPokemon,
        speed: speed,
      }
    });
    console.log(newPokemon)
  }
}

const handleHeight = (event) => {
  const height = parseInt(event.target.value);
  if (!/^[0-9]{1,3}$/.test(height)) {
    alert("Error: solo se permiten números de hasta 3 cifras");
  } else {
    setNewPokemon((prevPokemon) => {
      return {
        ...prevPokemon,
        height: height,
      }
    });
    console.log(newPokemon)
  }
}

const handleWeight = (event) => {
  const weight = parseInt(event.target.value);
  if (!/^[0-9]{1,3}$/.test(weight)) {
    alert("Error: solo se permiten números de hasta 3 cifras");
  } else {
    setNewPokemon((prevPokemon) => {
      return {
        ...prevPokemon,
        weight: weight,
      }
    });
    console.log(newPokemon)
  }
}




  return (
    <div className={style.Padre} >
      <fieldset>
        <legend>Crear Pokémon</legend>
        <label>Nombre</label>
        <input key="name" type="text" value={newPokemon.name} onChange={handleName} onBlur={handleName} />

       <label>vida</label>
       <input key="hp" type="number" value={newPokemon.hp} onChange={handleNumber} onBlur={handleNumber} />
       <label >Ataque</label>
       <input key="attack" type="number" value={newPokemon.attack} onChange={handleAttack} onBlur={handleAttack} />
       <label>Defensa</label>
       <input key="defense"  type="number" value={newPokemon.defense} onChange={handleDef} onBlur={handleDef} />
       <label>velocidad</label>
       <input key="speed"  type="number" value={newPokemon.speed} onChange={handleSpeed} onBlur={handleSpeed}/>
       <label>Altura</label>
       <input key="height"  type="number" value={newPokemon.height} onChange={handleHeight} onBlur={handleHeight} />
       <label>Peso</label>
       <input key="weight" type="text" value={newPokemon.weight} onChange={handleWeight} onBlur={handleWeight} />

       <label>Tipo</label>
       <select>
       {allTypes.map(type => (
       <option key={type.id} value={type.id}>{type.id}. {type.name}</option>
       ))}
      </select>

      <label>Imagen</label>
       <input key="image"  type="text"/>

       
       <button type="submit" >Crear</button>
       <Link to={'/home'}><button>Home</button></Link>
       </fieldset>
       
    </div>
  )
}

export default PokeForm










