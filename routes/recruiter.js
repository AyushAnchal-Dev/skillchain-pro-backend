 import express from 'express';
const router = express.Router();

const challenges = [];

router.post('/post-challenge', (req, res) => {
  const { title, description, deadline, reward, tags } = req.body;
  if (!title || !description)
    return res.status(400).json({ error: 'Title and description required.' });

  const newChallenge = {
    id: challenges.length + 1,
    title,
    description,
    deadline,
    reward,
    tags,
  };
  challenges.push(newChallenge);
  res.status(201).json({ message: 'Challenge posted successfully.' });
});

router.get('/challenges', (req, res) =>
   { res.status(200).json(challenges);

    });

export default router;