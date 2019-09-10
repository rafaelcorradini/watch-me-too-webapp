import { Link } from 'react-router-dom';
import { Button } from 'grommet';

import style from './style.scss';

const logoImg = require('../../assets/logo.png');

export default function Header() {
  return (
    <header className={style.header}>
      <div>
        <Link to="/">
          <img src={logoImg} alt="logo" />
        </Link>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/how-to">How to</Link></li>
        <li><Link to="/about-us">About us</Link></li>
        <li><Link to="/room">Room</Link></li>
      </ul>
      <div>
        <Button
          label="Login"
          color="accent-1"
          primary
          reverse={false}
          onClick={() => {}}
        />
      </div>
    </header>
  );
}
