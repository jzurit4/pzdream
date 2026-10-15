import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function Navbar() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(
    localStorage.getItem('userName')
  );

  const { count, clear } = useCart();

  const estaLogueado =
    localStorage.getItem('userLogged') === 'true';

  const cerrarSesion = () => {
    // 1. Limpiar manualmente la clave del carrito en localStorage
    localStorage.removeItem('pz_carrito');

    // 2. Limpiar el estado de React
    clear();

    // 3. Limpiar los datos de sesión de usuario
    localStorage.removeItem('userLogged');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    setUsuario(null);

    // 4. Navegar sin forzar la recarga del navegador
    navigate('/');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-large">
        <div className="container-fluid">

          {/* LOGO */}
          <Link className="navbar-brand" to="/">
            <i className="fas fa-store me-2"></i>
            PZDREAM
          </Link>

          {/* BOTÓN RESPONSIVE */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* MENÚ */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {/* LINKS PRINCIPALES */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fas fa-home me-1"></i> Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/catalogo">
                  <i className="fas fa-th-large me-1"></i> Catálogo
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nosotros">
                  <i className="fas fa-info-circle me-1"></i> Nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">
                  <i className="fas fa-envelope me-1"></i> Contacto
                </Link>
              </li>
            </ul>

            {/* CARRITO Y USUARIO */}
            <ul className="navbar-nav mb-2 mb-lg-0 align-items-lg-center">
              <li className="nav-item me-lg-3">
                <Link className="nav-link position-relative d-inline-flex align-items-center" to="/carrito" title="Carrito">
                  <i className="fas fa-shopping-cart me-1"></i>
                  <span className="d-none d-lg-inline">Carrito</span>
                  {count > 0 && (
                    <span className="badge rounded-pill bg-danger ms-1">
                      {count}
                    </span>
                  )}
                </Link>
              </li>

              <li className="nav-divider d-none d-lg-block"></li>

              {!estaLogueado ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fas fa-sign-in-alt me-1"></i> Iniciar sesión
                  </Link>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user-circle me-1"></i> {usuario}
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <span className="dropdown-item-text">
                        <i className="fas fa-user me-2"></i> Hola, {usuario}
                      </span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item text-danger"
                        onClick={cerrarSesion}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i> Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>

          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;