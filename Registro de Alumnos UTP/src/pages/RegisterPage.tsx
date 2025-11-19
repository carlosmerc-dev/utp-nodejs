// Importamos los hooks necesarios, incluyendo useRef y useEffect
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Importamos nuestro hook personalizado
import { useStudents } from "../context/StudentContext";

// ¡Ya NO necesita recibir Props!
export default function RegisterPage() {
  // States locales para el formulario (igual que en S12)
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  // ==========================================================
  // TAREA 3: Consumir el contexto
  // ==========================================================
  // Obtenemos la función 'addStudent' desde el contexto global
  const { addStudent } = useStudents();

  const navigate = useNavigate();

  // ==========================================================
  // TAREA 2: useRef para acceder al DOM
  // 1. Creamos la referencia
  // ==========================================================
  const nameInputRef = useRef<HTMLInputElement>(null);

  // ==========================================================
  // TAREA 2: useEffect para hacer foco al cargar
  // 2. Usamos useEffect (con array vacío) para ejecutar al montar
  // ==========================================================
  useEffect(() => {
    // El '.current' es el elemento del DOM.
    // Usamos '?' (optional chaining) por si el elemento aún no está listo.
    nameInputRef.current?.focus();
  }, []); // <-- Array vacío, se ejecuta 1 SOLA VEZ

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !course) {
      alert("Por favor completa todos los campos");
      return;
    }

    // Ejecuta la función OBTENIDA DEL CONTEXTO
    addStudent(name, course);

    setName("");
    setCourse("");
    navigate("/");
  };

  return (
    <div>
      <h2>Registrar Nuevo Alumno</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre Completo
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // ==========================================================
            // TAREA 2: "Conectamos" el ref al input
            // 3. Asignamos el ref al atributo 'ref' del input
            // ==========================================================
            ref={nameInputRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="course" className="form-label">
            Curso
          </label>
          <input
            type="text"
            className="form-control"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
}
