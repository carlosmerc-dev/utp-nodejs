import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise'; // ¡Importamos la versión con Promesas!
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

// --- Configuración de Swagger ---
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Final de CARLOS MERCEDES',
      version: '1.0.0',
      description: 'Documentación completa de la API de gestión de alumnos y notas - Proyecto Final',
      contact: {
        name: 'Carlos Mercedes',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./src/index.ts'], // Archivos donde están las rutas documentadas
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// --- Configuración de la Conexión ---
// Creamos un "Pool" de conexiones. Es más eficiente que crear una por cada query.
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Tu usuario de MySQL
  password: '', // Tu contraseña de MySQL
  database: 'utp_alumnos_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const app = express();

// Middlewares
app.use(express.json()); // Para entender JSON
app.use(cors());         // Para permitir peticiones (ej: de React)

// Ruta de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del alumno
 *         name:
 *           type: string
 *           description: Nombre completo del alumno
 *         course:
 *           type: string
 *           description: Curso al que pertenece el alumno
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de registro
 *       example:
 *         id: 1
 *         name: Carlos Mercedes
 *         course: JavaScript Avanzado
 *         createdAt: 2025-12-12T10:30:00.000Z
 *     Grade:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado de la nota
 *         student_id:
 *           type: integer
 *           description: ID del alumno
 *         course:
 *           type: string
 *           description: Nombre del curso
 *         score:
 *           type: number
 *           format: float
 *           description: Nota obtenida (0-20)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de registro
 *       example:
 *         id: 1
 *         student_id: 1
 *         course: Matemáticas
 *         score: 18.5
 *         createdAt: 2025-12-12T10:30:00.000Z
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Obtener todos los alumnos
 *     description: Retorna la lista completa de alumnos registrados en la base de datos
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Lista de alumnos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Error al obtener los alumnos
 */
// ENDPOINT 1: Obtener todos los alumnos (Read)
app.get('/api/students', async (req, res) => {
  try {
    // 1. Definimos el SQL
    const query = "SELECT * FROM student ORDER BY createdAt DESC";

    // 2. Ejecutamos el query usando el pool
    const [rows] = await pool.query(query);

    // 3. Respondemos con los datos (rows)
    res.json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los alumnos' });
  }
});

/**
 * @swagger
 * /api/students/total/count:
 *   get:
 *     summary: Obtener el conteo total de alumnos
 *     description: Retorna el número total de alumnos registrados
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Conteo obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: Error al obtener el conteo
 */
// ENDPOINT 2: Obtener el conteo total de alumnos
app.get('/api/students/total/count', async (req, res) => {
  try {
    // Usamos SELECT COUNT(*) para obtener el total de registros
    const query = "SELECT COUNT(*) as total FROM student";
    const [rows] = await pool.query(query);
    
    // Respondemos con el formato { "total": 5 }
    res.json({ total: (rows as any)[0].total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el conteo de alumnos' });
  }
});

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Crear un nuevo alumno
 *     description: Registra un nuevo alumno en la base de datos (usa placeholders para prevenir SQL Injection)
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - course
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre completo del alumno
 *                 example: Carlos Mercedes
 *               course:
 *                 type: string
 *                 description: Curso al que pertenece
 *                 example: JavaScript Avanzado
 *     responses:
 *       201:
 *         description: Alumno creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newId:
 *                   type: integer
 *                   example: 6
 *                 name:
 *                   type: string
 *                   example: Carlos Mercedes
 *                 course:
 *                   type: string
 *                   example: JavaScript Avanzado
 *       500:
 *         description: Error al crear el alumno
 */
// ENDPOINT 3: Crear un nuevo alumno (Create) - MODO SEGURO
app.post('/api/students', async (req, res) => {
  try {
    const { name, course } = req.body;

    // 1. Definimos el SQL con Placeholders (?)
    const query = "INSERT INTO student (name, course) VALUES (?, ?)";

    // 2. Pasamos los valores en un array separado
    const [result] = await pool.query(query, [name, course]);

    // 3. Respondemos con el nuevo ID (opcional)
    res.status(201).json({ newId: (result as any).insertId, name, course });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el alumno' });
  }
});

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Eliminar un alumno
 *     description: Elimina un alumno por su ID (usa placeholders para prevenir SQL Injection)
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del alumno a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Alumno eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Alumno con id 1 eliminado
 *       500:
 *         description: Error al eliminar el alumno
 */
// ENDPOINT 4: Eliminar un alumno (Delete)
app.delete('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM student WHERE id = ?";
    await pool.query(query, [id]); // Pasamos [id] como array
    res.json({ message: `Alumno con id ${id} eliminado` });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el alumno' });
  }
});

/**
 * @swagger
 * /api/grades:
 *   post:
 *     summary: Registrar una nueva nota
 *     description: Registra una nota para un alumno específico (usa placeholders para prevenir SQL Injection)
 *     tags: [Grades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - course
 *               - score
 *             properties:
 *               student_id:
 *                 type: integer
 *                 description: ID del alumno
 *                 example: 1
 *               course:
 *                 type: string
 *                 description: Nombre del curso
 *                 example: Matemáticas
 *               score:
 *                 type: number
 *                 format: float
 *                 description: Nota obtenida (0-20)
 *                 example: 18.5
 *     responses:
 *       201:
 *         description: Nota registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Nota registrada exitosamente
 *                 gradeId:
 *                   type: integer
 *                   example: 1
 *                 student_id:
 *                   type: integer
 *                   example: 1
 *                 course:
 *                   type: string
 *                   example: Matemáticas
 *                 score:
 *                   type: number
 *                   example: 18.5
 *       400:
 *         description: Faltan campos requeridos
 *       500:
 *         description: Error al registrar la nota
 */
// ENDPOINT 5: Registrar una nueva nota (Create) - POST /api/grades
app.post('/api/grades', async (req, res) => {
  try {
    const { student_id, course, score } = req.body;

    // Validación básica
    if (!student_id || !course || score === undefined) {
      return res.status(400).json({ error: 'Faltan campos requeridos: student_id, course, score' });
    }

    // SQL con placeholders (?) para evitar SQL Injection
    const query = "INSERT INTO grades (student_id, course, score) VALUES (?, ?, ?)";

    // Ejecutar la consulta con valores seguros
    const [result] = await pool.query(query, [student_id, course, score]);

    // Responder con el registro creado
    res.status(201).json({ 
      message: 'Nota registrada exitosamente',
      gradeId: (result as any).insertId, 
      student_id, 
      course, 
      score 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar la nota' });
  }
});

/**
 * @swagger
 * /api/grades/student/{student_id}:
 *   get:
 *     summary: Ver notas de un alumno
 *     description: Obtiene todas las notas registradas de un alumno específico (usa placeholders para prevenir SQL Injection)
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del alumno
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de notas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 *       500:
 *         description: Error al obtener las notas del alumno
 */
// ENDPOINT 6: Ver notas de un alumno (Read) - GET /api/grades/student/:student_id
app.get('/api/grades/student/:student_id', async (req, res) => {
  try {
    const { student_id } = req.params;

    // SQL con placeholder para obtener todas las notas del alumno
    const query = "SELECT * FROM grades WHERE student_id = ? ORDER BY createdAt DESC";

    // Ejecutar la consulta
    const [rows] = await pool.query(query, [student_id]);

    // Responder con la lista de notas
    res.json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las notas del alumno' });
  }
});
