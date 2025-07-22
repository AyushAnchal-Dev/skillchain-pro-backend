import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const challenges = [];

router.post('/post-challenge', (req, res) => {
  const { title, description, deadline, reward, tags } = req.body;

  if (!title || !description)
    return res.status(400).json({ error: 'Title and description required.' });

  const newChallenge = {
    id: uuidv4(),
    title,
    description,
    deadline: deadline || 'No deadline',
    reward: reward || 'No reward',
    tags: tags || [],
    postedAt: new Date().toISOString(),
  };

  challenges.push(newChallenge);
  res.status(201).json({ message: 'Challenge posted successfully.', challenge: newChallenge });
});

router.get('/challenges', (req, res) => {
  res.status(200).json(challenges);
});

router.get('/challenges/:id', (req, res) => {
  const { id } = req.params;
  const challenge = challenges.find(ch => ch.id === id);
  if (!challenge) return res.status(404).json({ error: 'Challenge not found.' });
  res.json(challenge);
});

export default router;