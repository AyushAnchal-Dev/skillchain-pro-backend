import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import recruiterRoutes from './routes/recruiter.js';
import studentRoutes from './routes/student.js';
import verifierRoutes from './routes/verifier.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Define your allowed frontend domains here
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:4943'  // 🔁 Replace with your real deployed frontend ICP URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// ✅ Optional: Allow preflight OPTIONS
app.options('*', cors());

// ✅ Middleware
app.use(express.json());
app.use(bodyParser.json());

// ✅ Mount routes
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/verifier', verifierRoutes);

// ✅ Default route
app.get('/', (req, res) => {
  res.send('SkillChain Backend is running ✅');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});