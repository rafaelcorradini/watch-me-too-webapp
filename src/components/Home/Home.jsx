import React, { Component } from 'react';
import { TextInput, Button } from 'grommet';
import PropTypes from 'prop-types';
import { Search as SearchIcon } from 'grommet-icons';
import * as uuid from 'uuid/v4';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';

import './Home.scss';
import { roomUpdate } from '../../store/actions/room';
import Header from '../Header/Header';
import getYoutubeId from '../../utils/getYoutubeId';

const homeArt = require('../../assets/home-art.svg');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: '',
    };
    this.createRoom = this.createRoom.bind(this);
  }

  createRoom() {
    const { videoUrl } = this.state;
    const { history, dispatch } = this.props;
    const roomId = uuid();
    const videoId = getYoutubeId(videoUrl);

    if (videoId !== videoUrl) {
      dispatch(roomUpdate({ videoId, roomId }));

      history.push(`/room/${roomId}`);
    } else {
      Swal.fire({
        type: 'error',
        title: 'Invalid url! :(',
      });
    }
  }

  render() {
    const { videoUrl } = this.state;
    return (
      <div>
        <Header button="room" />
        <section className="home">
          <img src={homeArt} alt="home art" />
          <div className="search-container">
            <SearchIcon className="search-icon" />
            <TextInput
              className="search-input"
              value={videoUrl}
              onChange={event => this.setState({ videoUrl: event.target.value })}
              placeholder="Paste your youtube url here to start a room, than share it!  ;)"
            />
            <Button
              label="Create Room"
              primary
              reverse={false}
              className="search-button"
              onClick={this.createRoom}
            />
          </div>

        </section>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  videoId: state.room.videoId,
  roomId: state.room.roomId,
});

export default connect(mapStateToProps)(Home);
