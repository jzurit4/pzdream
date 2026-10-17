import { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../assets/css/admin.css';

export default function AdminLayout({ children, title, subtitle }) {
  const { admin, logoutAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!admin) navigate('/admin/login');
  }, [admin, navigate]);

  if (!admin) return null;

  const cerrarAdmin = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="admin-shell">
      {/* Header propio del admin */}
      <header className="admin-navbar">
        <div className="container-fluid d-flex align-items-center justify-content-between px-4">
          <Link to="/admin" className="admin-navbar-brand">
            <i className="fas fa-user-shield me-2"></i>
            PZDREAM <span className="admin-badge">ADMIN</span>
          </Link>

          <div className="admin-navbar-actions">
            <Link to="/" className="admin-navbar-link">
              <i className="fas fa-store me-1"></i>
              <span className="d-none d-md-inline">Ver tienda</span>
            </Link>
            <button onClick={cerrarAdmin} className="admin-navbar-link admin-navbar-logout">
              <i className="fas fa-sign-out-alt me-1"></i>
              <span className="d-none d-md-inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <nav className="admin-subnav">
        <div className="container-fluid px-4">
          <ul>
            <li>
              <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
                <i className="fas fa-home me-1"></i>Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/agregar" className={location.pathname === '/admin/agregar' ? 'active' : ''}>
                <i className="fas fa-plus me-1"></i>Agregar
              </Link>
            </li>
            <li>
              <Link to="/admin/lista" className={location.pathname === '/admin/lista' ? 'active' : ''}>
                <i className="fas fa-list me-1"></i>Lista
              </Link>
            </li>
            <li>
              <Link to="/admin/modificar" className={location.pathname === '/admin/modificar' ? 'active' : ''}>
                <i className="fas fa-edit me-1"></i>Modificar
              </Link>
            </li>
            <li>
              <Link to="/admin/eliminar" className={location.pathname === '/admin/eliminar' ? 'active' : ''}>
                <i className="fas fa-trash me-1"></i>Eliminar
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="admin-main">
        <div className="container py-4">
          {title && (
            <div className="admin-header">
              <h1>{title}</h1>
              {subtitle && <p>{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}