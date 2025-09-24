// src/index.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON (aunque en este caso no lo usamos, es buena práctica)
app.use(express.json());

// Ruta GET /ping → responde con JSON { message: "pong" }
app.get('/ping', (req, res) => {
  return res.json({ message: "pong" });
});

// Ruta GET /hello/:name → responde con JSON { message: "Hola, <name>" }
app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  if (!name || name.trim() === "") {
    // Si no se proporciona nombre o está vacío → error 400
    return res.status(400).json({ error: "Se requiere nombre en la ruta" });
  }
  // Si nombre válido:
  return res.json({ message: `Hola, ${name}` });
});

// Ruta /hello sin parámetro concreto (opcional, si alguien invoca /hello sin nombre)
// Podrías capturar:
app.get('/hello', (req, res) => {
  return res.status(400).json({ error: "Se requiere nombre en la ruta" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});