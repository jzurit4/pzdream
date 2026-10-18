import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/CartContext';
import { useUsers } from '../context/UsersContext';
import { useOrders } from '../context/OrdersContext';
import { useAuth } from '../context/AuthContext'; 
import { formatCLP } from '../utils/format';

function Checkout() {
  const navigate = useNavigate();
  const { items, total, clear } = useCart();
  const { registrarCompra, usuarios } = useUsers();
  const { agregarOrden } = useOrders();
  const { user } = useAuth(); // Obtenemos el usuario logueado

  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', calle: '', depto: '', region: 'Región Metropolitana de Santiago', comuna: '', indicaciones: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  //Autocompletar datos si el usuario ya inicio sesión
  useEffect(() => {
    if (user) {
      const datosUsuario = usuarios.find(u => u.email.toLowerCase() === user.email.toLowerCase());
      if (datosUsuario) {
        const partesNombre = datosUsuario.nombre.split(' ');
        setForm(prev => ({
          ...prev,
          nombre: partesNombre[0] || '',
          apellido: partesNombre.slice(1).join(' ') || '',
          email: datosUsuario.email,
          calle: datosUsuario.direccion || '', // Usamos la direccion guardada
        }));
      }
    }
  }, [user, usuarios]);

  if (items.length === 0 && !success) {
    return (
      <Layout>
        <div className="text-center py-5">
          <h3>Tu carrito está vacío</h3>
          <Link to="/catalogo" className="btn btn-primary mt-3">Ir al catálogo</Link>
        </div>
      </Layout>
    );
  }

  // BLOQUEO DE SEGURIDAD: Si no hay usuario, no mostramos el formulario
  if (!user) {
    return (
      <Layout>
        <div className="container py-5 text-center">
          <div className="card shadow-sm col-md-6 mx-auto p-5 border-0">
            <p className="text-muted">Para finalizar tu compra de forma segura, primero debes iniciar sesión con tu cuenta registrada.</p>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Link to="/login" className="btn btn-primary px-4 py-2">
                <i className="fas fa-sign-in-alt me-2"></i>Iniciar Sesión
              </Link>
              <Link to="/registro" className="btn btn-outline-primary px-4 py-2">
                Registrarme
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePagar = (e) => {
    e.preventDefault();
    setError('');

    // Validaciones basicas
    if (!form.nombre || !form.apellido || !form.calle || !form.comuna) {
      setError('Por favor, completa todos los campos obligatorios (*).');
      return;
    }

    // Doble verificacion: comprobar que el correo realmente exista
    const usuarioExiste = usuarios.find(u => u.email.toLowerCase() === form.email.toLowerCase());
    if (!usuarioExiste) {
      setError('El correo ingresado no está registrado. Por favor, verifica tu cuenta.');
      return;
    }

    // Guardar la orden
    agregarOrden({
      cliente: `${form.nombre} ${form.apellido}`,
      email: form.email,
      direccion: `${form.calle}, ${form.comuna}`,
      items: items,
      total: total
    });

    // Sumar compra al usuario
    registrarCompra(form.email);

    // Vaciar carrito y mostrar exito
    clear();
    setSuccess(true);
  };

  if (success) {
    return (
      <Layout>
        <div className="container py-5 text-center">
          <div className="card shadow-sm col-md-6 mx-auto p-5 border-0">
            <i className="fas fa-check-circle fa-5x text-success mb-3"></i>
            <h2 className="fw-bold">¡Pago Exitoso!</h2>
            <p className="text-muted">Tu pedido ha sido procesado correctamente. Recibirás un correo con los detalles.</p>
            <Link to="/" className="btn btn-primary mt-3">Volver al Inicio</Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-light p-4 rounded-4 shadow-sm mx-auto" style={{ maxWidth: '900px' }}>
        
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h3 className="fw-bold mb-1">Carrito de compra</h3>
            <p className="text-muted small mb-0">Completa la siguiente información</p>
          </div>
          <div className="bg-primary text-white p-3 rounded-3 text-center shadow-sm">
            <span className="d-block small">Total a pagar</span>
            <strong className="fs-5">{formatCLP(total)}</strong>
          </div>
        </div>

        {error && <div className="alert alert-danger fw-bold">{error}</div>}

        <form onSubmit={handlePagar}>
          <div className="bg-white p-3 rounded-3 shadow-sm mb-4">
            <table className="table align-middle mb-0">
              <thead className="text-muted small">
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th className="text-end">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td><img src={item.imagen} alt={item.nombre} style={{ width: '40px', height: '40px', objectFit: 'contain' }} /></td>
                    <td className="small fw-semibold">{item.nombre}</td>
                    <td className="small">{formatCLP(item.precio)}</td>
                    <td className="small text-center">{item.cantidad}</td>
                    <td className="small text-end fw-bold">{formatCLP(item.precio * item.cantidad)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold mb-3">Información del cliente</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small text-muted">Nombre*</label>
                <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Apellidos*</label>
                <input type="text" className="form-control" name="apellido" value={form.apellido} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Correo (Cuenta verificada)*</label>
                <input type="email" className="form-control bg-light" name="email" value={form.email} readOnly title="El correo no se puede modificar" />
                <div className="form-text small text-success"><i className="fas fa-check-circle"></i> Sesión iniciada</div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold mb-3">Dirección de entrega</h5>
            <div className="row g-3">
              <div className="col-md-8">
                <label className="form-label small text-muted">Calle*</label>
                <input type="text" className="form-control" name="calle" value={form.calle} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label small text-muted">Departamento (opcional)</label>
                <input type="text" className="form-control" name="depto" value={form.depto} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Región*</label>
                <select className="form-select" name="region" value={form.region} onChange={handleChange} required>
                  <option value="Arica y Parinacota">Región de Arica y Parinacota</option>
                  <option value="Tarapacá">Región de Tarapacá</option>
                  <option value="Antofagasta">Región de Antofagasta</option>
                  <option value="Atacama">Región de Atacama</option>
                  <option value="Coquimbo">Región de Coquimbo</option>
                  <option value="Valparaíso">Región de Valparaíso</option>
                  <option value="Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                  <option value="O'Higgins">Región del Libertador Gral. Bernardo O'Higgins</option>
                  <option value="Maule">Región del Maule</option>
                  <option value="Ñuble">Región de Ñuble</option>
                  <option value="Biobío">Región del Biobío</option>
                  <option value="La Araucanía">Región de La Araucanía</option>
                  <option value="Los Ríos">Región de Los Ríos</option>
                  <option value="Los Lagos">Región de Los Lagos</option>
                  <option value="Aysén">Región de Aysén del Gral. Carlos Ibáñez del Campo</option>
                  <option value="Magallanes">Región de Magallanes y de la Antártica Chilena</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Comuna*</label>
                <input type="text" className="form-control" name="comuna" value={form.comuna} onChange={handleChange} required />
              </div>
              <div className="col-12">
                <label className="form-label small text-muted">Indicaciones para la entrega (opcional)</label>
                <textarea className="form-control" name="indicaciones" rows="2" value={form.indicaciones} onChange={handleChange}></textarea>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-success px-5 py-2 fw-bold fs-5">
              Pagar ahora {formatCLP(total)}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Checkout;