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

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="admin-layout-wrapper">
      {/* SIDEBAR IZQ*/}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <i className="fas fa-user-shield me-2"></i>
          PZDREAM <span className="badge bg-primary ms-1">ADMIN</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin" className={`sidebar-link ${isActive('/admin')}`}>
            <i className="fas fa-home"></i> Dashboard
          </Link>
          <Link to="/admin/lista" className={`sidebar-link ${location.pathname.includes('/admin/lista') || location.pathname.includes('/admin/agregar') ? 'active' : ''}`}>
            <i className="fas fa-box"></i> Productos
          </Link>
          <Link to="/admin/usuarios" className={`sidebar-link ${location.pathname.includes('/admin/usuarios') ? 'active' : ''}`}>
            <i className="fas fa-users"></i> Usuarios
          </Link>
          <Link to="/admin/reportes" className={`sidebar-link ${isActive('/admin/reportes')}`}>
            <i className="fas fa-chart-line"></i> Reportes
          </Link>
          <Link to="/admin/perfil" className={`sidebar-link ${isActive('/admin/perfil')}`}>
            <i className="fas fa-user-cog"></i> Perfil
          </Link>
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="sidebar-btn btn-tienda">
            <i className="fas fa-store me-2"></i> Ir a la Tienda
          </Link>
          <button onClick={cerrarAdmin} className="sidebar-btn btn-logout">
            <i className="fas fa-sign-out-alt me-2"></i> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL*/}
      <main className="admin-main-content">
        <div className="admin-topbar">
          <h2>{title || 'Panel de Administración'}</h2>
          {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
        </div>
        
        <div className="admin-content-area">
          {children}
        </div>
      </main>
    </div>
  );
}