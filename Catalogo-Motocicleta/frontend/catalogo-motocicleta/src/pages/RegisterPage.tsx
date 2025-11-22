// Importamos los hooks necesarios, incluyendo useRef y useEffect
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Importamos nuestro hook personalizado
import { useMotorcycles } from "../context/MotorcycleContext";

// ¡Ya NO necesita recibir Props!
export default function RegisterPage() {
  // States locales para el formulario
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // ==========================================================
  // TAREA 3: Consumir el contexto
  // ==========================================================
  // Obtenemos la función 'addMotorcycle' desde el contexto global
  const { addMotorcycle } = useMotorcycles();

  const navigate = useNavigate();

  // ==========================================================
  // TAREA 2: useRef para acceder al DOM
  // 1. Creamos la referencia
  // ==========================================================
  const marcaInputRef = useRef<HTMLInputElement>(null);

  // ==========================================================
  // TAREA 2: useEffect para hacer foco al cargar
  // 2. Usamos useEffect (con array vacío) para ejecutar al montar
  // ==========================================================
  useEffect(() => {
    // El '.current' es el elemento del DOM.
    // Usamos '?' (optional chaining) por si el elemento aún no está listo.
    marcaInputRef.current?.focus();
  }, []); // <-- Array vacío, se ejecuta 1 SOLA VEZ

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!marca || !modelo) {
      alert("Por favor completa todos los campos");
      return;
    }

    // Ejecuta la función OBTENIDA DEL CONTEXTO
    addMotorcycle(marca, modelo, imageUrl || undefined);

    setMarca("");
    setModelo("");
    setImageUrl("");
    navigate("/");
  };

  return (
    <div>
      <h2>Registrar Nueva Motocicleta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="marca" className="form-label">
            Marca
          </label>
          <input
            type="text"
            className="form-control"
            id="marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            // ==========================================================
            // TAREA 2: "Conectamos" el ref al input
            // 3. Asignamos el ref al atributo 'ref' del input
            // ==========================================================
            ref={marcaInputRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="modelo" className="form-label">
            Modelo
          </label>
          <input
            type="text"
            className="form-control"
            id="modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">
            URL de la Imagen (opcional)
          </label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
}
