import { Link } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import ProductCardMini from '../components/productos/ProductCardMini';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductsContext';
import { formatCLP } from '../utils/format';

import '../assets/css/carrito.css';

function Carrito() {
  const { items, total, count, change, remove, clear } = useCart();
  const { productos } = useProducts();

  const finalizarCompra = () => {
    if (items.length === 0) return;
    alert('¡Compra finalizada! Gracias por tu pedido.');
    clear();
  };

  return (
    <Layout>
      <h1 className="display-5 fw-bold mb-4">
        <i className="fas fa-shopping-cart text-primary me-2"></i>
        Carrito de compras
      </h1>

      <div className="row g-4">
        <div className="col-lg-8">
          <h4 className="fw-semibold mb-3">
            <i className="fas fa-boxes text-primary me-2"></i>
            Productos disponibles
          </h4>
          <div className="row g-3">
            {productos.map((p) => (
              <ProductCardMini key={p.id} producto={p} />
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="cart-summary">
            <h4 className="fw-semibold mb-3">
              <i className="fas fa-receipt text-primary me-2"></i>
              Resumen
            </h4>

            {items.length === 0 ? (
              <div className="text-muted text-center py-4">
                <i className="fas fa-cart-plus fa-3x mb-3"></i>
                <p>Tu carrito está vacío</p>
              </div>
            ) : (
              <>
                <ul className="list-group list-group-flush mb-3">
                  {items.map((item) => (
                    <li className="list-group-item cart-item" key={item.id}>
                      <div className="item-info">
                        <div className="item-name">{item.nombre}</div>
                        <div className="item-price">{formatCLP(item.precio)} c/u</div>
                      </div>
                      <div className="item-actions">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => change(item.id, -1)}
                        >
                          −
                        </button>
                        <span className="cantidad">{item.cantidad}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => change(item.id, 1)}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => remove(item.id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total ({count} ítems):</span>
                  <span>{formatCLP(total)}</span>
                </div>

                <button className="btn btn-danger w-100 mt-3" onClick={clear}>
                  <i className="fas fa-trash-alt me-2"></i>Vaciar carrito
                </button>
                <button className="btn btn-success w-100 mt-2" onClick={finalizarCompra}>
                  <i className="fas fa-check me-2"></i>Finalizar compra
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Carrito;