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
  max: 200, // max 200 requests per windowMs
  message: 'Muitas requisições feitas. Tente novamente mais tarde.', // message to send when rate limit is exceeded
  skip: (req) => req.path !== '/login', // skip rate limiting for the login path
  handler: (req, res, next, options) => {
    console.warn(`Rate limit exceeded for ${req.ip} on ${req.path}`);

    res.status(options.statusCode).json({
      message: options.message,
    });
  },
});

// Apply the rate limiter to all requests
app.use(limiter);

// Serve hashed assets with long cache
app.use(
  express.static(path.join(__dirname, 'dist'), {
    maxAge: '1y',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('index.html')) {
        // (Optional) tighten index.html caching if needed
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  }),
);

// Only handle client-side routes (no “.” in path)
app.get('/*', (req, res, next) => {
  if (path.extname(req.path)) return next();

  return res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
