const initialState = {
  roomId: null,
  videoId: null,
  videoState: null,
  playlist: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ROOM_UPDATE':
      return {
        ...state,
        ...action.payload,
      };
    case 'PLAYLIST_ADD': {
      let { playlist } = state;
      if (!playlist) {
        playlist = [];
      }
      playlist.push(action.payload);
      return {
        ...state,
        playlist: [...playlist],
      };
    }
    case 'PLAYLIST_UPDATE': {
      return {
        ...state,
        playlist: action.payload,
      };
    }
    case 'PLAYLIST_REMOVE': {
      const { playlist } = state;
      playlist.splice(action.index, 1);
      return {
        ...state,
        playlist: [...playlist],
      };
    }
    default:
      return state;
  }
};
