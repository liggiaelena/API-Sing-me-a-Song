import * as musicRepository from '../repositories/musicRepository.js';

function isYoutubeVideo(url) {
  const v = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const isValid = url.match(v);
  return !!isValid;
}

async function addMusic(name, youtubeLink) {
  await musicRepository.addMusic(name, youtubeLink);
}

async function isValidSong(id) {
  const result = await musicRepository.findSongById(id);
  return result;
}

async function addVote(id) {
  const score = await musicRepository.findScoreByMusicId(id);
  const newScore = score + 1;
  await musicRepository.updateVote(id, newScore);
}

async function removeVote(id) {
  const score = await musicRepository.findScoreByMusicId(id);
  const newScore = score - 1;
  if (newScore === -5) {
    await musicRepository.deleteSong(id);
    return;
  }
  await musicRepository.updateVote(id, newScore);
}

async function getTopMusics(amount) {
  const musics = await musicRepository.getTopMusics(amount);
  return musics;
}

export {
  addMusic,
  isYoutubeVideo,
  isValidSong,
  addVote,
  removeVote,
  getTopMusics,
};
