import { useState } from 'react';

import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';
import ProductCarousel from '../components/productos/ProductCarousel';

import '../assets/css/style.css';

function Home() {
  const [busqueda, setBusqueda] = useState('');

  const buscarProductos = (e) => {
    e.preventDefault();

    if (!busqueda.trim()) return;

    window.location.href =
      `/catalogo?busqueda=${encodeURIComponent(busqueda.trim())}`;
  };

  const recomendados = [
  {
    id: 1,
    nombre: 'Notebook Gamer',
    precio: '$1.299.990',
    imagen:
      'https://i5.walmartimages.cl/asr/a7dd66c0-f691-4227-8a40-47fec2456f1c.1bb6f0270e2d01383eafa4204eb5a0ff.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
  },
  {
    id: 2,
    nombre: 'PC Escritorio',
    precio: '$899.990',
    imagen:
      'https://minisitios.ripley.cl/minisitios/icdinamica/2024/09-septiembre/ICD%20computaci%C3%B3n%20110924/AllInOne.jpg',
  },
  {
    id: 3,
    nombre: 'SSD 1TB',
    precio: '$149.990',
    imagen:
      'https://media.spdigital.cl/thumbnails/products/rz7s3jb4_d0d6821a_thumbnail_4096.jpg',
  },
  {
    id: 4,
    nombre: 'Tarjeta Gráfica',
    precio: '$499.990',
    imagen:
      'https://static.myshop.cl/fotos/3/1/5/3/5/1_1764687802000.png',
  },
  {
    id: 5,
    nombre: 'Monitor 27"',
    precio: '$299.990',
    imagen:
      'https://rimage.ripley.cl/home.ripley/Attachment/MKP/8117/MPM10002882701/imagen2-1',
  },
  {
    id: 6,
    nombre: 'Memoria RAM 16GB',
    precio: '$89.990',
    imagen:
      'https://natcomchile.cl/wp-content/uploads/2021/06/memoria-ram-HyperX-81410057.jpg',
  },
  {
    id: 7,
    nombre: 'Teclado Mecánico',
    precio: '$79.990',
    imagen:
      'https://todoclick.cl/6732674-large_default/teclado-mecanico-hibrido-cougar-core-negro-spa.jpg',
  },
  {
    id: 8,
    nombre: 'Mouse Inalámbrico',
    precio: '$19.990',
    imagen:
      'https://fotosol.cl/cdn/shop/products/1-19.jpg?crop=center&height=617&v=1623961130&width=617',
  },
];

const ofertas = [
  {
    id: 9,
    nombre: 'Notebook Gamer',
    precio: '$1.049.990',
    anterior: '$1.499.990',
    descuento: '-25%',
    imagen:
      'https://scglobal.cl/4992-large_default/notebook-hp-gamer-victus-15-fb3007la-r7-8845hs-16gb-1tb-r4050-w11h.jpg',
  },
  {
    id: 10,
    nombre: 'PC Escritorio',
    precio: '$1.899.990',
    anterior: '$2.599.990',
    descuento: '-20%',
    imagen:
      'https://clonesyperifericos.com/wp-content/uploads/2026/08/PC_GAMER_STRIKE.png',
  },
  {
    id: 11,
    nombre: 'SSD 1TB',
    precio: '$219.490',
    anterior: '$249.990',
    descuento: '-10%',
    imagen:
      'https://centrale.cl/wp-content/uploads/Disco-SSD-1TB-Kingston-NV3-M.2-2230-NVMe-PCIe-4.0-x4-Nand-3D-1.webp',
  },
  {
    id: 12,
    nombre: 'Tarjeta Gráfica',
    precio: '$374.990',
    anterior: '$499.990',
    descuento: '-25%',
    imagen:
      'https://media.spdigital.cl/thumbnails/products/_xv8eamf_253e1f5d_thumbnail_512.jpg',
  },
  {
    id: 13,
    nombre: 'Monitor 27"',
    precio: '$269.990',
    anterior: '$299.990',
    descuento: '-10%',
    imagen:
      'https://media.falabella.com/falabellaCL/152191364_01/w=1500,h=1500,fit=cover',
  },
  {
    id: 14,
    nombre: 'Memoria RAM 16GB',
    precio: '$79.190',
    anterior: '$89.990',
    descuento: '-12%',
    imagen:
      'https://m.media-amazon.com/images/I/41XJ679agFL._SL500_.jpg',
  },
  {
    id: 15,
    nombre: 'Teclado Mecánico',
    precio: '$65.590',
    anterior: '$79.990',
    descuento: '-18%',
    imagen:
      'https://static.wixstatic.com/media/19e3c3_ef7569780f3b4a489f4d063817491d71~mv2.jpg/v1/fill/w_560,h_560,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/19e3c3_ef7569780f3b4a489f4d063817491d71~mv2.jpg',
  },
  {
    id: 16,
    nombre: 'Procesador Ryzen',
    precio: '$100.190',
    anterior: '$129.990',
    descuento: '-22%',
    imagen:
      'https://assets.pcfactory.cl/public/foto/46284/2_500.jpg?t=1661280777450',
  },
];

  return (
    <>
      <Navbar />

      <main className="main-content container mt-4">

        {/* BIENVENIDA */}
        <div className="alert alert-info">
          <i className="fas fa-info-circle me-2"></i>
          Bienvenido a PZDREAM - Tu tienda de tecnología
        </div>

        {/* CARRUSEL PRINCIPAL */}
        <div className="carousel-full-width">
            <div
                id="carouselPrincipal"
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="4000"
            >
                {/* Indicadores */}
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselPrincipal"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Banner 1"
                ></button>

                    <button
                        type="button"
                        data-bs-target="#carouselPrincipal"
                        data-bs-slide-to="1"
                        aria-label="Banner 2"
                    ></button>

                    <button
                        type="button"
                        data-bs-target="#carouselPrincipal"
                        data-bs-slide-to="2"
                        aria-label="Banner 3"
                    ></button>
                </div>

                {/* Imágenes */}
                <div className="carousel-inner">
                <div className="carousel-item active">
                    <img
                        src="https://static.gigabyte.com/StaticFile/Image/Global/ef621c152399f9fa78fa110cec3abc29/PromotionBanner/533"
                        className="d-block w-100"
                        alt="Ofertas en computadores"
                    />
                </div>

                <div className="carousel-item">
                    <img
                        src="https://static.pcfactory.cl/imagenes/56433-notebook-gamer-rog-zephyrus-duo-01.webp"
                        className="d-block w-100"
                        alt="Notebooks destacados"
                        loading="lazy"
                    />
                </div>

                <div className="carousel-item">
                    <img
                        src="https://www.winpy.cl/files/ow39550_kingston_nv3_garantia_5_a%C3%A3%C2%B1os.jpg"
                        className="d-block w-100"
                        alt="Accesorios tecnológicos"
                        loading="lazy"
                    />
                </div>
            </div>

            {/* Botón anterior */}
            <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselPrincipal"
            data-bs-slide="prev"
            aria-label="Imagen anterior"
            >
            <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
            ></span>
            </button>

            {/* Botón siguiente */}
            <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselPrincipal"
            data-bs-slide="next"
            aria-label="Imagen siguiente"
            >
            <span
                className="carousel-control-next-icon"
                aria-hidden="true"
            ></span>
            </button>
        </div>
        </div>

        {/* BUSCADOR */}
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
                <i className="fas fa-search me-2"></i>
                Buscar
              </button>
            </div>
          </form>
        </section>

        {/* PRODUCTOS RECOMENDADOS */}
        <section className="product-section my-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="section-title">
            <i className="fas fa-star text-warning me-2"></i>
            Productos Recomendados
            </h2>

            <a href="/catalogo" className="text-decoration-none see-all">
            Ver todos <i className="fas fa-arrow-right"></i>
            </a>
        </div>

        <ProductCarousel
            id="recomendadosCarousel"
            productos={recomendados}
        />
        </section>

        {/* OFERTAS */}
        <section className="product-section my-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="section-title">
                    <i className="fas fa-tags text-danger me-2"></i>
                    En Oferta
                </h2>

                <a href="/ofertas" className="text-decoration-none see-all">
                Ver todos <i className="fas fa-arrow-right"></i>
                </a>
            </div>

            <ProductCarousel
                id="ofertasCarousel"
                productos={ofertas}
                oferta
            />
        </section>

      </main>

      <Footer />
    </>
  );
}

export default Home;