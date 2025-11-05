import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";

// Definimos el "tipo" de dato para un estudiante
export type Student = {
  id: number;
  name: string;
  course: string;
};

function App() {
  // STATE PRINCIPAL: Aquí vivirá la lista de alumnos
  const [students, setStudents] = useState<Student[]>([]);

  // Función para agregar un estudiante (se la pasaremos al formulario)
  const handleAddStudent = (name: string, course: string) => {
    const newStudent: Student = {
      id: Date.now(), // ID único rápido
      name,
      course,
    };
    // Actualizamos el state, añadiendo el nuevo estudiante
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  return (
    <>
      {/* El Header tendrá los links de navegación */}
      <Header />

      <div className="container mt-4">
        {/* Aquí se define qué componente mostrar según la URL */}
        <Routes>
          <Route path="/" element={<HomePage students={students} />} />
          <Route
            path="/register"
            element={<RegisterPage onAddStudent={handleAddStudent} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
