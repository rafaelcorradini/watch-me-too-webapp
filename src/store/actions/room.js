export const roomUpdate = payload => ({ type: 'ROOM_UPDATE', payload });
export const playlistAdd = videoId => ({ type: 'PLAYLIST_ADD', videoId });
export const playlistRemove = index => ({ type: 'PLAYLIST_REMOVE', index });
