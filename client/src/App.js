import { Route, Switch } from 'react-router-dom';
import './App.css';
import Grid from './components/CardGrid.jsx';
import PokemonForm from './components/Form';
import Nav from './components/Nav.jsx';
import Detail from './components/Detail';
import Landing from './components/Landing.jsx';



function App() {

  return (
    <div className="App">
    
    <Switch>
      <Route path="/" component={Landing} exact={true}/>
      <Route path="/pokemon/:id" component={Detail} exact={true} />
      <Route path="/crear-pokemon" component={PokemonForm} exact={true} />
      <Route>
        <Nav />
        <Route path="/home" component={Grid} exact={true} />
      </Route>
    </Switch>
    
  </div>
   ) }
 
   
     

export default App;





