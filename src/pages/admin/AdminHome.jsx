import AdminLayout from '../../components/admin/AdminLayout';
import AdminCard from '../../components/admin/AdminCard';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductsContext';

function AdminHome() {
  const { logoutAdmin } = useAuth();
  const { productos, resetProductos } = useProducts();

  const totalProductos = productos.length;
  const totalOfertas = productos.filter((p) => p.oferta).length;
  const stockTotal = productos.reduce((s, p) => s + (Number(p.stock) || 0), 0);

  return (
    <AdminLayout
      title="Panel de Administración"
      subtitle="Gestiona los productos de tu tienda fácilmente"
    >
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="admin-stat">
            <i className="fas fa-box"></i>
            <div>
              <div className="stat-value">{totalProductos}</div>
              <div className="stat-label">Productos</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="admin-stat">
            <i className="fas fa-tags"></i>
            <div>
              <div className="stat-value">{totalOfertas}</div>
              <div className="stat-label">En oferta</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="admin-stat">
            <i className="fas fa-warehouse"></i>
            <div>
              <div className="stat-value">{stockTotal}</div>
              <div className="stat-label">Unidades en stock</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <AdminCard to="/admin/agregar" icon="fa-plus-circle" title="Agregar Producto" description="Añade un nuevo producto al catálogo" />
        <AdminCard to="/admin/lista" icon="fa-list" title="Listar Productos" description="Visualiza todos los productos" />
        <AdminCard to="/admin/modificar" icon="fa-edit" title="Modificar Producto" description="Actualiza los datos de un producto" />
        <AdminCard to="/admin/eliminar" icon="fa-trash-alt" title="Eliminar Producto" description="Quita un producto del catálogo" danger />
      </div>

      <div className="text-center mt-5 d-flex justify-content-center gap-2 flex-wrap">
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            if (confirm('¿Restaurar los productos originales? Esto sobreescribe los cambios.')) {
              resetProductos();
              alert('Productos restaurados.');
            }
          }}
        >
          <i className="fas fa-undo me-2"></i>Restaurar catálogo original
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            logoutAdmin();
            window.location.href = '/';
          }}
        >
          <i className="fas fa-sign-out-alt me-2"></i>Cerrar sesión admin
        </button>
      </div>
    </AdminLayout>
  );
}

export default AdminHome;