// Importamos nuestro hook personalizado
import { useMotorcycles } from "../context/MotorcycleContext";

// ¡Ya NO necesita recibir Props!
export default function HomePage() {
  // ==========================================================
  // TAREA 3: Consumir el contexto
  // ==========================================================
  // Obtenemos la lista 'motorcycles' desde el contexto global
  const { motorcycles, deleteMotorcycle } = useMotorcycles();

  return (
    <div>
      <h2>Lista de Motocicletas Registradas</h2>

      {/* Si 'motorcycles' está vacío, mostramos un mensaje.
        Esto cubrirá el estado inicial Y el tiempo de carga de 500ms del useEffect en App.tsx
      */}
      {motorcycles.length === 0 ? (
        <p className="text-muted">
          Cargando motocicletas o aún no hay registros...
        </p>
      ) : (
        <div className="row">
          {/* El .map() funciona exactamente igual que en S12 */}
          {motorcycles.map((motorcycle) => (
            <div className="col-md-4" key={motorcycle.id}>
              <div className="card mb-3">
                {motorcycle.imageUrl && (
                  <img
                    src={motorcycle.imageUrl}
                    className="card-img-top"
                    alt={`${motorcycle.marca} ${motorcycle.modelo}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{motorcycle.marca}</h5>
                  <p className="card-text">Modelo: {motorcycle.modelo}</p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteMotorcycle(motorcycle.id)} // ¡El botón de borrado!
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
