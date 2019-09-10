import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { TextInput, Box } from 'grommet';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import * as uuid from 'uuid/v4';
import { connect } from 'react-redux';

import style from './style.scss';
import executeCommand from '../../utils/executeCommand';
import { roomUpdate } from '../../storage/actions/room';
import commandTypes from '../../constants/commandTypes';

class Room extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.handleVideoInputBlur = this.handleVideoInputBlur.bind(this);
    this.handlePlayerReady = this.handlePlayerReady.bind(this);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    // this.handleChangeVideo = this.handleChangeVideo.bind(this);
  }

  componentDidMount() {
    const {
      match,
      roomId,
      dispatch,
      videoId,
    } = this.props;
    
    if (!match.params.roomId && !roomId) {
      dispatch(roomUpdate({ roomId: uuid() }));
    } else if (match.params.roomId && roomId !== match.params.roomId) {
      dispatch(roomUpdate({ roomId: match.params.roomId }));
    }
    
    if (match.params.videoId && match.params.videoId !== videoId) {
      dispatch(roomUpdate({ videoId: match.params.videoId }));
    }
  }

  componentDidUpdate(prevProps) {
    const { roomId } = this.props;

    if (prevProps.roomId !== roomId) {
      this.socket = io(`http://localhost:3000?roomId=${roomId}`);
      this.socket.on('command', command => executeCommand(command, this.player));
    }
  }

  handleVideoInputBlur(event) {
    const { dispatch } = this.props;
    event.preventDefault();

    dispatch(roomUpdate({
      videoId: event.target.value.split('v=')[1],
    }));
    this.socket.emit('command', {
      type: commandTypes.CHANGE_VIDEO_ID,
      videoId: event.target.value.split('v=')[1],
    });
  }

  // handleChangeVideo(event) {
  //   const { dispatch } = this.props;

  //   // dispatch(roomUpdate({
  //   //   videoId,
  //   // }));
  //   // this.socket.emit('command', JSON.parse(event.target.value));
  // }

  handlePlayerReady({ target }) {
    this.player = target;
  }

  handlePlayerChange({ data, target }) {
    const { videoState, dispatch } = this.props;

    if (data !== videoState) {
      if (data === YouTube.PlayerState.PLAYING) {
        dispatch(roomUpdate({ videoState: YouTube.PlayerState.PLAYING }));
        this.socket.emit('command', {
          type: commandTypes.PLAY,
          time: target.getCurrentTime(),
        });
      } else if (data === YouTube.PlayerState.PAUSED) {
        dispatch(roomUpdate({ videoState: YouTube.PlayerState.PAUSED }));
        this.socket.emit('command', {
          type: commandTypes.PAUSE,
          time: target.getCurrentTime(),
        });
      }
    }
  }

  render() {
    const { videoId } = this.props;
    const video = () => (
      videoId ? (
        <YouTube
          videoId={videoId}
          onReady={this.handlePlayerReady}
          onStateChange={this.handlePlayerChange}
        />
      ) : null
    );

    return (
      <div>
        <TextInput
          placeholder="Enter youtube url"
          onBlur={this.handleVideoInputBlur}
          className={style.videoInput}
        />
        <div className={style.content}>
          <Box
            className={style.videoBox}
            border={{ color: 'brand', size: 'medium' }}
          >
            {video()}
          </Box>
        </div>
      </div>
    );
  }
}

Room.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      roomId: PropTypes.string,
      videoId: PropTypes.string,
    }),
  }),
  videoId: PropTypes.string,
  roomId: PropTypes.string,
  videoState: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

Room.defaultProps = {
  match: {
    params: {
      roomId: null,
      videoId: null,
    },
  },
  videoState: null,
  videoId: null,
  roomId: null,
};

const mapStateToProps = state => ({
  videoId: state.room.videoId,
  roomId: state.room.roomId,
  videoState: state.room.videoState,
});

export default connect(mapStateToProps)(Room);
