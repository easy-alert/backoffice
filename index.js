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

// 1. Configuração essencial
app.set('trust proxy', true);

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

// 4. Servir arquivos estáticos
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

// 5. Rota explícita para a raiz - SOLUÇÃO CHAVE!
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');

  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }

  console.error(`index.html não encontrado em: ${indexPath}`);
  res.status(500).send('Erro interno: index.html não encontrado');
  return res.status(500).send('Erro interno: index.html não encontrado');
});

// 6. Fallback SPA para outras rotas
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');

  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }

  res.status(404).send('Página não encontrada');
  return res.status(404).send('Página não encontrada');
});

// 7. Inicialização do servidor
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);

  // Log adicional para debug
  console.log('Caminho completo para index.html:', path.join(__dirname, 'dist', 'index.html'));
});
