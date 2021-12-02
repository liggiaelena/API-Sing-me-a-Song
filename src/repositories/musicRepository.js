import connection from '../database.js';

async function addMusic(name, youtubeLink) {
  const music = await connection.query(`
    INSERT INTO musics (name, youtube_link) VALUES ($1, $2) RETURNING *;
  `, [name, youtubeLink]);

  await connection.query(`
    INSERT INTO scores (music_id, score) VALUES ($1, $2);
  `, [music.rows[0].id, 0]);
}

export{
    addMusic,
}