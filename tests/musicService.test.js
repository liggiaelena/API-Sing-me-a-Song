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
  score: 11,
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

  it('addVote shoulde return music with a score 8 when entry is 7', async () => {
    jest.spyOn(musicRepository, 'findScoreByMusicId').mockImplementationOnce(() => 7);
    jest.spyOn(musicRepository, 'updateVote').mockImplementationOnce(() => ({ id: 1, music_id: 1, score: 8 }));
    const result = await sut.addVote();
    expect(result.score).toBe(8);
  });

  it('removeVote shoulde return music with a score 6 when entry is 7', async () => {
    jest.spyOn(musicRepository, 'findScoreByMusicId').mockImplementationOnce(() => 7);
    jest.spyOn(musicRepository, 'updateVote').mockImplementationOnce(() => ({ id: 1, music_id: 1, score: 6 }));
    const result = await sut.removeVote();
    expect(result.score).toBe(6);
  });

  it('removeVote shoulde return null when entry is -4', async () => {
    jest.spyOn(musicRepository, 'findScoreByMusicId').mockImplementationOnce(() => -4);
    jest.spyOn(musicRepository, 'deleteSong').mockImplementation();
    const result = await sut.removeVote();
    expect(result).toBeNull();
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

  it('getRandomMusic an return music with scores =>10 and aux 8 if there is no musics with lower score', async () => {
    jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.8);
    jest.spyOn(musicRepository, 'getAllMusics').mockImplementationOnce(() => musicsWhitGreatScores);
    const result = await sut.getRandomMusic();
    expect(result.score).toBeGreaterThanOrEqual(10);
  });
});
