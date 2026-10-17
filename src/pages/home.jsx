import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import ProductCarousel from '../components/productos/ProductCarousel';
import { useProducts } from '../context/ProductsContext';
import { formatCLP } from '../utils/format'; 

function Home() {
  const { productos } = useProducts();
  const [busqueda, setBusqueda] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef(null);
  const navigate = useNavigate();

  // Logica para cerrar el preview si hacemos clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (previewRef.current && !previewRef.current.contains(event.target)) {
        setShowPreview(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtramos los productos para el preview (nombre o categoría)
  const resultadosPreview = productos.filter((p) => {
    const term = busqueda.toLowerCase().trim();
    return (
      p.nombre.toLowerCase().includes(term) ||
      p.categoria.toLowerCase().includes(term)
    );
  }).slice(0, 5); // Mostramos solo los primeros 5

  const handleSearchChange = (e) => {
    setBusqueda(e.target.value);
    setShowPreview(true); // Mostrar el preview al escribir
  };

  const buscarProductos = (e) => {
    e.preventDefault();
    setShowPreview(false); // Ocultar preview al buscar
    if (!busqueda.trim()) return;
    navigate(`/catalogo?busqueda=${encodeURIComponent(busqueda.trim())}`);
  };

  const seleccionarProducto = (id) => {
    setShowPreview(false);
    setBusqueda('');
    navigate(`/producto/${id}`);
  };

  const recomendados = productos.slice(0, 8);
  const ofertas = productos.filter((p) => p.oferta).slice(0, 8);

  return (
    <Layout>
      {/* BANNER BIENVENIDA*/}
      <div className="hero-banner mb-4">
        <div className="hero-content">
          <h1 className="hero-title">Bienvenido a <span>PZDREAM</span></h1>
          <p className="hero-subtitle">
            Tu tienda de tecnología favorita. Encuentra los mejores componentes y equipos al mejor precio del mercado.
          </p>
          <Link to="/catalogo" className="btn btn-light btn-lg hero-btn">
            <i className="fas fa-store me-2"></i>Explorar Catálogo
          </Link>
        </div>
      
      </div>

      {/* Carrusel principal de banners */}
      <div className="carousel-full-width">
        <div id="carouselPrincipal" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselPrincipal" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Banner 1"></button>
            <button type="button" data-bs-target="#carouselPrincipal" data-bs-slide-to="1" aria-label="Banner 2"></button>
            <button type="button" data-bs-target="#carouselPrincipal" data-bs-slide-to="2" aria-label="Banner 3"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://static.gigabyte.com/StaticFile/Image/Global/ef621c152399f9fa78fa110cec3abc29/PromotionBanner/533" className="d-block w-100" alt="Ofertas en computadores" />
            </div>
            <div className="carousel-item">
              <img src="https://static.pcfactory.cl/imagenes/56433-notebook-gamer-rog-zephyrus-duo-01.webp" className="d-block w-100" alt="Notebooks destacados" loading="lazy" />
            </div>
            <div className="carousel-item">
              <img src="https://www.winpy.cl/files/ow39550_kingston_nv3_garantia_5_a%C3%A3%C2%B1os.jpg" className="d-block w-100" alt="Accesorios tecnológicos" loading="lazy" />
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselPrincipal" data-bs-slide="prev" aria-label="Imagen anterior">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselPrincipal" data-bs-slide="next" aria-label="Imagen siguiente">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>

      {/* Buscador con Preview */}
      <section className="search-section">
        <div className="search-container" ref={previewRef}>
          <form onSubmit={buscarProductos}>
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Buscar productos, marcas o categorías..."
                aria-label="Buscar productos"
                value={busqueda}
                onChange={handleSearchChange}
                onFocus={() => { if (busqueda.trim()) setShowPreview(true); }}
              />
              <button className="btn btn-search" type="submit">
                <i className="fas fa-search me-2"></i>Buscar
              </button>
            </div>
          </form>

          {/* Caja de Preview flotante */}
          {showPreview && busqueda.trim() !== '' && (
            <div className="search-preview-box">
              {resultadosPreview.length > 0 ? (
                <>
                  <div className="search-preview-header">Productos sugeridos</div>
                  {resultadosPreview.map((p) => (
                    <div
                      key={p.id}
                      className="search-preview-item"
                      onClick={() => seleccionarProducto(p.id)}
                    >
                      <img src={p.imagen} alt={p.nombre} />
                      <div className="preview-info">
                        <div className="preview-name">{p.nombre}</div>
                        <div className="preview-price">{formatCLP(p.precio)}</div>
                      </div>
                    </div>
                  ))}
                  <div className="search-preview-footer" onClick={buscarProductos}>
                    Ver todos los resultados <i className="fas fa-arrow-right ms-1"></i>
                  </div>
                </>
              ) : (
                <div className="search-preview-empty">
                  <i className="fas fa-search-minus mb-2"></i>
                  <p>No se encontraron resultados para "{busqueda}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Recomendados */}
      <section className="product-section my-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="section-title">
            <i className="fas fa-star text-warning me-2"></i>Productos Recomendados
          </h2>
          <Link to="/catalogo" className="text-decoration-none see-all">
            Ver todos <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <ProductCarousel id="recomendadosCarousel" productos={recomendados} />
      </section>

      {/* Ofertas */}
      <section className="product-section my-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="section-title">
            <i className="fas fa-tags text-danger me-2"></i>En Oferta
          </h2>
          <Link to="/ofertas" className="text-decoration-none see-all">
            Ver todos <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <ProductCarousel id="ofertasCarousel" productos={ofertas} oferta />
      </section>
    </Layout>
  );
}

export default Home;