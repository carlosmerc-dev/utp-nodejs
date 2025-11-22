import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise'; // ¡Importamos la versión con Promesas!

// --- Configuración de la Conexión ---
// Creamos un "Pool" de conexiones. Es más eficiente que crear una por cada query.
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Tu usuario de MySQL
  password: '', // Tu contraseña de MySQL
  database: 'catalogo_motorcycle_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const app = express();

// Middlewares
app.use(express.json());   // Para entender JSON
app.use(cors());           // Para permitir peticiones (ej: de React)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server corriendo en http://localhost:${PORT}`);
});

// ENDPOINT 1: Obtener todas las motocicletas (Read)
app.get('/api/motorcycles', async (req, res) => {
  try {
    // 1. Definimos el SQL
    const query = "SELECT * FROM motorcycle ORDER BY createdAt DESC";

    // 2. Ejecutamos el query usando el pool
    const [rows] = await pool.query(query);

    // 3. Respondemos con los datos (rows)
    res.json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las motocicletas' });
  }
});

// ENDPOINT 2: Crear una nueva motocicleta (Create) - MODO SEGURO
app.post('/api/motorcycles', async (req, res) => {
  try {
    const { marca, modelo, imageUrl } = req.body;

    // 1. Definimos el SQL con Placeholders (?)
    const query = "INSERT INTO motorcycle (marca, modelo, imageUrl) VALUES (?, ?, ?)";

    // 2. Pasamos los valores en un array separado
    const [result] = await pool.query(query, [marca, modelo, imageUrl || null]);

    // 3. Respondemos con el nuevo ID y todos los datos
    res.status(201).json({ 
      id: (result as any).insertId, 
      marca, 
      modelo,
      imageUrl: imageUrl || null 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la motocicleta' });
  }
});

// ENDPOINT 3: Eliminar una motocicleta (Delete)
app.delete('/api/motorcycles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM motorcycle WHERE id = ?";
    await pool.query(query, [id]); // Pasamos [id] como array
    res.json({ message: `Motocicleta con id ${id} eliminada` });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la motocicleta' });
  }
});
