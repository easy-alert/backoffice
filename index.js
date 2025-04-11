import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 8081;

app.use(express.static(path.join(__dirname, 'dist')));

// Para rotas SPA (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
