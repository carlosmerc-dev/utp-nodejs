import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { StudentProvider } from "./context/StudentContex";

function App() {
  return (
    <StudentProvider>
      {/* El Header tendrá los links de navegación */}
      <Header />

      <div className="container mt-4">
        {/* Aquí se define qué componente mostrar según la URL */}
        {/* Los componentes de Ruta ya NO necesitan props (usamos contexto). */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </StudentProvider>
  );
}

export default App;

// Definimos la URL base de nuestra API
const API_URL = "http://localhost:3000/api/students";

// ...
const [students, setStudents] = useState<Student[]>([]);

// 1. Cargar Alumnos al montar (GET)
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
}, []); // <-- Array vacío, se ejecuta 1 sola vez

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
