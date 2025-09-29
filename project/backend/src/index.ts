import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola desde Express');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hola desde Express (TS)' });
});

app.get('/api/greet/:name', (req, res) => {
  const { name } = req.params;
  res.json({ message: `Hola, ${name} desde Express` });
});

app.listen(PORT, () => {
  console.log(`Servidor TS en http://localhost:${PORT}`);
});
