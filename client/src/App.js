import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import Sudoku from './components/Sudoku';
import CreateAccount from './components/CreateAccount';

import { Provider } from 'react-redux';
import store from './store';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <AppNavbar />
            <Route exact path="/" component={Home} />
            <Route path="/Sudoku" component={Sudoku} />
            <Route path="/CreateAccount" component={CreateAccount} />
            <Route path="/Login" component={Login} />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
