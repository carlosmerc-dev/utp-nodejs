import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Definimos las Props que recibe: la función para añadir alumno
type Props = {
  onAddStudent: (name: string, course: string) => void;
};

export default function RegisterPage({ onAddStudent }: Props) {
  // STATES LOCALES para controlar el formulario
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  // Hook de React Router para redirigir al usuario
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue

    // Validación simple
    if (!name || !course) {
      alert("Por favor completa todos los campos");
      return;
    }

    // Ejecuta la función que vino por Props desde App.tsx
    onAddStudent(name, course);

    // Limpiar el formulario
    setName("");
    setCourse("");

    // Redirigir al usuario al "Inicio"
    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4">Registrar Nuevo Alumno</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre Completo
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name} // 1. El valor lo da el State
              onChange={(e) => setName(e.target.value)} // 2. onChange actualiza el State
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
              value={course} // 1. El valor lo da el State
              onChange={(e) => setCourse(e.target.value)} // 2. onChange actualiza el State
            />
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
