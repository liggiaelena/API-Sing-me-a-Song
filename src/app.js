import express from 'express';
import cors from 'cors';
import * as musicControllers from './controllers/musicControllers.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.post('/recommendations', musicControllers.addMusic);
app.post('/recommendations/:id/upvote', musicControllers.addVote);
app.post('/recommendations/:id/downvote', musicControllers.removeVote);
app.get('/recommendations/top/:amount', musicControllers.getTopMusics);

export default app;
