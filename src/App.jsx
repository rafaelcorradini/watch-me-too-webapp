import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';
import Room from './components/Room/Room';
import Home from './components/Home/Home';

function App() {
  return (
    <Router>
      <div className="app">
        <Route path="/" exact component={Home} />
        <Route path="/room/:roomId" exact component={Room} />
      </div>
    </Router>
  );
}

export default App;
