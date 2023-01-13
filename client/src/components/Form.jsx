import { getAllTypes } from '../redux/actions';
import style from './Form.module.css';
import { useEffect, useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  typeIds:[],
  image:''
 })
 

 useEffect(() => {
      dispatch(getAllTypes());
  }, [dispatch]);
  
  const allTypes = useSelector(state => state.types);
  
const handleName = (event) => {
  const name = event.target.value;
  if (!name) {
    alert('debes agregar un nombre');
    return;
  }
  if (!/^[a-zA-Z- ]*$/.test(name)) {
    alert("Error: solo se permiten letras y guion medio");
    return;
  } 
  setNewPokemon((prevPokemon) => {
    return {
      ...prevPokemon,
      name: name,
    }
  });
}

const re = /^[0-9]{1,3}$/;

const handleNumber = (event) => {
  const number = parseInt(event.target.value);
  if (!re.test(number)) {
    alert("Error: solo se permiten números de hasta 3 cifras");
    return;
  }
  setNewPokemon((prevPokemon) => {
    return {
      ...prevPokemon,
      hp: number,
    }
  });
}

const handleAttack = (event) => {
  const attack = parseInt(event.target.value);
  if (!re.test(attack)) {
    alert("Error: solo se permiten números de hasta 3 cifras");
    return;
  } 
  setNewPokemon((prevPokemon) => {
    return {
      ...prevPokemon,
      attack: attack,
    }
  });
}

const handleDef = (event) => {
  const defense = parseInt(event.target.value);
  if (!re.test(defense)) {
    alert("Error: solo se permiten números de hasta 3 cifras");
    return;
  } 
  setNewPokemon((prevPokemon) => {
    return {
      ...prevPokemon,
      defense: defense,
    }
  });
}

const handleSpeed = (event) => {
  const speed = parseInt(event.target.value);
  if (!re.test(speed)) {
    alert("Error: solo se permiten números de hasta 3 cifras");
    return;
  } 
  setNewPokemon((prevPokemon) => {
    return {
      ...prevPokemon,
      speed: speed,
    }
  });
}
const handleHeight = (event) => {
  const height = parseInt(event.target.value);
  if (!height) {
    alert('debes agregar una altura');
    return;
  }
  if (!re.test(height)) {
    alert("Error: solo se permiten números de hasta 3 cifras");
    return;
  }
  setNewPokemon((prevPokemon) => {
    return {
      ...prevPokemon,
      height: height,
    }
  });
}

const handleWeight = (event) => {
  const weight = parseInt(event.target.value);
  if (!re.test(weight)) {
    alert("Error: solo se permiten números de hasta 3 cifras");
    return;
  } 
  setNewPokemon((prevPokemon) => {
    return {
      ...prevPokemon,
      weight: weight,
    }
  });
}

const [selectedTypes, setSelectedTypes] = useState([]);

const handleTypeChange = (event) => {
  if (selectedTypes.length === 0) {
    let id = parseInt(event.target.value);
    setSelectedTypes([...selectedTypes, id]);
    setNewPokemon({ ...newPokemon, typeIds: [...newPokemon.typeIds, id] });
  } else if (selectedTypes.length <= 2) {
    let id = parseInt(event.target.value);
    setSelectedTypes([...selectedTypes, id]);
    setNewPokemon({ ...newPokemon, typeIds: [...newPokemon.typeIds, id] });
    if (selectedTypes.length === 3) {
      alert("Tipos agregados: " + newPokemon.typeIds[0] + ' ' + newPokemon.typeIds[1] + ' ' + newPokemon.typeIds[2]);
    }
  } else {
    alert("Solo se pueden seleccionar 3 tipos");
  }
  console.log(newPokemon);
};




const handleImage = (event) => {
  let imageUrl = event.target.value;
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocolo
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // nombre de dominio
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ //  ip (v4) 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(pattern.test(imageUrl)) {
    let tempNewPokemon = {...newPokemon}
    tempNewPokemon.image=imageUrl;
    setNewPokemon(tempNewPokemon);
  } else {
    alert('Ingresa una URL valida');
  }
  console.log(newPokemon);
};

const send = () => {
  const missingFields = [];
  
  // Iterate through the keys of newPokemon object
  for (let key in newPokemon) {
    // Check if the key is an empty string
    if (newPokemon[key] === "") {
      missingFields.push(key);
    }
  }

  // Check if there are any missing fields
  if (missingFields.length > 0) {
    // Show an alert with the missing fields
    alert(`Los siguientes campos están vacíos: ${missingFields.join(", ")}`);
  } else {
    // Send the newPokemon object to the server
    axios.post("http://localhost:3001/pokemon", newPokemon)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

  return (
    <div className={style.Padre} >
      <fieldset>
        <h2>Crear Pokémon</h2>
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
       <label>Imagen</label>
      <input key="image" value={newPokemon.img} onChange={handleImage} type="text"/>
       <label>Tipo</label>
       <select onChange={handleTypeChange}>
  {allTypes.map((type) => (
    <option key={type.id} value={type.id} disabled={selectedTypes.includes(type.id)}>
      {type.name}
    </option>
  ))}
</select>

       
       <button type="submit" onClick={send} >Crear Pokemon</button>
       <fieldset className={style.Crear}>
        <h4>crear tipo</h4>
        <input type="text" />
        <button>crear tipo</button>
       </fieldset>
       
       </fieldset>
       <Link to={'/home'}><button>Home</button></Link>
       
       
    </div>
  )
}
export default PokeForm










