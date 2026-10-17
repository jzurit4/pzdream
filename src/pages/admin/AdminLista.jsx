import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useProducts } from '../../context/ProductsContext';
import { formatCLP } from '../../utils/format';

function AdminLista() {
  const { productos } = useProducts();

  return (
    <AdminLayout title="Lista de Productos" subtitle="Visualiza todos los productos disponibles en el catálogo">
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-admin table-hover mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Categoría</th>
                  <th>Oferta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">No hay productos en el catálogo.</td>
                  </tr>
                ) : (
                  productos.map((p) => (
                    <tr key={p.id}>
                      <td className="text-muted small">#{p.id}</td>
                      <td>
                        <img src={p.imagen} alt={p.nombre} style={{ width: 48, height: 48, objectFit: 'contain' }} />
                      </td>
                      <td className="fw-semibold">{p.nombre}</td>
                      <td>{formatCLP(p.precio)}</td>
                      <td>{p.stock ?? '—'}</td>
                      <td><span className="badge bg-secondary">{p.categoria}</span></td>
                      <td>
                        {p.oferta ? <span className="badge bg-danger">Sí</span> : <span className="badge bg-light text-dark">No</span>}
                      </td>
                      <td>
                        <Link to={`/admin/modificar?id=${p.id}`} className="btn btn-sm btn-outline-primary me-1" title="Modificar">
                          <i className="fas fa-edit"></i>
                        </Link>
                        <Link to={`/admin/eliminar?id=${p.id}`} className="btn btn-sm btn-outline-danger" title="Eliminar">
                          <i className="fas fa-trash-alt"></i>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-3 text-muted small">
        Mostrando <strong>{productos.length}</strong> producto(s).
      </div>
    </AdminLayout>
  );
}

export default AdminLista;