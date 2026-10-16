import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home';
import Contacto from './pages/contacto';
import Login from './pages/login';
import Registro from './pages/registro';
import Catalogo from './pages/catalogo';
import Producto from './pages/producto';
import Ofertas from './pages/ofertas';
import Nosotros from './pages/nosotros';
import Carrito from './pages/carrito';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;