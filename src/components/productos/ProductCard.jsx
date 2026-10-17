import { Link } from 'react-router-dom';
import { formatCLP, calcularDescuento } from '../../utils/format';

export default function ProductCard({ producto }) {
  const { id, nombre, precio, precioOriginal, imagen } = producto;
  const descuento = calcularDescuento(precio, precioOriginal);

  return (
    <div className="col-6 col-md-4 col-lg-3">
      <Link to={`/producto/${id}`} className="product-card text-decoration-none">
        {descuento && <span className="badge-oferta-card">-{descuento}%</span>}
        <img src={imagen} className="img-fluid rounded" alt={nombre} loading="lazy" />
        <h6 className="mt-2 product-name">{nombre}</h6>
        <div className="product-prices">
          {precioOriginal && <span className="old-price">{formatCLP(precioOriginal)}</span>}
          <span className="price">{formatCLP(precio)}</span>
        </div>
      </Link>
    </div>
  );
}