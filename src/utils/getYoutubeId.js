const getYoutubeId = (url) => {
  const id = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return (id[2] !== undefined) ? id[2].split(/[^0-9a-z_-]/i)[0] : id[0];
};

export default getYoutubeId;
