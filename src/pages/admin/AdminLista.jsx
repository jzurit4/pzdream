import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useProducts } from '../../context/ProductsContext';
import { formatCLP } from '../../utils/format';

function AdminLista() {
  const { productos, modificarProducto } = useProducts();
  
  // Estados para el modal de reabastecimiento
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidadSumar, setCantidadSumar] = useState(10);
  const [mensajeExito, setMensajeExito] = useState('');

  // Abrir modal
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

  // Guardar stock
  const handleReabastecer = (e) => {
    e.preventDefault();
    if (!productoSeleccionado || cantidadSumar <= 0) return;

    const nuevoStock = Number(productoSeleccionado.stock) + Number(cantidadSumar);
    modificarProducto(productoSeleccionado.id, { stock: nuevoStock });

    setMensajeExito(`¡Éxito! Se agregaron ${cantidadSumar} unidades a "${productoSeleccionado.nombre}".`);
    
    setTimeout(() => {
      cerrarModal();
    }, 1500);
  };

  return (
    <AdminLayout title="Lista de Productos" subtitle="Visualiza y reabastece todo el catálogo de la tienda">
      <div className="card shadow-sm border-0">
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
                      <td>
                        <span className={`badge ${Number(p.stock) < 5 ? 'bg-danger' : 'bg-success'}`}>
                          {p.stock ?? 0} uni.
                        </span>
                      </td>
                      <td><span className="badge bg-secondary">{p.categoria}</span></td>
                      <td>
                        {p.oferta ? <span className="badge bg-danger">Sí</span> : <span className="badge bg-light text-dark">No</span>}
                      </td>
                      <td>
                      
                        <button 
                          onClick={() => abrirModal(p)} 
                          className="btn btn-sm btn-outline-success me-1" 
                          title="Reabastecer Stock"
                        >
                          <i className="fas fa-boxes"></i>
                        </button>
                        
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
        Mostrando <strong>{productos.length}</strong> producto(s) en total.
      </div>


      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content border-0 shadow-lg">
                
                <div className="modal-header bg-success text-white">
                  <h5 className="modal-title">
                    <i className="fas fa-boxes me-2"></i>Reabastecer Stock
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
                      <button type="submit" className="btn btn-success">
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

export default AdminLista;