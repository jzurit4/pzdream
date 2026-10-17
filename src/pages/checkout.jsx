import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/CartContext';
import { useUsers } from '../context/UsersContext';
import { useOrders } from '../context/OrdersContext';
import { formatCLP } from '../utils/format';

function Checkout() {
  const navigate = useNavigate();
  const { items, total, clear } = useCart();
  const { registrarCompra, usuarios } = useUsers();
  const { agregarOrden } = useOrders();

  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', calle: '', depto: '', region: 'Región Metropolitana de Santiago', comuna: '', indicaciones: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePagar = (e) => {
    e.preventDefault();
    setError('');

    // Validaciones basicas
    if (!form.nombre || !form.apellido || !form.email || !form.calle || !form.comuna) {
      setError('Por favor, completa todos los campos obligatorios (*).');
      return;
    }

    // Validar si el usuario existe 
    const usuarioExiste = usuarios.find(u => u.email.toLowerCase() === form.email.toLowerCase());
    if (!usuarioExiste) {
      setError('El correo ingresado no está registrado. Por favor, regístrate primero o usa un correo válido.');
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

    // Vaciar carrito y mostrar éxito
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
                <input type="text" className="form-control" name="nombre" onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Apellidos*</label>
                <input type="text" className="form-control" name="apellido" onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Correo*</label>
                <input type="email" className="form-control" name="email" onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold mb-3">Dirección de entrega</h5>
            <div className="row g-3">
              <div className="col-md-8">
                <label className="form-label small text-muted">Calle*</label>
                <input type="text" className="form-control" name="calle" onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label small text-muted">Departamento (opcional)</label>
                <input type="text" className="form-control" name="depto" onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Región*</label>
                <select className="form-select" name="region" onChange={handleChange} required>
                <option value="">Selecciona una región...</option>
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
                <input type="text" className="form-control" name="comuna" onChange={handleChange} required />
              </div>
              <div className="col-12">
                <label className="form-label small text-muted">Indicaciones para la entrega (opcional)</label>
                <textarea className="form-control" name="indicaciones" rows="2" onChange={handleChange}></textarea>
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