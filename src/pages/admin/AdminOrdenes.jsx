import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useOrders } from '../../context/OrdersContext';
import { formatCLP } from '../../utils/format';

function AdminOrdenes() {
  const { ordenes } = useOrders();

  return (
    <AdminLayout title="Órdenes y Boletas" subtitle="Historial de compras de los clientes">
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <table className="table table-admin mb-0">
            <thead>
              <tr>
                <th>Nº Orden</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map(o => (
                <tr key={o.id}>
                  <td className="fw-bold">#{o.id.toString().slice(-6)}</td>
                  <td>{o.cliente}</td>
                  <td>{o.fecha}</td>
                  <td>{formatCLP(o.total)}</td>
                  <td><span className="badge bg-success">{o.estado}</span></td>
                  <td>
                    <Link to={`/admin/ordenes/${o.id}`} className="btn btn-sm btn-outline-primary">
                      <i className="fas fa-file-invoice"></i> Ver Boleta
                    </Link>
                  </td>
                </tr>
              ))}
              {ordenes.length === 0 && <tr><td colSpan="6" className="text-center py-4 text-muted">No hay órdenes registradas aún.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminOrdenes;