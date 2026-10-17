import AdminLayout from '../../components/admin/AdminLayout';
import { useProducts } from '../../context/ProductsContext';
import { formatCLP } from '../../utils/format';

function AdminProductosCriticos() {
  const { productos } = useProducts();
  const criticos = productos.filter(p => Number(p.stock) < 5);

  return (
    <AdminLayout title="Listado de Productos Críticos" subtitle="Alerta: Productos con stock menor a 5 unidades">
      <div className="alert alert-danger mb-4 border-0 shadow-sm">
        <i className="fas fa-exclamation-triangle me-2"></i>
        Hay <strong>{criticos.length}</strong> productos que requieren reabastecimiento inmediato.
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <table className="table table-admin mb-0">
            <thead className="bg-danger text-white">
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock Restante</th>
              </tr>
            </thead>
            <tbody>
              {criticos.map(p => (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td className="fw-bold">{p.nombre}</td>
                  <td><span className="badge bg-secondary">{p.categoria}</span></td>
                  <td>{formatCLP(p.precio)}</td>
                  <td><span className="badge bg-danger fs-6">{p.stock} uni.</span></td>
                </tr>
              ))}
              {criticos.length === 0 && <tr><td colSpan="5" className="text-center py-4">Todo el inventario está saludable.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
export default AdminProductosCriticos;