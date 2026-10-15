import { Link } from 'react-router-dom';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';
import { useCart } from '../context/CartContext';
import '../assets/css/style.css';
import '../assets/css/carrito.css';

// Función para formatear el precio a Pesos Chilenos (CLP)
const formatPrecio = (valor) => {
  if (typeof valor === 'string') return valor;
  if (typeof valor === 'number') {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(valor);
  }
  return '$0';
};

function Carrito() {
  const { items, total, change, remove, clear } = useCart();

  return (
    <>
      <Navbar />

      <main className="main-content container my-5">
        <h1 className="display-5 fw-bold mb-4">
          <i className="fas fa-shopping-cart text-primary me-2"></i>Carrito de compras
        </h1>

        <div className="row g-4">
          {/* LISTA DE PRODUCTOS SELECCIONADOS */}
          <div className="col-lg-8">
            <h4 className="fw-semibold mb-3">
              <i className="fas fa-boxes text-primary me-2"></i>Productos Seleccionados
            </h4>

            {items.length === 0 ? (
              <div className="card text-center p-5 shadow-sm">
                <i className="fas fa-cart-arrow-down fa-4x text-muted mb-3"></i>
                <h5>Tu carrito está vacío</h5>
                <p className="text-muted">Aún no has agregado ningún producto a tu compra.</p>
                <div>
                  <Link to="/catalogo" className="btn btn-primary mt-2">
                    <i className="fas fa-store me-2"></i>Ir al Catálogo
                  </Link>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {items.map((item) => (
                  <div key={item.id} className="card p-3 shadow-sm d-flex flex-row align-items-center justify-content-between flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                        className="rounded background-light"
                      />
                      <div>
                        <h6 className="mb-1 fw-bold">{item.nombre}</h6>
                        <span className="text-primary fw-semibold">
                          {formatPrecio(item.precio)}
                        </span>
                      </div>
                    </div>

                    {/* CONTROL DE CANTIDAD */}
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm px-2"
                        onClick={() => change(item.id, -1)}
                        title="Disminuir cantidad"
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="fw-bold px-2">{item.cantidad}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm px-2"
                        onClick={() => change(item.id, 1)}
                        title="Aumentar cantidad"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>

                    {/* SUBTOTAL Y BOTÓN ELIMINAR */}
                    <div className="d-flex align-items-center gap-3">
                      <span className="fw-bold fs-6">
                        {formatPrecio(item.precio * item.cantidad)}
                      </span>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => remove(item.id)}
                        title="Eliminar producto"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RESUMEN DE LA COMPRA */}
          <div className="col-lg-4">
            <div className="cart-summary p-4 card shadow-sm">
              <h4 className="fw-semibold mb-3">
                <i className="fas fa-receipt text-primary me-2"></i>Resumen
              </h4>

              {items.length === 0 ? (
                <div className="text-muted text-center py-3">
                  <p className="mb-0">Agrega productos para ver el resumen de tu pedido.</p>
                </div>
              ) : (
                <div>
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item d-flex justify-content-between px-0">
                      <span>Cantidad de artículos:</span>
                      <span className="fw-semibold">
                        {items.reduce((sum, i) => sum + i.cantidad, 0)}
                      </span>
                    </li>
                  </ul>

                  <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                    <span>Total:</span>
                    <span className="text-primary">{formatPrecio(total)}</span>
                  </div>

                  <button
                    className="btn btn-success w-100 py-2 mb-2 fw-bold"
                    onClick={() => alert('¡Gracias por tu compra! Redirigiendo al pago...')}
                  >
                    <i className="fas fa-check me-2"></i>Finalizar compra
                  </button>

                  <button
                    className="btn btn-outline-danger w-100 py-2"
                    onClick={clear}
                  >
                    <i className="fas fa-trash-alt me-2"></i>Vaciar carrito
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Carrito;