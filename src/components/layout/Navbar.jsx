import { useState } from 'react';

function Navbar() {
  const [usuario, setUsuario] = useState(
    localStorage.getItem('userName')
  );

  const estaLogueado =
    localStorage.getItem('userLogged') === 'true';

  const cerrarSesion = () => {
    localStorage.removeItem('userLogged');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    setUsuario(null);

    window.location.href = '/';
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-large">
        <div className="container-fluid">

          {/* LOGO */}
          <a className="navbar-brand" href="/">
            <i className="fas fa-store me-2"></i>
            PZDREAM
          </a>

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
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >

            {/* LINKS PRINCIPALES */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <a className="nav-link" href="/">
                  <i className="fas fa-home me-1"></i>
                  Inicio
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/catalogo">
                  <i className="fas fa-th-large me-1"></i>
                  Catálogo
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/nosotros">
                  <i className="fas fa-info-circle me-1"></i>
                  Nosotros
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/contacto">
                  <i className="fas fa-envelope me-1"></i>
                  Contacto
                </a>
              </li>

            </ul>

            {/* USUARIO */}
            <ul className="navbar-nav mb-2 mb-lg-0">

              {/* USUARIO NO LOGUEADO */}
              {!estaLogueado && (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/login"
                  >
                    <i className="fas fa-sign-in-alt me-1"></i>
                    Iniciar sesión
                  </a>
                </li>
              )}

              {/* USUARIO LOGUEADO */}
              {estaLogueado && (
                <li className="nav-item dropdown">

                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user-circle me-1"></i>
                    {usuario}
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end">

                    {/* INFORMACIÓN DEL USUARIO */}
                    <li>
                      <span className="dropdown-item-text">
                        <i className="fas fa-user me-2"></i>
                        Hola, {usuario}
                      </span>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    {/* CERRAR SESIÓN */}
                    <li>
                      <button
                        type="button"
                        className="dropdown-item text-danger"
                        onClick={cerrarSesion}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Cerrar sesión
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