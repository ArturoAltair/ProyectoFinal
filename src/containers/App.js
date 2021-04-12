import React from 'react';
import clases from './App.module.css';
import Header from '../components/Header/Header';
import Home from '../containers/Home/Home';
import Workers from '../containers/Workers/Workers';
import Historial from '../containers/Historial/Historial';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

class App extends React.Component {

  render() {

    return (
      <div className={clases.App}>
      <Header titulo={this.props.titulo}/>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/productos">Mis Prodcutos</Link>
                </li>
                <li>
                  <Link to="/historial">Historial de Pedidos</Link>
                </li>
              </ul>
            </nav>

            <Switch>
              <Route path="/productos">
                <Workers titulo="Cualquier título" />
              </Route>
              <Route path="/historial">
                <Historial />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }

}

export default App;
