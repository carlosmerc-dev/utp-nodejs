import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/hello', (_req: Request, res: Response) => {
  res.send('Hola Mundo - Soy Carlos Mercedes del curso de JavaScript Avanzado');
});

app.listen(PORT, () => {
  console.log(`Servidor TS en http://localhost:${PORT}`);
});
