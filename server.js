import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import recruiterRoutes from './routes/recruiter.js';
import studentRoutes from './routes/student.js';
import verifierRoutes from './routes/verifier.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());


// Mounting routes
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/verifier', verifierRoutes);

app.get('/', (req, res) => {
  res.send('SkillChain Backend is running ✅');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});