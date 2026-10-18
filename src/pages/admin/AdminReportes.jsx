import AdminLayout from '../../components/admin/AdminLayout';
import { useProducts } from '../../context/ProductsContext';
import { useUsers } from '../../context/UsersContext';
import { useOrders } from '../../context/OrdersContext'; 
import { formatCLP } from '../../utils/format';

function AdminReportes() {
  const { productos } = useProducts();
  const { usuarios } = useUsers();
  const { ordenes } = useOrders(); 

  // CALCULOS DE INGRESOS Y ORDENES 
  const ingresosTotales = ordenes.reduce((acc, orden) => acc + orden.total, 0);
  const totalOrdenes = ordenes.length;
  const ticketPromedio = totalOrdenes > 0 ? ingresosTotales / totalOrdenes : 0;

  const valorInventario = productos.reduce((acc, p) => acc + (Number(p.stock) * p.precio), 0);
  const productosBajoStock = productos.filter(p => Number(p.stock) < 5);

  // Creamos un objeto para agrupar las ventas por categoria
  const ventasPorCategoriaObj = {};
  
  ordenes.forEach(orden => {
    orden.items.forEach(item => {
      const cat = item.categoria || 'general';
      if (!ventasPorCategoriaObj[cat]) ventasPorCategoriaObj[cat] = 0;
      ventasPorCategoriaObj[cat] += (item.precio * item.cantidad);
    });
  });

  // Convertimos el objeto a un array ordenado de mayor a menor
  const totalVentasCalculadas = Object.values(ventasPorCategoriaObj).reduce((a, b) => a + b, 0);
  
  const categoriasVentas = Object.entries(ventasPorCategoriaObj)
    .map(([nombre, total]) => ({
      nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1),
      total,
      porcentaje: totalVentasCalculadas > 0 ? Math.round((total / totalVentasCalculadas) * 100) : 0,
      color: getColorPorCategoria(nombre)
    }))
    .sort((a, b) => b.total - a.total);

  // Funcion para asignar colores a las barras
  function getColorPorCategoria(categoria) {
    const colores = {
      notebook: 'bg-primary',
      computador: 'bg-success',
      'disco-duro': 'bg-info',
      'tarjeta-grafica': 'bg-warning',
      monitor: 'bg-danger',
      ram: 'bg-secondary',
      teclado: 'bg-dark',
      mouse: 'bg-primary',
      procesador: 'bg-success'
    };
    return colores[categoria.toLowerCase()] || 'bg-primary';
  }

  return (
    <AdminLayout title="Reportes y Estadísticas" subtitle="Resumen del estado de PZDREAM">
  

      {/* TARJETAS PRINCIPALES */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="admin-stat border bg-white shadow-sm">
            <i className="fas fa-wallet text-success"></i>
            <div>
              <div className="stat-value">{formatCLP(ingresosTotales)}</div>
              <div className="stat-label">Ingresos Reales</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="admin-stat border bg-white shadow-sm">
            <i className="fas fa-shopping-bag text-primary"></i>
            <div>
              <div className="stat-value">{totalOrdenes}</div>
              <div className="stat-label">Órdenes Exitosas</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="admin-stat border bg-white shadow-sm">
            <i className="fas fa-receipt text-warning"></i>
            <div>
              <div className="stat-value">{formatCLP(ticketPromedio)}</div>
              <div className="stat-label">Ticket Promedio</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="admin-stat border bg-white shadow-sm">
            <i className="fas fa-warehouse text-info"></i>
            <div>
              <div className="stat-value">{formatCLP(valorInventario)}</div>
              <div className="stat-label">Valor Inventario</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {/* GRAFICO DE VENTAS POR CATEGORÍA */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body">
              <h5 className="fw-bold mb-4"><i className="fas fa-chart-pie me-2 text-primary"></i>Ventas por Categoría</h5>
              
              {categoriasVentas.length === 0 ? (
                <div className="text-center text-muted py-5">
                  <i className="fas fa-chart-bar fa-3x mb-3 opacity-50"></i>
                  <p>Aún no hay ventas registradas para graficar.</p>
                </div>
              ) : (
                <div className="mt-4">
                  {categoriasVentas.map((cat, index) => (
                    <div className="mb-4" key={index}>
                      <div className="d-flex justify-content-between mb-1 fw-semibold">
                        <span>{cat.nombre}</span>
                        <span>{formatCLP(cat.total)} ({cat.porcentaje}%)</span>
                      </div>
                      <div className="progress" style={{ height: '12px' }}>
                        <div 
                          className={`progress-bar ${cat.color}`} 
                          role="progressbar" 
                          style={{ width: `${cat.porcentaje}%` }}
                          aria-valuenow={cat.porcentaje} 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TOP CLIENTES  */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body">
              <h5 className="fw-bold mb-4"><i className="fas fa-crown me-2 text-warning"></i>Mejores Clientes</h5>
              <div className="table-responsive">
                <table className="table table-sm table-hover mt-3">
                  <thead className="table-light">
                    <tr>
                      <th>Cliente</th>
                      <th>Compras</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...usuarios].sort((a, b) => b.compras - a.compras).slice(0, 5).map(u => (
                      <tr key={u.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <i className="fas fa-user-circle text-secondary me-2 fs-5"></i>
                            <div>
                              <div className="fw-bold">{u.nombre}</div>
                              <div className="small text-muted">{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle fw-bold text-primary">{u.compras || 0}</td>
                        <td className="align-middle">
                          {u.compras > 0 
                            ? <span className="badge bg-success">Activo</span>
                            : <span className="badge bg-secondary">Sin compras</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECCION DE PRODUCTOS CON BAJO STOCK */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold mb-0"><i className="fas fa-exclamation-triangle me-2 text-danger"></i>Alerta de Inventario Bajo</h5>
            <span className="badge bg-danger">{productosBajoStock.length} productos críticos</span>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock Restante</th>
                </tr>
              </thead>
              <tbody>
                {productosBajoStock.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      <i className="fas fa-check-circle text-success me-2"></i>Todo el inventario está saludable.
                    </td>
                  </tr>
                ) : (
                  productosBajoStock.map(p => (
                    <tr key={p.id}>
                      <td className="fw-semibold d-flex align-items-center">
                        <img src={p.imagen} alt={p.nombre} style={{ width: 35, height: 35, objectFit: 'contain', marginRight: 10 }} />
                        {p.nombre}
                      </td>
                      <td><span className="badge bg-secondary">{p.categoria}</span></td>
                      <td>{formatCLP(p.precio)}</td>
                      <td>
                        <span className={`badge ${p.stock === 0 ? 'bg-danger' : 'bg-warning text-dark'}`}>
                          {p.stock === 0 ? 'Agotado' : `${p.stock} unidades`}
                        </span>
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

export default AdminReportes;