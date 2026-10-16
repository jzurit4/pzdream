import { formatCLP } from '../../utils/format';
import { useCart } from '../../context/CartContext';

export default function ProductCardMini({ producto }) {
  const { add } = useCart();
  const { id, nombre, precio, imagen } = producto;

  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div className="product-card-mini">
        <img src={imagen} alt={nombre} loading="lazy" />
        <div className="product-name">{nombre}</div>
        <div className="product-price">{formatCLP(precio)}</div>
        <button
          className="btn btn-primary btn-sm btn-add"
          onClick={() => add(id)}
        >
          <i className="fas fa-cart-plus me-1"></i>Agregar
        </button>
      </div>
    </div>
  );
}