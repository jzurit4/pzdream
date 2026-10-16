import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import ProductCard from '../components/productos/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { CATEGORIAS } from '../data/productos';

import '../assets/css/catalogo.css';

function Catalogo() {
  const { productos } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [busqueda, setBusqueda] = useState('');

  const categoriaActiva = searchParams.get('categoria') || '';

  const filtrados = useMemo(() => {
    const term = busqueda.toLowerCase().trim();
    return productos.filter((p) => {
      const okCat = !categoriaActiva || p.categoria === categoriaActiva;
      const okQ =
        !term ||
        p.nombre.toLowerCase().includes(term) ||
        p.descripcion?.toLowerCase().includes(term);
      return okCat && okQ;
    });
  }, [productos, categoriaActiva, busqueda]);

  const setCategoria = (slug) => {
    if (slug) setSearchParams({ categoria: slug });
    else setSearchParams({});
  };

  return (
    <Layout>
      <h1 className="page-title mb-3">
        <i className="fas fa-th-large me-2 text-primary"></i>
        Catálogo de Productos
      </h1>

      {/* Filtros por categoría */}
      <div className="mb-3 d-flex flex-wrap gap-2">
        <button
          type="button"
          className={`btn btn-sm ${!categoriaActiva ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setCategoria('')}
        >
          Todos
        </button>
        {CATEGORIAS.map((c) => (
          <button
            key={c.slug}
            type="button"
            className={`btn btn-sm ${categoriaActiva === c.slug ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setCategoria(c.slug)}
          >
            <i className={`fas ${c.icon} me-1`}></i>
            {c.label}
          </button>
        ))}
      </div>

      {/* Buscador */}
      <div className="mb-3">
        <input
          type="search"
          className="form-control"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <span className="badge bg-primary fs-6 mb-4">
        {filtrados.length} {filtrados.length === 1 ? 'producto' : 'productos'}
      </span>

      {filtrados.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
          <p className="text-muted">No hay productos que coincidan.</p>
          <button
            className="btn btn-primary"
            onClick={() => { setCategoria(''); setBusqueda(''); }}
          >
            Ver todos
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filtrados.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Catalogo;