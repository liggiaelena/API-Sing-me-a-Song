/* eslint-disable no-undef */
import * as musicService from '../src/services/musicService.js';
import * as musicRepository from '../src/repositories/musicRepository.js';

const sut = musicService;

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
});
