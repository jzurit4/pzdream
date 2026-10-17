import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useOrders } from '../../context/OrdersContext';
import { formatCLP } from '../../utils/format';

function AdminOrdenDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrden } = useOrders();

  const orden = getOrden(id);

  if (!orden) {
    return (
      <AdminLayout title="Error">
        <div className="alert alert-danger">Orden no encontrada.</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Mostrar Boleta" subtitle={`Detalle de la orden Nº #${orden.id.toString().slice(-6)}`}>
      <div className="bg-light p-4 rounded-4 shadow-sm" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h3 className="fw-bold mb-1">Boleta Electrónica</h3>
            <p className="text-muted small mb-0">Fecha: {orden.fecha}</p>
          </div>
          <div className="bg-primary text-white p-3 rounded-3 text-center shadow-sm">
            <span className="d-block small">Total pagado</span>
            <strong className="fs-5">{formatCLP(orden.total)}</strong>
          </div>
        </div>

        <div className="bg-white p-3 rounded-3 shadow-sm mb-4">
          <table className="table align-middle mb-0">
            <thead className="text-muted small">
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orden.items.map((item) => (
                <tr key={item.id}>
                  <td><img src={item.imagen} alt={item.nombre} style={{ width: '40px', height: '40px', objectFit: 'contain' }} /></td>
                  <td className="small fw-semibold">{item.nombre}</td>
                  <td className="small">{formatCLP(item.precio)}</td>
                  <td className="small text-center">{item.cantidad}</td>
                  <td className="small text-end fw-bold">{formatCLP(item.precio * item.cantidad)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-4">
          <h5 className="fw-bold mb-3">Información del cliente</h5>
          <div className="row g-3 text-muted">
            <div className="col-md-6"><strong>Cliente:</strong> {orden.cliente}</div>
            <div className="col-md-6"><strong>Correo:</strong> {orden.email}</div>
          </div>
        </div>

        <div className="mb-4">
          <h5 className="fw-bold mb-3">Dirección de entrega</h5>
          <div className="row g-3 text-muted">
            <div className="col-md-12"><strong>Dirección:</strong> {orden.direccion}</div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
          <button className="btn btn-outline-secondary" onClick={() => navigate('/admin/ordenes')}>
            <i className="fas fa-arrow-left me-2"></i>Volver a Órdenes
          </button>
          <span className="badge bg-success fs-6 py-2 px-3">Estado: {orden.estado}</span>
        </div>

      </div>
    </AdminLayout>
  );
}

export default AdminOrdenDetalle;