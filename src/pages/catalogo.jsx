import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import ProductCard from '../components/productos/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { CATEGORIAS } from '../data/productos';

import '../assets/css/catalogo.css';

function Catalogo() {
  const { productos } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const categoriaActiva = searchParams.get('categoria') || '';
  const busquedaUrl = searchParams.get('busqueda') || '';
  
  const [busqueda, setBusqueda] = useState(busquedaUrl);

  // Si el usuario llega desde el Home con una busqueda, actualizamos el input
  useEffect(() => {
    console.log("Categoría activa:", categoriaActiva, "| Búsqueda URL:", busquedaUrl);
    setBusqueda(busquedaUrl);
  }, [busquedaUrl, categoriaActiva]);

  const setCategoria = (slug) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug) newParams.set('categoria', slug);
    else newParams.delete('categoria');
    setSearchParams(newParams);
  };

  const handleSearch = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    
    const newParams = new URLSearchParams(searchParams);
    if (valor.trim()) newParams.set('busqueda', valor);
    else newParams.delete('busqueda');
    
    // replace: true evita que se llene el historial cada vez que presionas una tecla
    setSearchParams(newParams, { replace: true });
  };

  const filtrados = useMemo(() => {
    const term = busqueda.toLowerCase().trim();
    
    return productos.filter((p) => {
      const okCat = !categoriaActiva || p.categoria === categoriaActiva;
      
      const matchNombre = p.nombre.toLowerCase().includes(term);
      const matchDesc = p.descripcion?.toLowerCase().includes(term);
      const matchCat = p.categoria.toLowerCase().includes(term);
      
      const okQ = !term || matchNombre || matchDesc || matchCat;

      return okCat && okQ;
    });
  }, [productos, categoriaActiva, busqueda]);

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

  
      <div className="mb-3">
        <input
          type="search"
          className="form-control"
          placeholder="Buscar por producto o categoría (ej. notebook, teclado)..."
          value={busqueda}
          onChange={handleSearch}
        />
      </div>

      <span className="badge bg-primary fs-6 mb-4">
        {filtrados.length} {filtrados.length === 1 ? 'producto' : 'productos'}
      </span>

      {filtrados.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
          <p className="text-muted">No hay productos que coincidan con "{busqueda}".</p>
          <button
            className="btn btn-primary"
            onClick={() => { 
              setCategoria(''); 
              setBusqueda(''); 
              setSearchParams({}); 
            }}
          >
            Ver todos los productos
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