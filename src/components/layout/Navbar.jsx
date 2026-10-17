import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

function Navbar() {
  const { user, logoutUser } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logoutUser();
    localStorage.removeItem('userLogged');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-large">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/">
            <i className="fas fa-store me-2"></i>PZDREAM
          </Link>

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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fas fa-home me-1"></i>Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/catalogo">
                  <i className="fas fa-th-large me-1"></i>Catálogo
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nosotros">
                  <i className="fas fa-info-circle me-1"></i>Nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">
                  <i className="fas fa-envelope me-1"></i>Contacto
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav mb-2 mb-lg-0 align-items-lg-center">

              {/* Carrito */}
              <li className="nav-item">
                <Link className="nav-link nav-icon-link" to="/carrito" title="Carrito">
                  <i className="fas fa-shopping-cart"></i>
                  {count > 0 && <span className="cart-badge">{count}</span>}
                  <span className="icon-label d-none d-lg-inline">Carrito</span>
                </Link>
              </li>

              <li className="nav-divider d-none d-lg-block"></li>

              {/* Botón Admin (siempre visible, discreto) */}
              <li className="nav-item">
                <Link className="nav-link admin-entry-link" to="/admin/login" title="Acceso administrador">
                  <i className="fas fa-user-shield"></i>
                  <span className="d-none d-lg-inline ms-1">Admin</span>
                </Link>
              </li>

              {/* Usuario NO logueado */}
              {!user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fas fa-sign-in-alt me-1"></i>Iniciar sesión
                  </Link>
                </li>
              )}

              {/* Usuario SÍ logueado */}
              {user && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user-circle me-1"></i>{user.nombre}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <span className="dropdown-item-text">
                        <i className="fas fa-user me-2"></i>Hola, {user.nombre}
                      </span>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin">
                        <i className="fas fa-user-shield me-2"></i>Ir al panel admin
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item text-danger"
                        onClick={cerrarSesion}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i>Cerrar sesión
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