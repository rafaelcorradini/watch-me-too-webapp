const initialState = {
  roomId: null,
  videoId: null,
  videoState: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ROOM_UPDATE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
