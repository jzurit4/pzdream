import { useEffect, useState } from 'react'; 
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../assets/css/admin.css';

export default function AdminLayout({ children, title, subtitle }) {
  const { admin, logoutAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Estado para controlar el menu en celular
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Cerrar el menu automaticamente al cambiar de ruta
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

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
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <i className="fas fa-user-shield me-2"></i>
          PZDREAM <span className="badge bg-primary ms-1">ADMIN</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin" className={`sidebar-link ${isActive('/admin')}`}>
            <i className="fas fa-home"></i> Home / Dashboard
          </Link>
          
          <Link to="/admin/ordenes" className={`sidebar-link ${location.pathname.includes('/admin/ordenes') ? 'active' : ''}`}>
            <i className="fas fa-receipt"></i> Órdenes / Boletas
          </Link>

          <div className="sidebar-group-title">Productos</div>
          <Link to="/admin/lista" className={`sidebar-link ps-5 ${isActive('/admin/lista') || isActive('/admin/modificar') || isActive('/admin/eliminar') ? 'active' : ''}`}>
            <i className="fas fa-box"></i> Mostrar Productos
          </Link>
          <Link to="/admin/agregar" className={`sidebar-link ps-5 ${isActive('/admin/agregar') ? 'active' : ''}`}>
            <i className="fas fa-plus"></i> Nuevo Producto
          </Link>
          <Link to="/admin/productos-criticos" className={`sidebar-link ps-5 ${isActive('/admin/productos-criticos') ? 'active' : ''}`}>
            <i className="fas fa-exclamation-triangle"></i> Listado Críticos
          </Link>

          <div className="sidebar-group-title">Categorías</div>
          <Link to="/admin/categorias" className={`sidebar-link ps-5 ${location.pathname.includes('/admin/categorias') ? 'active' : ''}`}>
            <i className="fas fa-tags"></i> Mostrar Categorías
          </Link>

          <div className="sidebar-group-title">Usuarios</div>
          <Link to="/admin/usuarios" className={`sidebar-link ps-5 ${location.pathname.includes('/admin/usuarios') ? 'active' : ''}`}>
            <i className="fas fa-users"></i> Mostrar Usuarios
          </Link>

          <div className="sidebar-group-title">Sistema</div>
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

      <main className="admin-main-content">
        <div className="admin-topbar d-flex justify-content-between align-items-center">
          <div>
            <h2>{title || 'Panel de Administración'}</h2>
            {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
          </div>
          <button 
            className="btn btn-primary d-md-none" // d-md-none hace que solo se vea en móviles
            onClick={() => setIsSidebarOpen(true)}
          >
            <i className="fas fa-bars"></i> Menú
          </button>
        </div>
        
        <div className="admin-content-area">
          {children}
        </div>
      </main>
    </div>
  );
}