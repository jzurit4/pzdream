import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';


//BOLETAS

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [ordenes, setOrdenes] = useLocalStorage('pz_ordenes', []);

  const agregarOrden = useCallback((orden) => {
    const nuevaOrden = {
      ...orden,
      id: Date.now(), // ID único basado en la fecha
      fecha: new Date().toLocaleDateString('es-CL'),
      estado: 'Pagado'
    };
    setOrdenes((prev) => [nuevaOrden, ...prev]);
    return nuevaOrden.id;
  }, [setOrdenes]);

  const getOrden = useCallback((id) => {
    return ordenes.find((o) => o.id === Number(id)) || null;
  }, [ordenes]);

  return (
    <OrdersContext.Provider value={{ ordenes, agregarOrden, getOrden }}>
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders debe usarse dentro de OrdersProvider');
  return ctx;
};