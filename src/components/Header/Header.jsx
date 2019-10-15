import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'grommet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';

import './Header.scss';

const logoImg = require('../../assets/logo.png');

function Header(props) {
  const { roomId, button } = props;

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
        {
          button === 'share' ? (
            <CopyToClipboard
              text={`${process.env.REACT_APP_URL}/room/${roomId}`}
              onCopy={() => Swal.fire({
                type: 'success',
                title: 'Copied to your clipboard.',
                text: 'Share with your friends!',
              })}
            >
              <Button
                label="Share room"
                color="accent-1"
                primary
                reverse={false}
                onClick={() => {}}
              />
            </CopyToClipboard>
          ) : (
            <Link to={`/room/${roomId}`}>
              <Button
                label="Room"
                color="accent-1"
                primary
                reverse={false}
                onClick={() => {}}
              />
            </Link>
          )
        }
      </div>
    </header>
  );
}

Header.propTypes = {
  button: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  roomId: state.room.roomId,
});

export default connect(mapStateToProps)(Header);
