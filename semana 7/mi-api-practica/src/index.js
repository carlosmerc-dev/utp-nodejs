const express = require('express');
const app = express();
const port = 3000;

// Ruta GET /ping
app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

// Ruta GET /hello/:name
app.get('/hello/:name', (req, res) => {
    const name = req.params.name;
    res.json({ message: `Hola, ${name}` });
});

// Ruta GET /hello
app.get('/hello', (req, res) => {
    res.status(400).json({ error: 'Se requiere nombre en la ruta' });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});