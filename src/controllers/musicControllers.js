import { musicValidation } from '../validations/musicSchema.js';
import * as musicService from '../services/musicService.js';

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
  }

  try {
    const isValid = musicService.isYoutubeVideo(youtubeLink);
    if (!isValid) {
      res.sendStatus(404);
    }

    await musicService.addMusic(name, youtubeLink);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}

// async function addVote(req, res) {

// }

// async function removeVote(req, res) {

// }

export {
  addMusic,
//   addVote,
//   removeVote,
};
