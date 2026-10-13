import { useState } from 'react';

function ProductCarousel({ id, productos, oferta = false }) {
  const [pagina, setPagina] = useState(0);

  const totalPaginas = Math.ceil(productos.length / 4);

  const productosVisibles = productos.slice(
    pagina * 4,
    pagina * 4 + 4
  );

  const cambiarPagina = (direccion) => {
    setPagina((actual) =>
      (actual + direccion + totalPaginas) % totalPaginas
    );
  };

  return (
    <div id={id} className="product-carousel">
      <div className="row g-3">
        {productosVisibles.map((producto) => (
          <div className="col-6 col-md-3" key={producto.id}>
            <a
              href={`/producto/${producto.id}`}
              className="product-card text-decoration-none"
            >
              {oferta && (
                <div className="badge-oferta">
                  {producto.descuento}
                </div>
              )}

              <img
                src={producto.imagen}
                className="img-fluid rounded"
                alt={producto.nombre}
                loading="lazy"
              />

              <h6 className="mt-2">{producto.nombre}</h6>

              <p className="price">
                {oferta && (
                  <span className="old-price">
                    {producto.anterior}{' '}
                  </span>
                )}
                {producto.precio}
              </p>
            </a>
          </div>
        ))}
      </div>

      {totalPaginas > 1 && (
        <>
          <button
            type="button"
            className="carousel-control-prev custom-carousel-control"
            onClick={() => cambiarPagina(-1)}
            aria-label="Productos anteriores"
          >
            <span className="carousel-control-prev-icon" />
          </button>

          <button
            type="button"
            className="carousel-control-next custom-carousel-control"
            onClick={() => cambiarPagina(1)}
            aria-label="Productos siguientes"
          >
            <span className="carousel-control-next-icon" />
          </button>
        </>
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