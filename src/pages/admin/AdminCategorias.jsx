import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useCategories } from '../../context/CategoriesContext';

function AdminCategorias() {
  const { categorias, eliminarCategoria } = useCategories();

  return (
    <AdminLayout title="Gestión de Categorías" subtitle="Administra las categorías disponibles">
      <div className="mb-3 text-end">
        <Link to="/admin/categorias/nueva" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Nueva Categoría
        </Link>
      </div>
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <table className="table table-admin mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre de Categoría</th>
                <th>Slug (URL)</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map(c => (
                <tr key={c.id}>
                  <td>#{c.id}</td>
                  <td className="fw-bold">{c.label}</td>
                  <td><code>{c.slug}</code></td>
                  <td>
                    <Link to={`/admin/categorias/editar/${c.id}`} className="btn btn-sm btn-outline-primary me-1">
                      <i className="fas fa-edit"></i> Editar
                    </Link>
                    <button onClick={() => { if(confirm('¿Eliminar categoría?')) eliminarCategoria(c.id); }} className="btn btn-sm btn-outline-danger">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
export default AdminCategorias;