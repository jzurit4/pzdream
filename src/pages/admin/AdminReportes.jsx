import AdminLayout from '../../components/admin/AdminLayout';
import { useProducts } from '../../context/ProductsContext';
import { useUsers } from '../../context/UsersContext';
import { formatCLP } from '../../utils/format';

function AdminReportes() {
  const { productos } = useProducts();
  const { usuarios } = useUsers();
  
  // Inventario Total (Stock * Precio)
  const valorInventario = productos.reduce((acc, p) => acc + (Number(p.stock) * p.precio), 0);
  
  // Ventas Simuladas 
  const ticketPromedio = 150000;
  const totalCompras = usuarios.reduce((acc, u) => acc + (u.compras || 0), 0);
  const ingresosSimulados = totalCompras * ticketPromedio;

  // Productos con bajo stock (menos de 5 unidades)
  const productosBajoStock = productos.filter(p => Number(p.stock) < 5).length;

  // Simulación de ventas por categoría (asignando porcentajes aleatorios para el gráfico)
  const categoriasVentas = [
    { nombre: 'Notebooks', porcentaje: 45, color: 'bg-primary' },
    { nombre: 'Computadores', porcentaje: 25, color: 'bg-success' },
    { nombre: 'Componentes', porcentaje: 20, color: 'bg-warning' },
    { nombre: 'Periféricos', porcentaje: 10, color: 'bg-danger' },
  ];

  return (
    <AdminLayout title="Reportes y Estadísticas" subtitle="Resumen general del estado de PZDREAM">
      
      <div className="alert alert-warning border-0 shadow-sm mb-4">
        <i className="fas fa-info-circle me-2"></i>
        <strong>Nota:</strong> Los datos financieros y gráficos son simulados localmente para demostración.
      </div>

      {/* TARJETAS PRINCIPALES*/}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="admin-stat border">
            <i className="fas fa-wallet text-success"></i>
            <div>
              <div className="stat-value">{formatCLP(ingresosSimulados)}</div>
              <div className="stat-label">Ingresos (Simulado)</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="admin-stat border">
            <i className="fas fa-warehouse text-primary"></i>
            <div>
              <div className="stat-value">{formatCLP(valorInventario)}</div>
              <div className="stat-label">Valor del Inventario</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="admin-stat border">
            <i className="fas fa-shopping-cart text-warning"></i>
            <div>
              <div className="stat-value">{totalCompras}</div>
              <div className="stat-label">Órdenes Totales</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="admin-stat border">
            <i className="fas fa-exclamation-triangle text-danger"></i>
            <div>
              <div className="stat-value">{productosBajoStock}</div>
              <div className="stat-label">Bajo Stock (&lt; 5)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* GRÁFICO DE VENTAS POR CATEGORÍA (CSS) */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-bold mb-4"><i className="fas fa-chart-pie me-2 text-primary"></i>Ventas por Categoría (Simulado)</h5>
              
              <div className="mt-4">
                {categoriasVentas.map((cat, index) => (
                  <div className="mb-4" key={index}>
                    <div className="d-flex justify-content-between mb-1 fw-semibold">
                      <span>{cat.nombre}</span>
                      <span>{cat.porcentaje}%</span>
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
            </div>
          </div>
        </div>

        {/* TOP CLIENTES */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
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
                    {usuarios.sort((a, b) => b.compras - a.compras).slice(0, 5).map(u => (
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
                        <td className="align-middle fw-bold text-primary">{u.compras}</td>
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

    </AdminLayout>
  );
}

export default AdminReportes;