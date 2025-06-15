/* eslint-disable no-underscore-dangle */
import express from 'express';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'; // Adicione esta linha

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.enable('trust proxy');
app.use((req, res, next) => {
  // Debug: log dos cabeçalhos
  console.log('Headers recebidos:', req.headers);
  next();
});

app.use(compression());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    skip: (req) => req.path !== '/login',
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.use(
  express.static(path.join(__dirname, 'dist'), {
    etag: true,
    lastModified: true,
    maxAge: '1y',
    setHeaders: (res, filePath) => {
      if (filePath.includes('index.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    },
  }),
);

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');

  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }

  console.error(`index.html não encontrado em: ${indexPath}`);
  res.status(500).send('Erro interno: index.html não encontrado');
  return res.status(500).send('Erro interno: index.html não encontrado');
});

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');

  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }

  res.status(404).send('Página não encontrada');
  return res.status(404).send('Página não encontrada');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);

  console.log('Caminho completo para index.html:', path.join(__dirname, 'dist', 'index.html'));
});
