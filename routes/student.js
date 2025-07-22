import express from 'express';
import { submissions, pending } from './dataStore.js';

const router = express.Router();

router.post('/submit', (req, res) => {
  const { challengeId, solution, submittedAt, studentName, challengeTitle } = req.body;

  if (!studentName || !challengeTitle || !solution) {
    return res.status(400).json({ error: 'Missing required submission fields.' });
  }

  const submission = {
    challengeId,
    solution,
    submittedAt,
    status: 'Pending',
    student: studentName,
    challenge: challengeTitle,
  };

  submissions.push(submission);

  pending.push({
    _id: Date.now(),
    student: studentName,
    challenge: challengeTitle,
    solution,
  });

  res.status(200).json({
    message: 'Submission received and sent for verification.',
    submission,
  });
});

router.get('/submissions', (req, res) => {
  res.json(submissions);
});

router.post('/update-status', (req, res) => {
  const { submissionIndex, status } = req.body;
  if (submissions[submissionIndex]) {
    submissions[submissionIndex].status = status;
    return res.status(200).json({ message: 'Status updated.' });
  }
  res.status(404).json({ error: 'Submission not found.' });
});

export default router;