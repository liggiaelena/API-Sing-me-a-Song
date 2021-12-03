import { musicValidation, amountValidation } from '../validations/musicSchema.js';
import * as musicService from '../services/musicService.js';
import * as musicRepository from '../repositories/musicRepository.js';

async function addMusic(req, res) {
  const {
    name,
    youtubeLink,
  } = req.body;

  const validation = musicValidation.validate(req.body);
  if (validation.error) {
    res.status(400).send({
      message: validation.error.details[0].message,
    });
    return;
  }

  try {
    const isValid = musicService.isYoutubeVideo(youtubeLink);
    if (!isValid) {
      res.sendStatus(404);
      return;
    }

    const alreadyExistName = await musicRepository.findSongByName(name);
    const alreadyExistUrl = await musicRepository.findSongByYoutubeLink(youtubeLink);

    if (alreadyExistName || alreadyExistUrl) {
      res.sendStatus(409);
    }

    await musicRepository.addMusic(name, youtubeLink);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function addVote(req, res) {
  const { id } = req.params;

  if (!Number(id)) {
    res.sendStatus(400);
    return;
  }

  try {
    const exist = await musicService.isValidSong(id);
    if (!exist) {
      res.sendStatus(404);
      return;
    }

    await musicService.addVote(id);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function removeVote(req, res) {
  const { id } = req.params;

  if (!Number(id)) {
    res.sendStatus(400);
    return;
  }

  try {
    const exist = await musicService.isValidSong(id);
    if (!exist) {
      res.sendStatus(404);
      return;
    }

    await musicService.removeVote(id);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function getTopMusics(req, res) {
  const { amount } = req.params;

  const validation = amountValidation.validate(Number(amount));
  if (validation.error) {
    res.sendStatus(400);
    return;
  }

  try {
    const musics = await musicService.getTopMusics(amount);
    res.status(200).send(musics);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function getRandomMusic(req, res) {
  try {
    const music = await musicService.getRandomMusic();
    res.status(200).send(music);
  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  addMusic,
  addVote,
  removeVote,
  getTopMusics,
  getRandomMusic,
};
