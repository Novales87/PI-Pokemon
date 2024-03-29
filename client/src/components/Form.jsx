import { getAllTypes, getAllPokemons } from '../redux/actions';
import style from './Form.module.css';
import { useState, useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PokeForm() {
 const dispatch = useDispatch();
 const [newPokemon, setNewPokemon] = useState({
  name:"",
  hp:0,
  attack: 0,
  defense: 0,
  speed:0,
  height:0,
  weight:0,
  typeIds:[],
  image:''
 })
 
useEffect(()=>{
  dispatch(getAllTypes())
},[dispatch])
 
  
  const allTypes = useSelector(state => state.types);
  
const [errorName, setErrorName] = useState('');

//***************** control de Name   **************************** */
const [nameInput, setNameInput] = useState("");
const handleName = (event) => {
  const name = event.target.value.trim().toLowerCase();
  setNameInput(event.target.value.trim());
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

//*******************control hp*********** */

const [errorNumber, setErrorNumber] = useState('');
const re = /^[0-9]{0,3}$/;
const rex = /^[0-9]{0,4}$/;

const handleNumber = (event) => {
  const number = event.target.value;
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

//************* control  attack  **************************************** */

const [errorAttack, setErrorAttack] = useState('');
const handleAttack = (event) => {
  const attack = event.target.value;
  setErrorAttack('');
 
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

//****************** Control Def ********************************** */

const [errorDef, setErrorDef] = useState('');
const handleDef = (event) => {
  const defense = event.target.value;
  setErrorDef('');
 
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

//*****************Control Speed  ************************** */

const [errorSpeed, setErrorSpeed] = useState('');
const handleSpeed = (event) => {
  const speed = event.target.value;
  setErrorSpeed('');
 
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
//*********************** control height  ******************************** */
const [errorHeight, setErrorHeight] = useState('');
const handleHeight = (event) => {
  const height = event.target.value;
  setErrorHeight('');
  
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
//********************* control Weight    ************************************ */
const [errorWeight, setErrorWeight] = useState('');
const handleWeight = (event) => {
  const weight = event.target.value;
  setErrorWeight('');
 
  if (!rex.test(weight)) {
    setErrorWeight("solo números de hasta 4 cifras");
    return;
  } 
  setNewPokemon((prevPokemon) => {
    return {
      ...prevPokemon,
      weight: weight,
    }
  });
}

//**************Control Types***************** */

const [selectedTypes, setSelectedTypes] = useState([]);

useEffect(()=>{
  if (selectedTypes.length === 3) {
    alert('maximo 3 types');
  }
},[selectedTypes])


const handleTypeChange = (event) => {
  let id = parseInt(event.target.value);
  if (selectedTypes.length === 3 && selectedTypes.indexOf(id) === -1) {
    return;
  } else {
    if (selectedTypes.indexOf(id) === -1) {
      setSelectedTypes([...selectedTypes, id]);
      setNewPokemon({ ...newPokemon, typeIds: [...newPokemon.typeIds, id] });
    } else {
      setSelectedTypes(selectedTypes.filter((type) => type !== id));
      setNewPokemon({ ...newPokemon, typeIds: newPokemon.typeIds.filter((type) => type !== id) });
    }
  }
  console.log(newPokemon.typeIds);
};




/*const handleTypeChange = (event) => {
  let id = parseInt(event.target.value);
  if (selectedTypes.length === 3) {
    alert("Solo se pueden seleccionar hasta 3 tipos");
  } else {
    if (selectedTypes.indexOf(id) === -1) {
      setSelectedTypes([...selectedTypes, id]);
      setNewPokemon({ ...newPokemon, typeIds: [...newPokemon.typeIds, id] });
      
    }
  }
  console.log(newPokemon.typeIds);
};*/


//****************** control URL********************************* */

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


//******************* control boton enviar   ************************************* */
const [res, setRes] = useState('');
const send = () => {
  const missingFields = [];
  
  for (let key in newPokemon) {
    if (newPokemon[key] === "" || (key === "typeIds" && newPokemon[key].length === 0)) {
      missingFields.push(key);
    }
  }

  // Comprueba si faltan campos
  if (missingFields.length > 0) {
    // Muestra una alerta con los campos faltantes
    alert(`Completa los campos: ${missingFields.join(", ")}`);
  } else {
    // Envía el objeto newPokemon al servidor
    axios.post("http://localhost:3001/pokemons", newPokemon)
      .then((response) => {
        dispatch(getAllPokemons());
        setRes(response.data.message);
        console.log(response);
        setNameInput("");
        setNewPokemon({
          name:"",
          hp:0,
          attack: 0,
          defense: 0,
          speed:0,
          height:0,
          weight:0,
          typeIds:[],
          image:''
         })
      })
      .catch((error) => {
        setRes(<p>{error.response.data.message}</p>);
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

//************* control input del tipo y boton crear tipo  ************* */
const handleSubmit = async (event) => {
  event.preventDefault();
  if (!inputValue) {
      setResponseMessage(<p>No se puede enviar un valor vacío</p>);
      return;
  }
  try {
    const response = await axios.post('http://localhost:3001/types', { type: inputValue });
    console.log(response);
    setResponseMessage(<p>Tipo creado con éxito!</p>);
    setInputValue('');
    dispatch(getAllTypes());
  } catch (error) {
    if(error.response && error.response.status === 409) {
      setResponseMessage(<p>Tipo ya existe</p>);
    } else {
      console.log(error);
      setResponseMessage(<p>Ocurrió un error: {error.message}</p>);
    }
  }
}



//****** RETURN   ***** */
  return (
    <div className={style.Padre} >
     
     <div>
      {<h3>Types Ids: { selectedTypes.join(' , ')}</h3>}
     </div>


      <fieldset>
        <h2>Create New Pokémon</h2>
        
{/************************** name ************************************ */ }       {res !== " " && <p>{res}</p>}
        <label>Name</label>
        {errorName !== " " && <p>{errorName}</p>}
        <input key="name" type="text" value={nameInput} onChange={handleName} onBlur={handleName} />

{/*********************** hp  ********************************* */}
       <label>HP</label>
       {errorNumber !== "" && <p>{errorNumber}</p>}
       <input key="hp" type="number" value={newPokemon.hp} onChange={handleNumber} onBlur={handleNumber} />
  {/******************** attack ************************************ */}     
       <label >Attack</label>
       {errorAttack !== "" && <p>{errorAttack}</p>}
       <input key="attack" type="number" value={newPokemon.attack} onChange={handleAttack} onBlur={handleAttack} />
       
{/******************* defense ******************** */}
       <label>Defense</label>
       {errorDef !== "" && <p>{errorDef}</p>}
       <input key="defense"  type="number" value={newPokemon.defense} onChange={handleDef} onBlur={handleDef} />
       
{/******************** Speed ********************************** */}
       <label>Speed</label>
       {errorSpeed !== "" && <p>{errorSpeed}</p>}
       <input key="speed"  type="number" value={newPokemon.speed} onChange={handleSpeed} onBlur={handleSpeed}/>
{/***************** height ************************** */ }      

       <label>Height</label>
       {errorHeight !== "" && <p>{errorHeight}</p>}
       <input key="height"  type="number" value={newPokemon.height} onChange={handleHeight} onBlur={handleHeight} />
      
{/****************weight *************** */}
       <label>weight</label>
       {errorWeight !== "" && <p>{errorWeight}</p>}
       <input key="weight" type="text" value={newPokemon.weight} onChange={handleWeight} onBlur={handleWeight} />
       
{/******************imagen *************** */}
       <label>Imagen</label>
       {errorImage !== "" && <p>{errorImage}</p>}
      <input key="image" value={newPokemon.image} onChange={handleImage} onBlur={handleImage} type="text"/>
      
{/************** input types **********************/}
       <label>TypeIds</label>
       <select onChange={handleTypeChange}>
         <option value="" >Select a Id Type</option>
  {
  allTypes.map((type) => (
    <option key={type.id} value={newPokemon.id}  >
      {type.id} {type.name}
    </option>
  ))}
</select>

 {/*******************boton enviar */ }     
       <button type="submit" onClick={send} >Create new Pokémon</button>

  {/******************Crear Tipo*********************** */}     
       <fieldset className={style.Crear}>
      <h4>Create a new Type</h4>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Create</button>
      {responseMessage}
    </fieldset>      
       </fieldset>

  {/**************** boton home ******************************/ }    
       <Link to={'/home'}><button>Home</button></Link>
       
       
    </div>

    
  )
}
export default PokeForm










