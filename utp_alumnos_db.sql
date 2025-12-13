-- 1. Crear la Base de Datos
CREATE DATABASE IF NOT EXISTS utp_alumnos_db;

-- 2. Usar la Base de Datos
USE utp_alumnos_db;

-- 3. Crear nuestra tabla 'student'
CREATE TABLE student (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  course VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Crear la tabla 'grades' (notas)
CREATE TABLE IF NOT EXISTS grades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  course VARCHAR(255) NOT NULL,
  score DECIMAL(5,2) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE
);

-- 1. Asegúrate de estar usando la base de datos correcta
USE utp_alumnos_db;

-- 2. Inserta un alumno de prueba
INSERT INTO student (name, course)
VALUES ('Carlos Mercedes', 'JavaScript Avanzado');

-- 3. (Opcional) Verifica que se insertó
SELECT * FROM student;

-- 4. Inserta notas de prueba en la tabla grades
INSERT INTO grades (student_id, course, score)
VALUES 
  (1, 'Matemáticas', 18.5),
  (1, 'Física', 16.0),
  (2, 'JavaScript Avanzado', 19.5),
  (2, 'Base de Datos', 17.0);

-- 5. (Opcional) Verifica las notas insertadas
SELECT * FROM grades;
