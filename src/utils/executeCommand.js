import commandTypes from '../constants/commandTypes';

export default (command, player) => {
  console.log(command);
  console.log(player);
  switch (command.type) {
    case commandTypes.JUMP_TO:
      player.seekTo(command.time, true);
      break;
    case commandTypes.PLAY:
      if (command.time) {
        player.seekTo(command.time, true);
      }
      player.playVideo();
      break;
    case commandTypes.PAUSE:
      if (command.time) {
        player.seekTo(command.time, true);
      }
      player.pauseVideo();
      break;
    case commandTypes.CHANGE_VIDEO_ID:
      player.loadVideoById(command.videoId);
      break;
    default:
      throw new Error('invalid command');
  }
};
