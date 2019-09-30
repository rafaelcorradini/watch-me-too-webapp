import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'grommet';

import './Header.scss';

const logoImg = require('../../assets/logo.png');

export default function Header() {
  return (
    <header className="header">
      <div>
        <Link to="/">
          <img src={logoImg} alt="logo" />
        </Link>
      </div>
      <ul>
        {/* <li><Link to="/">Home</Link></li> */}
        {/* <li><Link to="/how-to">How to</Link></li>
        <li><Link to="/about-us">About us</Link></li> */}
        {/* <li><Link to="/room">Room</Link></li> */}
      </ul>
      <div>
        <Link to="/room">
          <Button
            label="Room"
            color="accent-1"
            primary
            reverse={false}
            onClick={() => {}}
          />
        </Link>
      </div>
    </header>
  );
}
