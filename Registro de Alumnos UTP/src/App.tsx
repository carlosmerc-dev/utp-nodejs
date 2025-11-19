import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";

import axios from "axios";

// Importamos el CONTEXTO (el Provider) y el TIPO
import { StudentContext, type Student } from "./context/StudentContext";

// Definimos la URL base de nuestra API
const API_URL = "http://localhost:3000/api/students";

function App() {
  // El estado principal sigue viviendo aquí
  const [students, setStudents] = useState<Student[]>([]);

  // ==========================================================
  // TAREA 1: Cargar Alumnos al montar (GET)
  // ==========================================================
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(API_URL);
        setStudents(response.data); // ¡Cargamos desde la API!
      } catch (error) {
        console.error("Error al cargar alumnos:", error);
      }
    };
    fetchStudents();
  }, []); // <-- Array de dependencias VACÍO. Se ejecuta 1 SOLA VEZ al montar.

  // 3. Función para Añadir Alumnos (POST)
  const handleAddStudent = async (name: string, course: string) => {
    try {
      const newStudent = { name, course };
      // Hacemos el POST y la API nos devuelve el alumno creado
      const response = await axios.post(API_URL, newStudent);

      // Añadimos el nuevo alumno (que viene de la BD) al estado
      setStudents((prevStudents) => [response.data, ...prevStudents]);
    } catch (error) {
      console.error("Error al crear alumno:", error);
    }
  };

  // 2. Función para Borrar Alumnos (DELETE)
  const handleDeleteStudent = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Actualizamos el estado de React (Optimistic UI)
      setStudents((prevStudents) => prevStudents.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error al eliminar alumno:", error);
    }
  };

  return (
    // ==========================================================
    // TAREA 3: Proveer el contexto
    // Envolvemos toda la app con el Provider y le pasamos el 'value'
    // ==========================================================
    <StudentContext.Provider
      value={{
        students: students,
        addStudent: handleAddStudent,
        deleteStudent: handleDeleteStudent,
      }}
    >
      <Header />

      <div className="container mt-4">
        {/*
          NOTA: ¡Los componentes de Ruta ya NO necesitan props!
          El "Prop Drilling" ha sido eliminado.
        */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </StudentContext.Provider>
  );
}

export default App;
