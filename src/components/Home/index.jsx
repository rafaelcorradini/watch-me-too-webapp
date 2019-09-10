import React, { Component } from 'react';
import { TextInput, Button } from 'grommet';
import PropTypes from 'prop-types';
import { Search } from 'grommet-icons';
import * as uuid from 'uuid/v4';
import { ToastsStore } from 'react-toasts';
import { connect } from 'react-redux';

import style from './style.scss';
import { roomUpdate } from '../../storage/actions/room';

const homeArt = require('../../assets/home-art.svg');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: '',
    };
    this.goToRoom = this.goToRoom.bind(this);
  }

  goToRoom() {
    const { videoUrl } = this.state;
    const { history, dispatch } = this.props;
    const roomId = uuid();
    let videoId;

    if (videoUrl.includes('v=')) {
      videoId = videoUrl.split('v=');
    } else {
      ToastsStore.error('Invalid url! :(');
    }
    dispatch(roomUpdate({ videoId: videoId[1], roomId }));

    return history.push(`/room/${roomId}/${videoId[1]}`);
  }

  render() {
    const { videoUrl } = this.state;
    return (
      <section className={style.home}>
        <img src={homeArt} alt="home art" />
        <div className={style.searchContainer}>
          <Search className={style.searchIcon} />
          <TextInput
            className={style.searchInput}
            value={videoUrl}
            onChange={event => this.setState({ videoUrl: event.target.value })}
            placeholder="Paste your youtube url here to start a room, than share it!  ;)"
          />
          <Button
            label="Create Room"
            primary
            reverse={false}
            className={style.searchButton}
            onClick={this.goToRoom}
          />
        </div>
        
      </section>
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
