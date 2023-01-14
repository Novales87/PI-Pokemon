import { getAllTypes, getAllPokemons } from '../redux/actions';
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
  
/*const handleName = (event) => {
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
} */
const [errorName, setErrorName] = useState('');

/*const handleName = (event) => {
  const name = event.target.value;
  setErrorName('');
  if (!name) {
    setErrorName('*Agrega un nombre');
    return;
  }
  if (!/^[a-zA-Z- ]*$/.test(name)) {
    setErrorName("* solo letras y guiones medios");
    return;
  } 
  setNewPokemon((prevPokemon) => {
    return {
      ...prevPokemon,
      name: name,
    }
  });
}*/

const handleName = (event) => {
  const name = event.target.value.trim();
  setErrorName('');
  if (!name) {
    setErrorName('*Agrega un nombre');
    return;
  }
  if (!/^[a-zA-Z-]*$/.test(name)) {
    setErrorName("* solo letras y guiones medios");
    return;
  } 
  setNewPokemon((prevPokemon) => {
    return {
      ...prevPokemon,
      name: name,
    }
  });
}


/*const re = /^[0-9]{1,3}$/;

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
}*/
const [errorNumber, setErrorNumber] = useState('');
const re = /^[0-9]{1,3}$/;

const handleNumber = (event) => {
  const number = parseInt(event.target.value);
  if (!number) {
    setErrorNumber('* Agregar vida');
    return;
  }
  setErrorNumber('');
  if (!re.test(number)) {
    setErrorNumber("no puede estar vacio y admite hasta 3 cifras");
    return;
  }
  setNewPokemon((prevPokemon) => {
    return {
      ...prevPokemon,
      hp: number,
    }
  });
}

const [errorAttack, setErrorAttack] = useState('');
const handleAttack = (event) => {
  const attack = parseInt(event.target.value);
  setErrorAttack('');
  if (!attack) {
    setErrorAttack('* Agregar Ataque');
    return;
  }
  if (!re.test(attack)) {
    setErrorAttack("solo números hasta 3 cifras");
    return;
  } 
  setNewPokemon((prevPokemon) => {
    return {
      ...prevPokemon,
      attack: attack,
    }
  });
}
const [errorDef, setErrorDef] = useState('');
const handleDef = (event) => {
  const defense = parseInt(event.target.value);
  setErrorDef('');
  if (!defense) {
    setErrorDef('* Agregar Defensa');
    return;
  }
  if (!re.test(defense)) {
    setErrorDef("solo números de hasta 3 cifras");
    return;
  } 
  setNewPokemon((prevPokemon) => {
    return {
      ...prevPokemon,
      defense: defense,
    }
  });
}
const [errorSpeed, setErrorSpeed] = useState('');
const handleSpeed = (event) => {
  const speed = parseInt(event.target.value);
  setErrorSpeed('');
  if (!speed) {
    setErrorSpeed('* Agregar Velocidad');
    return;
  }
  if (!re.test(speed)) {
    setErrorSpeed("solo números de hasta 3 cifras");
    return;
  } 
  setNewPokemon((prevPokemon) => {
    return {
      ...prevPokemon,
      speed: speed,
    }
  });
}

const [errorHeight, setErrorHeight] = useState('');
const handleHeight = (event) => {
  const height = parseInt(event.target.value);
  setErrorHeight('');
  if (!height) {
    setErrorHeight('* Agregar Altura');
    return;
  }
  if (!re.test(height)) {
    setErrorHeight("solo números de hasta 3 cifras");
    return;
  }
  setNewPokemon((prevPokemon) => {
    return {
      ...prevPokemon,
      height: height,
    }
  });
}

const [errorWeight, setErrorWeight] = useState('');
const handleWeight = (event) => {
  const weight = parseInt(event.target.value);
  setErrorWeight('');
  if (!weight) {
    setErrorWeight('* Agregar Peso');
    return;
  }
  if (!re.test(weight)) {
    setErrorWeight("solo números de hasta 3 cifras");
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



const [errorImage, setErrorImage] = useState('');
const handleImage = (event) => {
  let imageUrl = event.target.value;
  setErrorImage('');
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
    setErrorImage('* Ingresa una URL valida');
  }
  console.log(newPokemon);
};
const [res, setRes] = useState('');
const send = () => {
  const missingFields = [];
  
  for (let key in newPokemon) {
    if (newPokemon[key] === "" || (key === "typeIds" && newPokemon[key].length === 0)) {
      missingFields.push(key);
    }
  }


  // Check if there are any missing fields
  if (missingFields.length > 0) {
    // Show an alert with the missing fields
    alert(`Completa todos los campos: ${missingFields.join(", ")}`);
  } else {
    // Send the newPokemon object to the server
    axios.post("http://localhost:3001/pokemon", newPokemon)
      .then((response) => {
        setRes(<p></p>);
        dispatch(getAllPokemons());
        setRes(<p>{newPokemon.name} Creado con exito</p>);
      })
      .catch((error) => {
        console.log(error);
      });
   
      
  }
  
}

const [inputValue, setInputValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (event) => {
    let input = event.target.value;
    input = input.replace(/[^a-zA-Z\s-]/g, '');
    setInputValue(input);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/types', { type: inputValue });
      setResponseMessage(<p>Tipo creado con éxito</p>);
      setInputValue('');
      dispatch(getAllTypes());
    } catch (err) {
      setResponseMessage(<p>Error al crear tipo, verifique que no exista el tipo</p>);
    }
    
  }


  return (
    <div className={style.Padre} >
      <fieldset>
        <h2>Crear Pokémon</h2>
        {res !== "" && <p>{res}</p>}
        <label>Nombre</label>
        {errorName !== "" && <p>{errorName}</p>}
        <input key="name" type="text" value={newPokemon.name} onChange={handleName} onBlur={handleName} />

       <label>vida</label>
       {errorNumber !== "" && <p>{errorNumber}</p>}
       <input key="hp" type="number" value={newPokemon.hp} onChange={handleNumber} onBlur={handleNumber} />
       
       <label >Ataque</label>
       {errorAttack !== "" && <p>{errorAttack}</p>}
       <input key="attack" type="number" value={newPokemon.attack} onChange={handleAttack} onBlur={handleAttack} />
       

       <label>Defensa</label>
       {errorDef !== "" && <p>{errorDef}</p>}
       <input key="defense"  type="number" value={newPokemon.defense} onChange={handleDef} onBlur={handleDef} />
       

       <label>velocidad</label>
       {errorSpeed !== "" && <p>{errorSpeed}</p>}
       <input key="speed"  type="number" value={newPokemon.speed} onChange={handleSpeed} onBlur={handleSpeed}/>
       

       <label>Altura</label>
       {errorHeight !== "" && <p>{errorHeight}</p>}
       <input key="height"  type="number" value={newPokemon.height} onChange={handleHeight} onBlur={handleHeight} />
      

       <label>Peso</label>
       {errorWeight !== "" && <p>{errorWeight}</p>}
       <input key="weight" type="text" value={newPokemon.weight} onChange={handleWeight} onBlur={handleWeight} />
       

       <label>Imagen</label>
       {errorImage !== "" && <p>{errorImage}</p>}
      <input key="image" value={newPokemon.img} onChange={handleImage} type="text"/>
      

       <label>Tipo</label>
       <select onChange={handleTypeChange}>
  {allTypes.map((type) => (
    <option key={type.id} value={type.id} disabled={selectedTypes.includes(type.id)}>
      {type.name}
    </option>
  ))}
</select>

       
       <button type="submit" onClick={send} >Crear</button>
       <fieldset className={style.Crear}>
      <h4>crear tipo</h4>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleSubmit}>crear tipo</button>
      {responseMessage}
    </fieldset>
       
       </fieldset>
       <Link to={'/home'}><button>Home</button></Link>
       
       
    </div>
  )
}
export default PokeForm










