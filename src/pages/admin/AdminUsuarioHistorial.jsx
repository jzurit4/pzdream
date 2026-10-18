import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useUsers } from '../../context/UsersContext';
import { useOrders } from '../../context/OrdersContext'; 
import { formatCLP } from '../../utils/format';

function AdminUsuarioHistorial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUsuario } = useUsers();
  const { ordenes } = useOrders(); // Traer todas las ordenes

  const usuario = getUsuario(id);

  // Filtramos las ordenes que pertenecen al correo de este usuario
  const ordenesUsuario = ordenes.filter(
    (o) => o.email.toLowerCase() === usuario?.email.toLowerCase()
  );

  return (
    <AdminLayout 
      title="Historial de Compras" 
      subtitle={`Cliente: ${usuario?.nombre || 'Desconocido'} (${usuario?.email || ''})`}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0 text-muted">
          <i className="fas fa-shopping-bag me-2"></i>
          Total de compras: <strong>{ordenesUsuario.length}</strong>
        </h5>
        <button className="btn btn-outline-secondary" onClick={() => navigate('/admin/usuarios')}>
          <i className="fas fa-arrow-left me-2"></i>Volver a Usuarios
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-admin table-hover mb-0">
              <thead>
                <tr>
                  <th>Nº Boleta</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ordenesUsuario.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                      <i className="fas fa-box-open fa-3x mb-3 text-secondary"></i>
                      <p className="mb-0">Este cliente aún no tiene compras registradas.</p>
                    </td>
                  </tr>
                ) : (
                  ordenesUsuario.map((orden) => (
                    <tr key={orden.id}>
                      <td className="fw-bold">
                        #{orden.id.toString().slice(-6)}
                      </td>
                      <td>{orden.fecha}</td>
                      <td className="fw-semibold text-success">
                        {formatCLP(orden.total)}
                      </td>
                      <td>
                        <span className="badge bg-success">{orden.estado}</span>
                      </td>
                      <td>
                        <Link 
                          to={`/admin/ordenes/${orden.id}`} 
                          className="btn btn-sm btn-outline-primary"
                        >
                          <i className="fas fa-file-invoice me-1"></i>Ver Boleta
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
    </AdminLayout>
  );
}

export default AdminUsuarioHistorial;