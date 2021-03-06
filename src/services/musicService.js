import * as musicRepository from '../repositories/musicRepository.js';

function isYoutubeVideo(url) {
  const v = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const isValid = url.match(v);
  return !!isValid;
}

async function addVote(id) {
  const score = await musicRepository.findScoreByMusicId(id);
  const newScore = score + 1;
  const music = await musicRepository.updateVote(id, newScore);
  return music;
}

async function removeVote(id) {
  const score = await musicRepository.findScoreByMusicId(id);
  const newScore = score - 1;
  if (newScore < -5) {
    await musicRepository.deleteSong(id);
    return null;
  }
  const music = await musicRepository.updateVote(id, newScore);
  return music;
}

async function getRandomMusic() {
  const aux = parseInt(Math.random() * (11 - 0), 10);
  const musics = await musicRepository.getAllMusics();

  const musicsWithGreatScores = musics.filter((m) => m.score >= 10);
  const musicsUntilScore10 = musics.filter((m) => m.score <= 10);

  if (musicsWithGreatScores.length === 0 || musicsUntilScore10.length === 0) {
    const index = Math.floor(Math.random() * musics.length);
    return musics[index];
  }

  if (aux <= 7) {
    const index = Math.floor(Math.random() * musicsWithGreatScores.length);
    return musicsWithGreatScores[index];
  }

  const index = Math.floor(Math.random() * musicsUntilScore10.length);
  return musicsUntilScore10[index];
}

export {
  isYoutubeVideo,
  addVote,
  removeVote,
  getRandomMusic,
};
