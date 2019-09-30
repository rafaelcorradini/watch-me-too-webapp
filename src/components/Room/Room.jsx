import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { TextInput, Box, Button } from 'grommet';
import { Close as CloseIcon } from 'grommet-icons';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import * as uuid from 'uuid/v4';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import './Room.scss';
import executeCommand from '../../utils/executeCommand';
import { roomUpdate, playlistAdd, playlistRemove } from '../../store/actions/room';
import commandTypes from '../../constants/commandTypes';

class Room extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      videoInput: '',
    };
    this.handleAddVideo = this.handleAddVideo.bind(this);
    this.handlePlayerReady = this.handlePlayerReady.bind(this);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handleChangeVideo = this.handleChangeVideo.bind(this);
    this.handleRemoveVideo = this.handleRemoveVideo.bind(this);
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

    if (match.params.roomId) {
      this.initSocket();
    }
  }

  componentDidUpdate(prevProps) {
    const { roomId } = this.props;

    if (prevProps.roomId !== roomId) {
      this.initSocket();
    }
  }

  handleAddVideo(event) {
    const { dispatch } = this.props;
    const { videoInput } = this.state;
    event.preventDefault();

    if (videoInput && videoInput.includes('v=')) {
      dispatch(playlistAdd(videoInput.split('v=')[1]));
    } else {
      Swal.fire({
        type: 'error',
        title: 'Invalid url! :(',
      });
    }
  }

  handleRemoveVideo(event, index) {
    const { dispatch } = this.props;
    event.preventDefault();

    dispatch(playlistRemove(index));
  }

  initSocket(initCommand = null) {
    const { roomId } = this.props;

    this.socket = io(`${process.env.REACT_APP_API_URL}?roomId=${roomId}`);
    this.socket.on('command', command => executeCommand(command, this.player));

    if (initCommand) {
      this.socket.on('connect', () => {
        this.socket.emit('command', initCommand);
      });
    }
  }

  handleChangeVideo(videoId) {
    const { dispatch } = this.props;

    dispatch(roomUpdate({
      videoId,
    }));
    this.emmitCommand({
      type: commandTypes.CHANGE_VIDEO_ID,
      videoId,
    });
  }

  handlePlayerReady({ target }) {
    this.player = target;
  }

  emmitCommand(command) {
    if (!this.socket) {
      this.initSocket(command);
    } else {
      this.socket.emit('command', command);
    }
  }

  handlePlayerChange({ data, target }) {
    const { videoState, dispatch } = this.props;

    if (data !== videoState) {
      if (data === YouTube.PlayerState.PLAYING) {
        dispatch(roomUpdate({ videoState: YouTube.PlayerState.PLAYING }));
        this.emmitCommand({
          type: commandTypes.PLAY,
          time: target.getCurrentTime(),
        });
      } else if (data === YouTube.PlayerState.PAUSED) {
        dispatch(roomUpdate({ videoState: YouTube.PlayerState.PAUSED }));
        this.emmitCommand({
          type: commandTypes.PAUSE,
          time: target.getCurrentTime(),
        });
      }
    }
  }

  render() {
    const { videoId, playlist } = this.props;
    const { videoInput } = this.state;

    return (
      <div>
        <section className="add-video">
          <TextInput
            placeholder="Add video to playlist (Enter youtube url)"
            value={videoInput}
            onChange={event => this.setState({ videoInput: event.target.value })}
            className="video-input"
          />
          <Button
            label="Add"
            primary
            reverse={false}
            className="add-video-button"
            onClick={this.handleAddVideo}
          />
        </section>
        
        <section className="content">
          {videoId ? (
            <Box
              className="video-box"
              border={{ color: 'brand', size: 'medium' }}
            >
              <YouTube
                videoId={videoId}
                onReady={this.handlePlayerReady}
                onStateChange={this.handlePlayerChange}
              />
              
            </Box>
          ) : null}
        </section>

        {playlist && playlist.length > 0 ? (
          <section className="playlist">
            <h4>Playlist</h4>
            <ul className="playlist-items">
              {playlist.map((playlistVideoId, index) => (
                <li key={playlistVideoId}>
                  <button type="button" onClick={() => this.handleChangeVideo(playlistVideoId)}>
                    <img
                      src={`https://img.youtube.com/vi/${playlistVideoId}/0.jpg`}
                      alt={playlistVideoId}
                    />
                  </button>
                  <Button
                    icon={<CloseIcon />}
                    primary
                    reverse={false}
                    className="remove-video-button"
                    onClick={event => this.handleRemoveVideo(event, index)}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
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
  playlist: PropTypes.arrayOf(PropTypes.string).isRequired,
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
  playlist: state.room.playlist,
});

export default connect(mapStateToProps)(Room);
