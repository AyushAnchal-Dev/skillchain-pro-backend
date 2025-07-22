import express from 'express';
import { submissions, pending } from './dataStore.js';

const router = express.Router();

// ✅ Submit a new solution
router.post('/submit', (req, res) => {
  const { challengeId, solution, submittedAt, studentName, challengeTitle } = req.body;

  if (!studentName || !challengeTitle || !solution || !submittedAt) {
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
    _id: Date.now(), // Will be used by verifier to identify
    student: studentName,
    challenge: challengeTitle,
    solution,
    status: 'Pending',
  });

  res.status(200).json({
    message: '✅ Submission received and sent for verification.',
    submission,
  });
});

// ✅ Get all submissions
router.get('/submissions', (req, res) => {
  res.json(submissions);
});

// ✅ Update status of a submission (used internally or by verifier)
router.post('/update-status', (req, res) => {
  const { submissionIndex, status } = req.body;

  if (
    typeof submissionIndex !== 'number' ||
    !['Approved', 'Rejected', 'Pending'].includes(status)
  ) {
    return res.status(400).json({ error: 'Invalid status update request.' });
  }

  if (submissions[submissionIndex]) {
    submissions[submissionIndex].status = status;
    return res.status(200).json({ message: '✅ Status updated successfully.' });
  }

  res.status(404).json({ error: 'Submission not found.' });
});

export default router;