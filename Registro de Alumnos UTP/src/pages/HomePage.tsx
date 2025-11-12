import { useStudents } from "../context/studentCore";

export default function HomePage() {
  const { students } = useStudents();
  return (
    <div className="container py-5">
      <h2 className="mb-4">Lista de Alumnos Registrados</h2>

      {/* Si 'students' está vacío, mostramos un mensaje (cubre carga inicial y ausencia de registros) */}
      {students.length === 0 ? (
        <div className="d-flex align-items-center">
          <div
            className="spinner-border text-primary me-3"
            role="status"
            aria-hidden="true"
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
          <span className="text-muted">
            Cargando alumnos o aún no hay registros...
          </span>
        </div>
      ) : (
        <div className="row">
          {/* Usamos .map() para renderizar tarjetas de alumnos */}
          {students.map((student) => (
            <div className="col-md-4" key={student.id}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{student.name}</h5>
                  <p className="card-text">Curso: {student.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
