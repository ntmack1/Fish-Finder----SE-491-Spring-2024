import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FishSearch from './components/FishSearch'; // Make sure the path matches where you saved FishSearch
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Fish Finder</h1>
      </header>
      <FishSearch />  
    </div>
  );
}

export default App;
