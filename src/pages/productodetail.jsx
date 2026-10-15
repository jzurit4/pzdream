import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import '../assets/css/style.css';

// Función para formatear el precio a Pesos Chilenos (CLP)
const formatPrecio = (valor) => {
  if (typeof valor === 'string') return valor; // Si ya viene formateado como "$1.299.990"
  if (typeof valor === 'number') {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(valor);
  }
  return '$0';
};

function ProductoDetail() {
  const { id } = useParams();
  const { productos } = useProducts();
  const { add } = useCart();

  // Buscar el producto correspondiente por ID
  const producto = productos?.find((p) => p.id === Number(id));

  if (!producto) {
    return (
      <>
        <Navbar />
        <main className="main-content container my-5 text-center">
          <div className="alert alert-warning my-5">
            <h4><i className="fas fa-exclamation-triangle me-2"></i>Producto no encontrado</h4>
            <p>El producto que buscas no existe o ha sido removido.</p>
            <Link to="/catalogo" className="btn btn-primary mt-3">
              Volver al Catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Soporta tanto precioOriginal (contexto) como anterior (semilla legacy)
  const precioPrevio = producto.precioOriginal || producto.anterior;

  return (
    <>
      <Navbar />

      <main className="main-content container my-5">
        <div className="row g-4 align-items-center">
          {/* Imagen del Producto */}
          <div className="col-md-6">
            <div className="product-image-container">
              {producto.descuento && (
                <span className="badge-oferta-detalle">{producto.descuento}</span>
              )}
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="img-fluid rounded"
              />
            </div>
          </div>

          {/* Información del Producto */}
          <div className="col-md-6">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                <li className="breadcrumb-item"><Link to="/catalogo">Catálogo</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
              </ol>
            </nav>

            <h1 className="fw-bold mb-3">{producto.nombre}</h1>

            <div className="mb-3">
              {precioPrevio && (
                <span className="old-price-detalle">{formatPrecio(precioPrevio)}</span>
              )}
              <span className="price-detalle">{formatPrecio(producto.precio)}</span>
            </div>

            <p className="text-muted mb-4">
              {producto.descripcion || 'Excelente producto de tecnología respaldado con garantía oficial PZDREAM.'}
            </p>

            {/* Acciones */}
            <div className="d-grid gap-2 d-md-flex">
              <button
                className="btn btn-primary btn-lg px-4"
                onClick={() => add(producto.id)}
              >
                <i className="fas fa-cart-plus me-2"></i>Añadir al Carrito
              </button>

              <Link to="/catalogo" className="btn btn-outline-secondary btn-lg px-4">
                Volver al catálogo
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default ProductoDetail;