import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useUsers } from '../../context/UsersContext';

function AdminUsuarios() {
  const { usuarios, eliminarUsuario } = useUsers();

  return (
    <AdminLayout title="Gestión de Usuarios" subtitle="Administra los clientes registrados">
      <div className="mb-3 text-end">
        <Link to="/admin/usuarios/nuevo" className="btn btn-primary">
          <i className="fas fa-user-plus me-2"></i>Nuevo Usuario
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-admin table-hover mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Acciones (Flujo)</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id}>
                    <td className="text-muted small">#{u.id}</td>
                    <td className="fw-semibold">{u.nombre}</td>
                    <td>{u.email}</td>
                    <td>{u.telefono}</td>
                    <td>
                      <Link to={`/admin/usuarios/editar/${u.id}`} className="btn btn-sm btn-outline-primary me-1" title="Editar Usuario">
                        <i className="fas fa-edit"></i> Editar
                      </Link>
                      <Link to={`/admin/usuarios/historial/${u.id}`} className="btn btn-sm btn-outline-success me-1" title="Historial de Compras">
                        <i className="fas fa-shopping-bag"></i> Historial
                      </Link>
                      <button onClick={() => { if(confirm('¿Eliminar usuario?')) eliminarUsuario(u.id); }} className="btn btn-sm btn-outline-danger" title="Eliminar">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {usuarios.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">No hay usuarios registrados.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminUsuarios;