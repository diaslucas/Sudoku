import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Home />
      </div>
    );
  }
}

export default App;
