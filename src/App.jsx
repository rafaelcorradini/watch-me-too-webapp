import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

import style from './App.scss';
import Header from './components/Header';
import Room from './components/Room';
import Home from './components/Home';

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
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.BOTTOM_CENTER}
          lightBackground
        />
      </div>
    </Router>
  );
}

export default hot(App);
