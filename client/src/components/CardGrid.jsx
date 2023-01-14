
import { useState, useEffect } from 'react';
import styles from './cardGrid.module.css';
import PokeCard from './PokeCard';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemons, getAllTypes} from '../redux/actions';
import Cargando from '../images/cargando.gif'

function Grid() {
  // Inicializa el estado de la página actual y el número de Pokémon por página
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);

  // Inicializa el estado local de pokemons con la información de allPokemons del store de redux
  
  const allPokemons = useSelector(state => state.pokemons);
  const allTypes = useSelector(state => state.types);
  const [pokemons, setPokemons] = useState(allPokemons);
  const [filterOption, setFilterOption] = useState("todos");


    // Inicializa el estado del tipo de pokemon seleccionado
    const [selectedType, setSelectedType] = useState("");

  const dispatch = useDispatch();

  // Obtiene la lista de Pokémon de la página actual
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
 


  useEffect(() => {
    if (allPokemons.length === 0) {
      dispatch(getAllPokemons());
      dispatch(getAllTypes());
    }
  }, [dispatch, allPokemons]);

  useEffect(() => {
    setPokemons(allPokemons);
  }, [allPokemons]);

  useEffect(() => {
    let filteredPokemons = allPokemons;
    if (filterOption === 'solo los creados en la base de datos') {
        filteredPokemons = allPokemons.filter(pokemon => !Number.isInteger(pokemon.id));
    } else if (filterOption === 'solo los traidos de la Api') {
        filteredPokemons = allPokemons.filter(pokemon => Number.isInteger(pokemon.id));
    }
    setPokemons(filteredPokemons);
}, [allPokemons, filterOption]);


  // Función para avanzar a la página siguiente
  const nextPage = () => {
    // Calcula el número total de páginas
    const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);
    // Si el valor de currentPage es menor que el número total de páginas, aumenta currentPage en uno
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para volver a la página anterior
  const prevPage = () => {
    // Si el valor de currentPage es mayor que 1, disminuye currentPage en uno
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  

  // Función para ordenar el array alfabéticamente
  const [sortAscending, setSortAscending] = useState(true);

const sortAlphabetically = () => {
    const sortedPokemons = [...pokemons].sort((a, b) => {
        if (sortAscending) {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });
    setPokemons(sortedPokemons);
    setSortAscending(!sortAscending);
}


  const sortAscendingAttack = () => {
    const sortedPokemons = [...pokemons].sort((a, b) => a.attack - b.attack);
    setPokemons(sortedPokemons);
   
    
  }

  const sortDescendingAttack = () => {
    const sortedPokemons = [...pokemons].sort((a, b) => b.attack - a.attack);
    setPokemons(sortedPokemons);
    console.log(sortedPokemons);
  }



  // Función para manejar el cambio en la selección del tipo de pokemon
  const handleTypeChange = event => {
    setSelectedType(event.target.value);
    // Filtra la lista de pokemones en función del tipo seleccionado
    if (event.target.value) {
      const filteredPokemons = allPokemons.filter(pokemon => pokemon.types.includes(event.target.value));
      setPokemons(filteredPokemons);
    } else {
      // Si se selecciona la opción "Todos", muestra todos los pokemones
      setPokemons(allPokemons);
    }
  }

  if (allPokemons.length === 0) {
    return <div className={styles.cargando}>
      <h1 style={{ color: 'white' }}>Cargando 40 Pokemones...</h1>
      <img style={{ width: '100%', paddingleft: 'auto', paddingright: 'auto'} }  src={Cargando} alt="cargando"/>
    </div>
  }
    // Muestra los botones para ordenar el array y el paginado
    return (
      <div className={styles.container}>
         
        <div className={styles.buttons}>

      <fieldset>
         <legend>Type</legend>
       <select  value={selectedType} onChange={handleTypeChange}>
          <option value="">Todos</option>
        {allTypes.map(type => (
          <option key={type.id} value={type.name}>{type.id}. {type.name}</option>
        ))}
       </select>
       </fieldset>
       
        <fieldset>
          <legend>Filtro DB</legend>
        <select value={filterOption} onChange={e => setFilterOption(e.target.value)}>
          <option value="todos">todos</option>
          <option value="solo los creados en la base de datos">solo los creados en la base de datos</option>
          <option value="solo los traidos de la Api">solo los traidos de la Api</option>
</select>
        </fieldset>

        


        <fieldset>
        <legend>Alf</legend>
        <button onClick={sortAlphabetically}>A-Z</button>
        </fieldset>
        
        <fieldset>
        <legend>Attack</legend>
        <button onClick={sortAscendingAttack}>-</button>
        <button onClick={sortDescendingAttack}>+</button>
        </fieldset>
          
        </div>
        <div className={styles.cardContainer}>
          {currentPokemons.map(p => (
            <PokeCard
              name={p.name}
              key={p.name}
              img={p.image}
              types={p.types}
              id={p.id}
            />
          ))}
        </div>
        <div className={styles.buttons}>
          <button onClick={prevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span>Página: {currentPage}</span>
          <button onClick={nextPage} disabled={currentPage === Math.ceil(pokemons.length / pokemonsPerPage)}>
            Next
          </button>
        </div>
      </div>
    );
  }
  
  export default Grid; 
  
  



