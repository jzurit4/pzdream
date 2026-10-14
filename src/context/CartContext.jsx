import { createContext, useContext, useEffect, useReducer } from 'react';
import { useProducts } from './ProductsContext';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existe = state.find((i) => i.id === action.producto.id);
      if (existe) {
        return state.map((i) =>
          i.id === action.producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...state, { ...action.producto, cantidad: 1 }];
    }
    case 'REMOVE':
      return state.filter((i) => i.id !== action.id);
    case 'CHANGE':
      return state
        .map((i) =>
          i.id === action.id ? { ...i, cantidad: i.cantidad + action.delta } : i
        )
        .filter((i) => i.cantidad > 0);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const { productos } = useProducts();

  const [items, dispatch] = useReducer(cartReducer, [], () => {
    try {
      return JSON.parse(localStorage.getItem('pz_carrito') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('pz_carrito', JSON.stringify(items));
  }, [items]);

  const add = (id) => {
    const producto = productos.find((p) => p.id === Number(id));
    if (!producto) return;
    dispatch({ type: 'ADD', producto });
  };

  const remove = (id) => dispatch({ type: 'REMOVE', id });
  const change = (id, delta) => dispatch({ type: 'CHANGE', id, delta });
  const clear = () => dispatch({ type: 'CLEAR' });

  const total = items.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const count = items.reduce((s, i) => s + i.cantidad, 0);

  return (
    <CartContext.Provider value={{ items, total, count, add, remove, change, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
};