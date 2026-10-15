import { Link } from 'react-router-dom';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import '../assets/css/style.css';
import '../assets/css/catalogo.css';

function Catalogo() {
  const { productos } = useProducts();
  const { add } = useCart();

  return (
    <>
      <Navbar />

      <main className="main-content container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="page-title">
            <i className="fas fa-th-large me-2 text-primary"></i>Catálogo de Productos
          </h1>
          <span className="badge bg-primary fs-6">{productos.length} productos</span>
        </div>

        <div className="row g-4">
          {productos.map((prod) => (
            <div key={prod.id} className="col-6 col-md-4 col-lg-3" data-categoria={prod.categoria}>
              <div className="product-card d-flex flex-column justify-content-between h-100">
                <Link to={`/producto/${prod.id}`} className="text-decoration-none">
                  {prod.descuento && <span className="badge-oferta-card">{prod.descuento}</span>}
                  <img
                    src={prod.imagen}
                    className="img-fluid rounded"
                    alt={prod.nombre}
                    loading="lazy"
                  />
                  <h6 className="mt-2 product-name">{prod.nombre}</h6>
                  <div className="product-prices">
                    {prod.anterior && <span className="old-price">{prod.anterior}</span>}
                    <span className="price">{prod.precio}</span>
                  </div>
                </Link>

                <button
                  className="btn btn-sm btn-primary w-100 mt-2"
                  onClick={() => add(prod.id)}
                >
                  <i className="fas fa-cart-plus me-1"></i> Añadir
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Catalogo;