const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar JSON entrante
app.use(express.json());

// Ruta de salud
app.get('/health', (req, res) => {
    res.status(200).json({ ok: true, uptime: process.uptime() });
});

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Hola desde UTP - Desde el curso de JavaScript avanzado');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Ruta POST de ejemplo
app.post('/api/echo', (req, res) => {
    const data = req.body;
    if (!data) return res.status(400).json({ error: 'Body requerido' });
    res.status(200).json({ received: data });
});
