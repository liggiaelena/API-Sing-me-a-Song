import * as musicRepository from '../repositories/musicRepository.js';

function isYoutubeVideo(url) {
  const v = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const isValid = url.match(v);
  return !!isValid;
}

async function addMusic(name, youtubeLink) {
  await musicRepository.addMusic(name, youtubeLink);
}

export {
  addMusic,
  isYoutubeVideo,
};
