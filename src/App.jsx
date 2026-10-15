import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. IMPORTAR TUS PROVEEDORES DE CONTEXTO
import { ProductsProvider } from './context/ProductsContext';
import { CartProvider } from './context/CartContext';

import Contacto from './pages/contacto';
import Login from './pages/login';
import Home from './pages/home';
import Catalogo from './pages/catalogo';
import Ofertas from './pages/ofertas';
import Nosotros from './pages/nosotros';
import Carrito from './pages/carrito';
import Registro from './pages/registro';
import ProductoDetail from './pages/productodetail';

function App() {
  return (
    // 2. ENVOLVER LA APLICACIÓN CON LOS CONTEXTOS
    <ProductsProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/producto/:id" element={<ProductoDetail />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;