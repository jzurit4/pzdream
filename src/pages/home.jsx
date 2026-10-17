import { useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import ProductCarousel from '../components/productos/ProductCarousel';
import { useProducts } from '../context/ProductsContext';

function Home() {
  const { productos } = useProducts();
  const [busqueda, setBusqueda] = useState('');

  const buscarProductos = (e) => {
    e.preventDefault();
    if (!busqueda.trim()) return;
    window.location.href = `/catalogo?busqueda=${encodeURIComponent(busqueda.trim())}`;
  };

  // Tomar los primeros 8 como "recomendados"
  const recomendados = productos.slice(0, 8);

  // Filtrar solo los que están en oferta
  const ofertas = productos.filter((p) => p.oferta).slice(0, 8);

  return (
    <Layout>
      <div className="alert alert-info">
        <i className="fas fa-info-circle me-2"></i>
        Bienvenido a PZDREAM - Tu tienda de tecnología
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

      {/* Buscador */}
      <section className="search-section">
        <form onSubmit={buscarProductos}>
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              placeholder="Buscar productos, marcas o categorías..."
              aria-label="Buscar productos"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button className="btn btn-search" type="submit">
              <i className="fas fa-search me-2"></i>Buscar
            </button>
          </div>
        </form>
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