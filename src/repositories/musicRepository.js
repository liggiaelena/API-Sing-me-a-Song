import connection from '../database.js';

async function addMusic(name, youtubeLink) {
  const music = await connection.query(`
    INSERT INTO musics (name, youtube_link) VALUES ($1, $2) RETURNING *;
  `, [name, youtubeLink]);

  await connection.query(`
    INSERT INTO scores (music_id, score) VALUES ($1, $2);
  `, [music.rows[0].id, 0]);
}

async function findSongById(id) {
  const song = await connection.query(`
    SELECT * FROM musics WHERE id = $1;
  `, [id]);
  return (song.rows[0]?.id || false);
}

async function findScoreByMusicId(id) {
  const song = await connection.query(`
    SELECT * FROM scores WHERE music_id = $1;
  `, [id]);
  return (song.rows[0].score);
}

async function updateVote(id, newScore) {
  await connection.query(`
    UPDATE scores SET score = $2 WHERE music_id = $1;
  `, [id, newScore]);
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

export {
  addMusic,
  findSongById,
  findScoreByMusicId,
  updateVote,
  deleteSong,
  getTopMusics,
};
