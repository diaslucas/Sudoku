import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import Sudoku from './components/Sudoku';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <AppNavbar />

          <Route exact path="/" component={Home} />
          <Route path="/Sudoku/:id" component={Sudoku} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
