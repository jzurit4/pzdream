import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CategoriesContext = createContext(null);

const categoriasSeed = [
  { id: 1, slug: 'computador', label: 'Computadores' },
  { id: 2, slug: 'notebook', label: 'Notebooks' },
  { id: 3, slug: 'disco-duro', label: 'Discos duros' },
  { id: 4, slug: 'tarjeta-grafica', label: 'Tarjetas de video' },
  { id: 5, slug: 'monitor', label: 'Monitores' },
  { id: 6, slug: 'ram', label: 'Memorias RAM' },
  { id: 7, slug: 'teclado', label: 'Teclados' },
  { id: 8, slug: 'mouse', label: 'Mouse' },
  { id: 9, slug: 'procesador', label: 'Procesadores' },
];

export function CategoriesProvider({ children }) {
  const [categorias, setCategorias] = useLocalStorage('pz_categorias', categoriasSeed);

  const agregarCategoria = useCallback((data) => {
    setCategorias((prev) => {
      const maxId = prev.length > 0 ? Math.max(...prev.map(c => Number(c.id))) : 0;
      return [...prev, { ...data, id: maxId + 1 }];
    });
  }, [setCategorias]);

  const modificarCategoria = useCallback((id, data) => {
    setCategorias((prev) =>
      prev.map((c) => (c.id === Number(id) ? { ...c, ...data } : c))
    );
  }, [setCategorias]);

  const eliminarCategoria = useCallback((id) => {
    setCategorias((prev) => prev.filter((c) => c.id !== Number(id)));
  }, [setCategorias]);

  const getCategoria = useCallback((id) => {
    return categorias.find((c) => c.id === Number(id)) || null;
  }, [categorias]);

  return (
    <CategoriesContext.Provider value={{ categorias, agregarCategoria, modificarCategoria, eliminarCategoria, getCategoria }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export const useCategories = () => {
  const ctx = useContext(CategoriesContext);
  if (!ctx) throw new Error('useCategories debe usarse dentro de CategoriesProvider');
  return ctx;
};