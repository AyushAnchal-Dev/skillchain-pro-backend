import express from 'express';
import { pending, verified } from './dataStore.js';

const router = express.Router();

// GET: All pending submissions
router.get('/pending', (req, res) => {
  res.json(pending);
});

// POST: Verify submission and mock-mint NFT
router.post('/verify', (req, res) => {
  console.log('Verifying item:', req.body);
  const { _id, student, challenge, solution } = req.body;

  if (!_id || !student || !challenge || !solution) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const index = pending.findIndex(p => Number(p._id) === Number(_id));
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found in pending list.' });
  }

  const nftLink = `https://icp.network/nft/${_id}`; // This matches front-end logic

  const verifiedItem = {
    _id,
    student,
    challenge,
    solution,
    verifier: 'VerifierX',
    nftLink,
  };

  verified.push(verifiedItem);
  pending.splice(index, 1);

  res.status(200).json({ message: 'Verified and NFT minted', item: verifiedItem });
});

// GET: All verified NFTs
router.get('/nfts', (req, res) => {
  res.json(verified);
});

// ✅ NEW: GET NFT by ID
router.get('/nft/:id', (req, res) => {
  const { id } = req.params;
  const nft = verified.find(item => String(item._id) === String(id));

  if (!nft) {
    return res.status(404).json({ error: 'NFT not found' });
  }

  res.json(nft);
});

export default router;