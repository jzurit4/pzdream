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
import Checkout from './pages/checkout'; 

import AdminLogin from './pages/admin/AdminLogin';
import AdminHome from './pages/admin/AdminHome';
import AdminAgregar from './pages/admin/AdminAgregar';
import AdminLista from './pages/admin/AdminLista';
import AdminModificar from './pages/admin/AdminModificar';
import AdminEliminar from './pages/admin/AdminEliminar';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminUsuarioNuevo from './pages/admin/AdminUsuarioNuevo';
import AdminUsuarioEditar from './pages/admin/AdminUsuarioEditar';
import AdminUsuarioHistorial from './pages/admin/AdminUsuarioHistorial';
import AdminOrdenes from './pages/admin/AdminOrdenes';
import AdminOrdenDetalle from './pages/admin/AdminOrdenDetalle';
import AdminProductosCriticos from './pages/admin/AdminProductosCriticos';
import AdminCategorias from './pages/admin/AdminCategorias';
import AdminCategoriaNuevo from './pages/admin/AdminCategoriaNuevo';
import AdminCategoriaEditar from './pages/admin/AdminCategoriaEditar';
import AdminReportes from './pages/admin/AdminReportes';
import AdminPerfil from './pages/admin/AdminPerfil';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Tienda Pública */}
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} /> 
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Panel de Administración */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminHome />} />
        
        <Route path="/admin/ordenes" element={<AdminOrdenes />} />
        <Route path="/admin/ordenes/:id" element={<AdminOrdenDetalle />} />

        <Route path="/admin/agregar" element={<AdminAgregar />} />
        <Route path="/admin/lista" element={<AdminLista />} />
        <Route path="/admin/modificar" element={<AdminModificar />} />
        <Route path="/admin/eliminar" element={<AdminEliminar />} />
        <Route path="/admin/productos-criticos" element={<AdminProductosCriticos />} />

        <Route path="/admin/categorias" element={<AdminCategorias />} />
        <Route path="/admin/categorias/nueva" element={<AdminCategoriaNuevo />} />
        <Route path="/admin/categorias/editar/:id" element={<AdminCategoriaEditar />} />

        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/usuarios/nuevo" element={<AdminUsuarioNuevo />} />
        <Route path="/admin/usuarios/editar/:id" element={<AdminUsuarioEditar />} />
        <Route path="/admin/usuarios/historial/:id" element={<AdminUsuarioHistorial />} />

        <Route path="/admin/reportes" element={<AdminReportes />} />
        <Route path="/admin/perfil" element={<AdminPerfil />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;