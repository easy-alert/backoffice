/* eslint-disable no-underscore-dangle */
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));

// Para rotas SPA (React Router), tratando para que só o index.html seja retornado
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, 'dist', req.url);
  res.sendFile(filePath, (err) => {
    if (err) {
      // Se o arquivo não for encontrado, servir o index.html
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
