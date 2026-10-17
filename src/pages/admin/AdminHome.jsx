import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useProducts } from '../../context/ProductsContext';
import { useUsers } from '../../context/UsersContext';

function AdminHome() {
  const { productos } = useProducts();
  const { usuarios } = useUsers();

  // Calculos para las tarjetas superiores
  const totalProductos = productos.length;
  const totalUsuarios = usuarios.length;
  // Simulamos las compras totales sumando el campo "compras" de los usuarios
  const totalCompras = usuarios.reduce((acc, u) => acc + (u.compras || 0), 0);

  return (
    <AdminLayout 
      title="Dashboard" 
      subtitle="Resumen de las actividades diarias de PZDREAM"
    >
      {/* 3 TARJETAS DE COLORES  */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="kpi-card kpi-blue">
            <i className="fas fa-shopping-cart kpi-icon"></i>
            <div>
              <h3>{totalCompras}</h3>
              <p>Compras Totales</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="kpi-card kpi-green">
            <i className="fas fa-box kpi-icon"></i>
            <div>
              <h3>{totalProductos}</h3>
              <p>Productos en Catálogo</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="kpi-card kpi-yellow">
            <i className="fas fa-users kpi-icon"></i>
            <div>
              <h3>{totalUsuarios}</h3>
              <p>Usuarios Registrados</p>
            </div>
          </div>
        </div>
      </div>

      {/*  ACCESOS RÁPIDOS */}
      <div className="row g-3">
        <div className="col-md-3">
          <Link to="/admin" className="quick-card">
            <i className="fas fa-tachometer-alt"></i>
            <h5>Dashboard</h5>
            <p>Visión general de todas las métricas y estadísticas.</p>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/admin/lista" className="quick-card">
            <i className="fas fa-box-open"></i>
            <h5>Productos</h5>
            <p>Administrar inventario y detalles de los productos.</p>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/admin/usuarios" className="quick-card">
            <i className="fas fa-user-friends"></i>
            <h5>Usuarios</h5>
            <p>Gestión de cuentas de usuario y sus roles.</p>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/admin/reportes" className="quick-card">
            <i className="fas fa-chart-pie"></i>
            <h5>Reportes</h5>
            <p>Generación de informes detallados sobre operaciones.</p>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/admin/perfil" className="quick-card">
            <i className="fas fa-user-cog"></i>
            <h5>Perfil</h5>
            <p>Administración de la información personal y configuración.</p>
          </Link>
        </div>
        
        <div className="col-md-3">
          <Link to="/" className="quick-card">
            <i className="fas fa-store"></i>
            <h5>Tienda</h5>
            <p>Visualiza la tienda en tiempo real como un cliente.</p>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminHome;