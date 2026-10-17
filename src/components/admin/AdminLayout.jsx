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
              <Link to="/admin/lista" className={location.pathname.includes('/admin/lista') || location.pathname.includes('/admin/agregar') || location.pathname.includes('/admin/modificar') || location.pathname.includes('/admin/eliminar') ? 'active' : ''}>
                <i className="fas fa-box me-1"></i>Productos
              </Link>
            </li>
          
            <li>
              <Link to="/admin/usuarios" className={location.pathname.includes('/admin/usuarios') ? 'active' : ''}>
                <i className="fas fa-users me-1"></i>Usuarios
              </Link>
            </li>
            <li>
              <Link to="/admin/reportes" className={location.pathname === '/admin/reportes' ? 'active' : ''}>
                <i className="fas fa-chart-line me-1"></i>Reportes
              </Link>
            </li>
            <li>
              <Link to="/admin/perfil" className={location.pathname === '/admin/perfil' ? 'active' : ''}>
                <i className="fas fa-user-cog me-1"></i>Perfil
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