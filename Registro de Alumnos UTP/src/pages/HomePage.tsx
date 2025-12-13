// Importamos nuestro hook personalizado
import { useStudents } from "../context/StudentContext";
import { useState } from "react";

// ¡Ya NO necesita recibir Props!
export default function HomePage() {
  // ==========================================================
  // TAREA 3: Consumir el contexto
  // ==========================================================
  // Obtenemos la lista 'students' desde el contexto global
  const { students, totalStudents, deleteStudent } = useStudents();

  // Estado para manejar la nota de cada alumno
  const [scores, setScores] = useState<{ [key: number]: string }>({});

  // Función para actualizar la nota de un alumno específico
  const handleScoreChange = (studentId: number, score: string) => {
    setScores((prev) => ({
      ...prev,
      [studentId]: score,
    }));
  };

  // Función para guardar la nota
  const handleSaveGrade = async (studentId: number, courseName: string) => {
    const score = scores[studentId];

    if (!score) {
      alert("Por favor ingresa una nota");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/grades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: studentId,
          course: courseName,
          score: parseFloat(score),
        }),
      });

      if (response.ok) {
        alert("Nota guardada exitosamente");
        // Limpiar el campo después de guardar
        setScores((prev) => ({
          ...prev,
          [studentId]: "",
        }));
      } else {
        alert("Error al guardar la nota");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div>
      {/* Tarjeta (Alert) de Sistema y Contador - Interfaz y Marca de Agua */}
      <div className="alert alert-info mb-4 text-center" role="alert">
        <h4 className="alert-heading mb-3">Sistema de CARLOS MERCEDES</h4>
        <p className="mb-0">
          <strong>Total de Alumnos en BD: {totalStudents}</strong>
        </p>
      </div>

      <h2>Lista de Alumnos Registrados</h2>

      {/* Si 'students' está vacío, mostramos un mensaje.
        Esto cubrirá el estado inicial Y el tiempo de carga de 500ms del useEffect en App.tsx
      */}
      {students.length === 0 ? (
        <p className="text-muted">Cargando alumnos o aún no hay registros...</p>
      ) : (
        <div className="row">
          {/* El .map() funciona exactamente igual que en S12 */}
          {students.map((student) => (
            <div className="col-md-4" key={student.id}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{student.name}</h5>
                  <p className="card-text">Curso: {student.course}</p>

                  {/* Sección para agregar nota */}
                  <div className="mt-3 pt-3 border-top">
                    <label className="form-label small mb-1">
                      Ingresar Nota:
                    </label>
                    <div className="input-group input-group-sm mb-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Nota (0-20)"
                        step="0.5"
                        min="0"
                        max="20"
                        value={scores[student.id] || ""}
                        onChange={(e) =>
                          handleScoreChange(student.id, e.target.value)
                        }
                      />
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          handleSaveGrade(student.id, student.course)
                        }
                      >
                        Guardar
                      </button>
                    </div>
                  </div>

                  <button
                    className="btn btn-danger btn-sm w-100 mt-2"
                    onClick={() => deleteStudent(student.id)} // ¡El botón de borrado!
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
