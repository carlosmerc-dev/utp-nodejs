import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePages";
import RegisterPage from "./pages/RegisterPage";

import axios from "axios";

// Importamos el CONTEXTO (el Provider) y el TIPO
import {
  MotorcycleContext,
  type Motorcycle,
} from "./context/MotorcycleContext";

// Definimos la URL base de nuestra API
const API_URL = "http://localhost:3000/api/motorcycles";

function App() {
  // El estado principal sigue viviendo aquí
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);

  // ==========================================================
  // TAREA 1: Cargar Motocicletas al montar (GET)
  // ==========================================================
  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const response = await axios.get(API_URL);
        setMotorcycles(response.data); // ¡Cargamos desde la API!
      } catch (error) {
        console.error("Error al cargar motocicletas:", error);
      }
    };
    fetchMotorcycles();
  }, []); // <-- Array de dependencias VACÍO. Se ejecuta 1 SOLA VEZ al montar.

  // 3. Función para Añadir Motocicletas (POST)
  const handleAddMotorcycle = async (
    marca: string,
    modelo: string,
    imageUrl?: string
  ) => {
    try {
      const newMotorcycle = { marca, modelo, imageUrl };
      // Hacemos el POST y la API nos devuelve la motocicleta creada
      const response = await axios.post(API_URL, newMotorcycle);

      // Añadimos la nueva motocicleta (que viene de la BD) al estado
      setMotorcycles((prevMotorcycles) => [response.data, ...prevMotorcycles]);
    } catch (error) {
      console.error("Error al crear motocicleta:", error);
    }
  };

  // 2. Función para Borrar Motocicletas (DELETE)
  const handleDeleteMotorcycle = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Actualizamos el estado de React (Optimistic UI)
      setMotorcycles((prevMotorcycles) =>
        prevMotorcycles.filter((m) => m.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar motocicleta:", error);
    }
  };

  return (
    // ==========================================================
    // TAREA 3: Proveer el contexto
    // Envolvemos toda la app con el Provider y le pasamos el 'value'
    // ==========================================================
    <MotorcycleContext.Provider
      value={{
        motorcycles: motorcycles,
        addMotorcycle: handleAddMotorcycle,
        deleteMotorcycle: handleDeleteMotorcycle,
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
    </MotorcycleContext.Provider>
  );
}

export default App;
