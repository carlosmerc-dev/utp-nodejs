import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hola desde Express - Soy del curso de JavaScript Avanzado');
});

app.get('/api/hello', (_req: Request, res: Response) => {
  res.json({ message: 'Hola desde Express (TS)' });
});

app.get('/api/greet/:name', (req: Request, res: Response) => {
  const { name } = req.params;
  res.json({ message: `Hola, ${name} desde Express` });
});

app.listen(PORT, () => {
  console.log(`Servidor TS en http://localhost:${PORT}`);
});
