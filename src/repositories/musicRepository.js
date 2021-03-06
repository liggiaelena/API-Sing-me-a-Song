import connection from '../database.js';

async function addMusic(name, youtubeLink) {
  const music = await connection.query(`
    INSERT INTO musics (name, youtube_link) VALUES ($1, $2) RETURNING *;
  `, [name, youtubeLink]);

  await connection.query(`
    INSERT INTO scores (music_id, score) VALUES ($1, $2);
  `, [music.rows[0].id, 0]);
}

async function findSongByName(name) {
  const song = await connection.query(`
    SELECT * FROM musics WHERE name = $1;
  `, [name]);
  return (!!song.rows[0]);
}

async function findSongByYoutubeLink(url) {
  const song = await connection.query(`
    SELECT * FROM musics WHERE youtube_link = $1;
  `, [url]);
  return (!!song.rows[0]);
}

async function findSongById(id) {
  const song = await connection.query(`
    SELECT * FROM musics WHERE id = $1;
  `, [id]);
  return (!!song.rows[0]);
}

async function findScoreByMusicId(id) {
  const song = await connection.query(`
    SELECT * FROM scores WHERE music_id = $1;
  `, [id]);
  return (song.rows[0].score);
}

async function updateVote(id, newScore) {
  const music = await connection.query(`
    UPDATE scores SET score = $2 WHERE music_id = $1 RETURNING *;
  `, [id, newScore]);
  return music.rows[0];
}

async function deleteSong(id) {
  await connection.query(`
    DELETE FROM scores WHERE music_id = $1;
  `, [id]);
  await connection.query(`
    DELETE FROM musics WHERE id = $1;
  `, [id]);
}

async function getTopMusics(amount) {
  const musics = await connection.query(`
  SELECT musics.*, scores.score FROM musics 
    JOIN scores
      ON musics.id = scores.music_id
    ORDER BY scores.score DESC 
    LIMIT $1;
  `, [amount]);
  return musics.rows;
}

async function getAllMusics() {
  const musics = await connection.query(`
  SELECT musics.*, scores.score FROM musics 
    JOIN scores
      ON musics.id = scores.music_id;
  `);
  return musics.rows;
}

export {
  addMusic,
  findSongByName,
  findSongByYoutubeLink,
  findSongById,
  findScoreByMusicId,
  updateVote,
  deleteSong,
  getTopMusics,
  getAllMusics,
};
