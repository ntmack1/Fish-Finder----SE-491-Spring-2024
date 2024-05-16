import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Paths from './components/Paths'; // Assuming this is your Registration component
import Search from './FishSearch'; // This is your Search component

function App() {
    return (
        <Router>
            <div className="App">
                <Route path="/" exact component={Search} />
                <Route path="/register" component={Paths} />
            </div>
        </Router>
    );
}

export default App;
