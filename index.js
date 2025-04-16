/* eslint-disable no-underscore-dangle */
import express from 'express';
import rateLimit from 'express-rate-limit';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Enable trust proxy
app.set('trust proxy', 1); // Trust first proxy

// Initialize the rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
  message: 'Muitas requisições feitas. Tente novamente mais tarde.',
});

// Apply the rate limiter to all requests
app.use(limiter);

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to serve your index.html for a single-page application, for instance
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
