import { useMemo } from 'react';

export function useFilteredProducts(productos, { categoria, q } = {}) {
  return useMemo(() => {
    const term = (q || '').toLowerCase().trim();
    return productos.filter((p) => {
      const okCat = !categoria || p.categoria === categoria;
      const okQ =
        !term ||
        p.nombre.toLowerCase().includes(term) ||
        p.descripcion?.toLowerCase().includes(term);
      return okCat && okQ;
    });
  }, [productos, categoria, q]);
}