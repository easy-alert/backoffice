/* eslint-disable no-underscore-dangle */
import express from 'express';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// 1. Configuração essencial para Cloud Run
app.set('trust proxy', true); // Confia em todos os proxies

// 2. Middlewares
app.use(compression());

// 3. Rate limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    skip: (req) => req.path !== '/login',
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

// 4. Servir arquivos estáticos com cache inteligente
app.use(
  express.static(path.join(__dirname, 'dist'), {
    etag: true,
    lastModified: true,
    maxAge: '1y',
    setHeaders: (res, filePath) => {
      if (filePath.includes('index.html')) {
        // Desabilita cache para index.html
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      } else if (/\.[a-f0-9]{8,}\.(js|css|png|svg|woff2?)$/i.test(filePath)) {
        // Assets com hash: cache longo
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    },
  }),
);

// 5. Fallback SPA corrigido para Cloud Run
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 6. Inicialização do servidor
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
