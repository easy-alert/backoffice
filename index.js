/* eslint-disable no-underscore-dangle */
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8081;

// Servir arquivos estáticos (build do Vite)
app.use((req, res, next) => {
  if (/(.ico|.js|.css|.jpg|.png|.map|.svg)$/i.test(req.path)) {
      next();
  } else {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

app.use(express.static(path.join(__dirname, 'dist')))

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
