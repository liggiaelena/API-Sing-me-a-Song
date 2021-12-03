/* eslint-disable no-undef */
import * as musicService from '../src/services/musicService.js';
import * as musicRepository from '../src/repositories/musicRepository.js';

const sut = musicService;
const musics = [{
  id: 1,
  name: 'Bairro Novo - Haja Luz',
  youtube_link: 'https://www.youtube.com/',
  score: 21,
},
{
  id: 10,
  name: 'Patricia Romania - Apaixonado',
  youtube_link: 'https://www.youtube.com/',
  score: 1,
}];
const musicsWhitGreatScores = [{
  id: 1,
  name: 'Bairro Novo - Haja Luz',
  youtube_link: 'https://www.youtube.com/',
  score: 21,
},
{
  id: 10,
  name: 'Patricia Romania - Apaixonado',
  youtube_link: 'https://www.youtube.com/',
  score: 10,
}];

describe('Music Service', () => {
  it('isYoutubeVideo shoulde return false when url is invalid', () => {
    const url = 'http:/something.com';
    const result = sut.isYoutubeVideo(url);
    expect(result).toBe(false);
  });

  it('isYoutubeVideo shoulde return true when url is valid', () => {
    const url = 'https://www.youtube.com/watch?v=fhyaIJNyR_w&ab_channel=UNASP';
    const result = sut.isYoutubeVideo(url);
    expect(result).toBe(true);
  });

  it('isValidSong shoulde return false when id nonexistent', async () => {
    jest.spyOn(musicRepository, 'findSongById').mockImplementationOnce(() => false);
    const result = await sut.isValidSong();
    expect(result).toBe(false);
  });

  it('isValidSong shoulde return false when id nonexistent', async () => {
    jest.spyOn(musicRepository, 'findSongById').mockImplementationOnce(() => true);
    const result = await sut.isValidSong();
    expect(result).toBe(true);
  });

  it('getTopMusics shoulde return [] when there is no musics', async () => {
    const amount = 10;
    jest.spyOn(musicRepository, 'getTopMusics').mockImplementationOnce(() => []);
    const result = await sut.getTopMusics(amount);
    expect(result.length).toBe(0);
  });

  it('getTopMusics shoulde return max 10 musics when amount is 10', async () => {
    const amount = 10;
    jest.spyOn(musicRepository, 'getTopMusics').mockImplementationOnce(() => [{ id: 10 }]);
    const result = await sut.getTopMusics(amount);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('getRandomMusic shoulde return music with a score grater or equal 10 when aux is 7', async () => {
    jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.7);
    jest.spyOn(musicRepository, 'getAllMusics').mockImplementationOnce(() => musics);
    const result = await sut.getRandomMusic();
    expect(result.score).toBeGreaterThanOrEqual(10);
  });

  it('getRandomMusic shoulde return music with a score less or equal 10 when aux is 8', async () => {
    jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.8);
    jest.spyOn(musicRepository, 'getAllMusics').mockImplementationOnce(() => musics);
    const result = await sut.getRandomMusic();
    expect(result.score).toBeLessThanOrEqual(10);
  });

  it('getRandomMusic shoulde return music with any score if there is no musics with a lower score', async () => {
    jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.8);
    jest.spyOn(musicRepository, 'getAllMusics').mockImplementationOnce(() => musicsWhitGreatScores);
    const result = await sut.getRandomMusic();
    expect(result.score).toBeGreaterThanOrEqual(-4);
  });
});
it('getRandomMusic shoulde return music with a score less or equal 10 when aux is 8', async () => {
  jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.8);
  jest.spyOn(musicRepository, 'getAllMusics').mockImplementationOnce(() => musics);
  const result = await sut.getRandomMusic();
  expect(result.score).toBeLessThanOrEqual(10);
});
