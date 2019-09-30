import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import style from './App.scss';
import Header from './components/Header/Header';
import Room from './components/Room/Room';
import Home from './components/Home/Home';

function App() {
  return (
    <Router>
      <div className={style.app}>
        <Header />

        <Route path="/" exact component={Home} />
        <Route path="/room" exact component={Room} />
        <Route path="/room/:roomId" exact component={Room} />
        <Route path="/room/:roomId/:videoId" exact component={Room} />
        {/* <Route path="/users/" component={Users} /> */}
      </div>
    </Router>
  );
}

export default App;
