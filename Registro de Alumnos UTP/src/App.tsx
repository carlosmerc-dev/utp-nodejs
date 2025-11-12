import { Routes, Route } from "react-router-dom";
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
