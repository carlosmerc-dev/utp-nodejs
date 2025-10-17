import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ping básico
app.get("/", (_req, res) => {
  res.json({ ok: true, service: "backend-ts" });
});

// endpoint que consumirá Angular
app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hola desde Node + TypeScript" });
});

// ejemplo: colección simple
type Todo = { id: number; title: string; done: boolean };
const todos: Todo[] = [
  { id: 1, title: "Aprender TS", done: true },
  { id: 2, title: "Conectar Angular", done: true },
  { id: 3, title: "Siguientes pasos", done: false }
];

app.get("/api/todos", (_req, res) => res.json(todos));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));