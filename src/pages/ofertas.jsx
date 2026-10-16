import Layout from '../components/layout/Layout';
import ProductCard from '../components/productos/ProductCard';
import { useProducts } from '../context/ProductsContext';
import '../assets/css/catalogo.css';

function Ofertas() {
  const { productos } = useProducts();
  const ofertas = productos.filter((p) => p.oferta);

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="page-title">
          <i className="fas fa-tags text-danger me-2"></i>
          Productos en Oferta
        </h1>
        <span className="badge bg-danger fs-6">
          {ofertas.length} {ofertas.length === 1 ? 'producto' : 'productos'}
        </span>
      </div>

      {ofertas.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-tags fa-3x text-muted mb-3"></i>
          <p className="text-muted">No hay ofertas disponibles por ahora.</p>
        </div>
      ) : (
        <div className="row g-4">
          {ofertas.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Ofertas;