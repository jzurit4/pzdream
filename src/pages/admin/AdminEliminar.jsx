import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useProducts } from '../../context/ProductsContext';
import { formatCLP } from '../../utils/format';

function AdminEliminar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { productos, eliminarProducto, getProducto } = useProducts();

  const idUrl = searchParams.get('id') || '';
  const [id, setId] = useState(idUrl);
  const [mensaje, setMensaje] = useState(null);

  const producto = id ? getProducto(id) : null;

  const handleEliminar = () => {
    if (!producto) return;
    const confirmado = confirm(`¿Eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`);
    if (!confirmado) return;

    eliminarProducto(producto.id);
    setMensaje({ type: 'success', text: `"${producto.nombre}" eliminado correctamente.` });
    setId('');
    setTimeout(() => navigate('/admin/lista'), 1200);
  };

  return (
    <AdminLayout title="Eliminar Producto" subtitle="Selecciona un producto para eliminarlo permanentemente">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="mb-4">
                <label className="form-label fw-semibold">Selecciona el producto</label>
                <select className="form-select" value={id} onChange={(e) => { setId(e.target.value); setMensaje(null); }}>
                  <option value="">-- Seleccionar --</option>
                  {productos.map((p) => (
                    <option key={p.id} value={p.id}>#{p.id} — {p.nombre}</option>
                  ))}
                </select>
              </div>

              {producto && (
                <div className="alert alert-warning">
                  <h6 className="mb-2"><i className="fas fa-exclamation-triangle me-2"></i>Vas a eliminar:</h6>
                  <div className="d-flex align-items-center gap-3">
                    <img src={producto.imagen} alt={producto.nombre} style={{ width: 60, height: 60, objectFit: 'contain' }} />
                    <div>
                      <div className="fw-bold">{producto.nombre}</div>
                      <div className="small text-muted">{formatCLP(producto.precio)} · {producto.categoria}</div>
                    </div>
                  </div>
                </div>
              )}

              {mensaje && <div className={`alert alert-${mensaje.type}`}>{mensaje.text}</div>}

              <div className="d-flex gap-2">
                <button type="button" className="btn btn-danger" onClick={handleEliminar} disabled={!producto}>
                  <i className="fas fa-trash me-2"></i>Eliminar producto
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin')}>
                  <i className="fas fa-arrow-left me-2"></i>Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminEliminar;