import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCLP, calcularDescuento } from '../../utils/format';

function ProductCarousel({ id, productos, oferta = false }) {
  const [pagina, setPagina] = useState(0);

  const productosPorPagina = 4;
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  const productosVisibles = productos.slice(
    pagina * productosPorPagina,
    (pagina + 1) * productosPorPagina
  );

  const cambiarPagina = (direccion) => {
    setPagina((actual) => (actual + direccion + totalPaginas) % totalPaginas);
  };

  if (productos.length === 0) {
    return (
      <div className="text-center py-4 text-muted small">
        No hay productos disponibles.
      </div>
    );
  }

  return (
    <div id={id} className="product-carousel">
      {totalPaginas > 1 && (
        <button
          type="button"
          className="product-carousel-btn prev"
          onClick={() => cambiarPagina(-1)}
          aria-label="Productos anteriores"
        >
          &#10094;
        </button>
      )}

      <div className="row g-3">
        {productosVisibles.map((producto) => {
          const descuento = calcularDescuento(producto.precio, producto.precioOriginal);
          return (
            <div className="col-6 col-md-3" key={producto.id}>
              <Link
                to={`/producto/${producto.id}`}
                className="product-card text-decoration-none"
              >
                {oferta && descuento && (
                  <div className="badge-oferta">-{descuento}%</div>
                )}

                <img
                  src={producto.imagen}
                  className="img-fluid rounded"
                  alt={producto.nombre}
                  loading="lazy"
                />

                <h6 className="mt-2">{producto.nombre}</h6>

                <p className="price">
                  {oferta && producto.precioOriginal && (
                    <span className="old-price">
                      {formatCLP(producto.precioOriginal)}{' '}
                    </span>
                  )}
                  {formatCLP(producto.precio)}
                </p>
              </Link>
            </div>
          );
        })}
      </div>

      {totalPaginas > 1 && (
        <button
          type="button"
          className="product-carousel-btn next"
          onClick={() => cambiarPagina(1)}
          aria-label="Productos siguientes"
        >
          &#10095;
        </button>
      )}

      {totalPaginas > 1 && (
        <div className="text-center mt-3 small text-muted">
          {pagina + 1} de {totalPaginas}
        </div>
      )}
    </div>
  );
}

export default ProductCarousel;