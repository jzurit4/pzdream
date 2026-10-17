import { createContext, useContext, useCallback } from 'react';
import { productosSeed } from '../data/productos';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [productos, setProductos] = useLocalStorage('pz_productos', productosSeed);

  const agregarProducto = useCallback((data) => {
    const nuevo = {
      id: Date.now(),
      nombre: data.nombre?.trim() ?? '',
      precio: Number(data.precio) || 0,
      precioOriginal: data.precioOriginal ? Number(data.precioOriginal) : null,
      stock: Number(data.stock) || 0,
      imagen: data.imagen || 'https://via.placeholder.com/300',
      descripcion: data.descripcion || '',
      categoria: data.categoria || 'general',
      especificaciones: data.especificaciones || {},
      oferta: Boolean(data.oferta),
    };
    setProductos((prev) => [...prev, nuevo]);
    return nuevo;
  }, [setProductos]);

  const modificarProducto = useCallback((id, data) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === Number(id)
          ? {
              ...p,
              ...data,
              precio: data.precio !== undefined ? Number(data.precio) : p.precio,
              stock: data.stock !== undefined ? Number(data.stock) : p.stock,
            }
          : p
      )
    );
  }, [setProductos]);

  const eliminarProducto = useCallback((id) => {
    setProductos((prev) => prev.filter((p) => p.id !== Number(id)));
  }, [setProductos]);

  const getProducto = useCallback(
    (id) => productos.find((p) => p.id === Number(id)) || null,
    [productos]
  );

  const resetProductos = useCallback(
    () => setProductos(productosSeed),
    [setProductos]
  );

  return (
    <ProductsContext.Provider
      value={{ productos, agregarProducto, modificarProducto, eliminarProducto, getProducto, resetProductos }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts debe usarse dentro de ProductsProvider');
  return ctx;
};