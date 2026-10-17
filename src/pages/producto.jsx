import { useParams, Link } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { formatCLP, calcularDescuento } from '../utils/format';

function Producto() {
  const { id } = useParams();
  const { getProducto } = useProducts();
  const { add } = useCart();

  const producto = getProducto(id);

  if (!producto) {
    return (
      <Layout>
        <div className="alert alert-danger text-center py-5">
          <i className="fas fa-exclamation-circle fa-3x mb-3"></i>
          <h4>Producto no encontrado</h4>
          <p>El producto que buscas no existe o fue removido.</p>
          <Link to="/catalogo" className="btn btn-primary mt-3">
            <i className="fas fa-arrow-left"></i> Volver al catálogo
          </Link>
        </div>
      </Layout>
    );
  }

  const descuento = calcularDescuento(producto.precio, producto.precioOriginal);

  const especificaciones = Object.entries(producto.especificaciones || {});

  return (
    <Layout>
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="product-image-container">
            <img src={producto.imagen} className="img-fluid rounded" alt={producto.nombre} loading="lazy" />
            {descuento && (
              <span className="badge-oferta-detalle">-{descuento}%</span>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <h1 className="display-5 fw-bold">{producto.nombre}</h1>

          <div className="product-prices-detalle mt-2">
            {producto.precioOriginal && (
              <span className="old-price-detalle">{formatCLP(producto.precioOriginal)}</span>
            )}
            <span className="price-detalle">{formatCLP(producto.precio)}</span>
          </div>

          <div className="mt-4">
            <h5><i className="fas fa-align-left text-primary"></i> Descripción</h5>
            <p className="text-muted">{producto.descripcion}</p>
          </div>

          {especificaciones.length > 0 && (
            <div className="mt-4">
              <h5><i className="fas fa-microchip text-primary"></i> Especificaciones</h5>
              <ul className="list-group list-group-flush product-specs-list">
                {especificaciones.map(([clave, valor]) => (
                  <li
                    key={clave}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <span className="fw-bold">{clave}</span>
                    <span className="text-muted text-end">{valor}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 d-flex flex-wrap gap-2">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => add(producto.id)}
            >
              <i className="fas fa-shopping-cart"></i> Agregar al carrito
            </button>
            <Link to="/catalogo" className="btn btn-outline-secondary btn-lg">
              <i className="fas fa-arrow-left"></i> Volver
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Producto;