import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import recruiterRoutes from './routes/recruiter.js';
import studentRoutes from './routes/student.js';
import verifierRoutes from './routes/verifier.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Add ICP deployed frontend URLs here
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://bd3sg-teaaa-aaaaa-qaaba-cai.icp0.io',  // Deployed ICP frontend URL
  'https://icp0.io',
  'https://*.icp0.io',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.endsWith('.icp0.io')) {
      return callback(null, true);
    } else {
      console.log('❌ CORS blocked for origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// ✅ Allow preflight OPTIONS
app.options('*', cors());

// ✅ Middleware
app.use(express.json());
app.use(bodyParser.json());

// ✅ Routes
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/verifier', verifierRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('✅ SkillChain Backend is running');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});