import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useProducts } from '../../context/ProductsContext';
import { formatCLP } from '../../utils/format';

function AdminProductosCriticos() {
  const { productos, modificarProducto } = useProducts();
  
  // Estados para la ventana modal
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidadSumar, setCantidadSumar] = useState(10); // Por defecto sumaremos 10
  const [mensajeExito, setMensajeExito] = useState('');

  // Filtramos los productos con stock menor a 5
  const criticos = productos.filter(p => Number(p.stock) < 5);

  // Abrir modal con el producto seleccionado
  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setCantidadSumar(10);
    setMensajeExito('');
    setShowModal(true);
  };

  // Cerrar modal
  const cerrarModal = () => {
    setShowModal(false);
    setProductoSeleccionado(null);
  };

  // Guardar el reabastecimiento
  const handleReabastecer = (e) => {
    e.preventDefault();
    if (!productoSeleccionado || cantidadSumar <= 0) return;

    const nuevoStock = Number(productoSeleccionado.stock) + Number(cantidadSumar);

    // Usamos la funcion del contexto para actualizar
    modificarProducto(productoSeleccionado.id, { stock: nuevoStock });

    setMensajeExito(`¡Éxito! Se agregaron ${cantidadSumar} unidades a "${productoSeleccionado.nombre}".`);
    
    // Cerramos el modal después de 1.5 segundos
    setTimeout(() => {
      cerrarModal();
    }, 1500);
  };

  return (
    <AdminLayout title="Listado de Productos Críticos" subtitle="Alerta: Productos con stock menor a 5 unidades">
      
      {criticos.length > 0 ? (
        <div className="alert alert-danger mb-4 border-0 shadow-sm">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Hay <strong>{criticos.length}</strong> productos que requieren reabastecimiento inmediato.
        </div>
      ) : (
        <div className="alert alert-success mb-4 border-0 shadow-sm">
          <i className="fas fa-check-circle me-2"></i>
          Todo el inventario está saludable. No hay productos críticos.
        </div>
      )}

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-admin table-hover mb-0">
              <thead className={criticos.length > 0 ? "bg-danger text-white" : "bg-success text-white"}>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock Restante</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {criticos.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      <i className="fas fa-box-open fa-3x mb-3 text-secondary"></i>
                      <p className="mb-0">No hay productos críticos por ahora.</p>
                    </td>
                  </tr>
                ) : (
                  criticos.map(p => (
                    <tr key={p.id}>
                      <td className="text-muted small">#{p.id}</td>
                      <td className="fw-bold d-flex align-items-center">
                        <img src={p.imagen} alt={p.nombre} style={{ width: 40, height: 40, objectFit: 'contain', marginRight: 10 }} />
                        {p.nombre}
                      </td>
                      <td><span className="badge bg-secondary">{p.categoria}</span></td>
                      <td>{formatCLP(p.precio)}</td>
                      <td>
                        <span className={`badge ${p.stock === 0 ? 'bg-danger' : 'bg-warning text-dark'} fs-6`}>
                          {p.stock === 0 ? 'Agotado' : `${p.stock} uni.`}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => abrirModal(p)}
                        >
                          <i className="fas fa-plus-circle me-1"></i> Reabastecer
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content border-0 shadow-lg">
                
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">
                    <i className="fas fa-boxes me-2"></i>Reabastecer Producto
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={cerrarModal}></button>
                </div>

                <form onSubmit={handleReabastecer}>
                  <div className="modal-body">
                    {mensajeExito ? (
                      <div className="alert alert-success text-center py-4 mb-0">
                        <i className="fas fa-check-circle fa-3x mb-3 text-success"></i>
                        <h5>{mensajeExito}</h5>
                      </div>
                    ) : (
                      <>
                        <div className="d-flex align-items-center mb-4 p-3 bg-light rounded">
                          <img src={productoSeleccionado?.imagen} alt={productoSeleccionado?.nombre} style={{ width: 60, height: 60, objectFit: 'contain', marginRight: 15 }} />
                          <div>
                            <h6 className="mb-1 fw-bold">{productoSeleccionado?.nombre}</h6>
                            <span className="text-muted small">Stock actual: <strong>{productoSeleccionado?.stock} unidades</strong></span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="cantidadInput" className="form-label fw-bold">
                            Unidades a sumar al inventario:
                          </label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text"><i className="fas fa-plus"></i></span>
                            <input 
                              type="number" 
                              className="form-control" 
                              id="cantidadInput"
                              min="1"
                              value={cantidadSumar}
                              onChange={(e) => setCantidadSumar(e.target.value)}
                              required 
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="text-end text-muted small">
                          Nuevo stock total: <strong>{Number(productoSeleccionado?.stock) + Number(cantidadSumar)} unidades</strong>
                        </div>
                      </>
                    )}
                  </div>

                  {!mensajeExito && (
                    <div className="modal-footer bg-light">
                      <button type="button" className="btn btn-secondary" onClick={cerrarModal}>
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-primary">
                        <i className="fas fa-save me-2"></i>Guardar Reabastecimiento
                      </button>
                    </div>
                  )}
                </form>

              </div>
            </div>
          </div>
        </>
      )}

    </AdminLayout>
  );
}

export default AdminProductosCriticos;