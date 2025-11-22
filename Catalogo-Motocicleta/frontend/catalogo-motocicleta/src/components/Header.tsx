import { Link } from "react-router-dom";
import { useTheme } from "../context/themeCore";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  const navClass =
    theme === "dark"
      ? "navbar navbar-expand-lg navbar-dark bg-dark"
      : "navbar navbar-expand-lg navbar-light bg-light";

  return (
    <nav className={navClass}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          Catálogo de Motocicletas
        </Link>
        <div className="d-flex align-items-center">
          <ul className="navbar-nav me-3 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio (Lista)
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Registrar Motocicleta
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "Modo claro" : "Modo oscuro"}
          </button>
        </div>
      </div>
    </nav>
  );
}
