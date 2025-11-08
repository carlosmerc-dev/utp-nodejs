// Importamos nuestro hook personalizado
import { useStudents } from '../context/StudentContext';

// ¡Ya NO necesita recibir Props!
export default function HomePage() {

  // ==========================================================
  // TAREA 3: Consumir el contexto
  // ==========================================================
  // Obtenemos la lista 'students' desde el contexto global
  const { students } = useStudents();


  return (
    <div>
      <h2>Lista de Alumnos Registrados</h2>

      {/* Si 'students' está vacío, mostramos un mensaje.
        Esto cubrirá el estado inicial Y el tiempo de carga de 500ms del useEffect en App.tsx
      */}
      {students.length === 0 ? (
        <p className="text-muted">Cargando alumnos o aún no hay registros...</p>
      ) : (
        <div className="row">
          {/* El .map() funciona exactamente igual que en S12 */}
          {students.map(student => (
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