import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import { useUsers } from '../context/UsersContext';
import '../assets/css/login.css';

function Registro() {
  const navigate = useNavigate();
  const { usuarios, agregarUsuario } = useUsers();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [error, setError] = useState('');

  // 
  const handleTelefonoChange = (e) => {
    const valor = e.target.value;
    // Expresión regular que permite digitos, '+', espacios y guiones
    const valorLimpio = valor.replace(/[^0-9+\s-]/g, '');
    setTelefono(valorLimpio);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }

    // Normalizamos los datos
    const emailNormalizado = email.trim().toLowerCase();
    const telefonoNormalizado = telefono.trim().replace(/\s+/g, ''); // Quita espacios

    // VALIDACIÓN DE FORMATO DE TELÉFONO
    // Empieza con + (opcional), seguido de 8 a 15 dígitos numéricos
    const phoneRegex = /^\+?\d{8,15}$/;
    
    if (!phoneRegex.test(telefonoNormalizado)) {
      setError('El formato del teléfono no es válido. Debe tener entre 8 y 15 dígitos (ej: +56912345678).');
      return;
    }

    // Verificamos si el correo ya existe
    const emailDuplicado = usuarios.some(
      (u) => u.email.toLowerCase() === emailNormalizado
    );

    if (emailDuplicado) {
      setError('Este correo electrónico ya está registrado. Intenta con otro.');
      return;
    }

    // Verificamos si el telefono ya existe
    const telefonoDuplicado = usuarios.some(
      (u) => u.telefono.replace(/\s+/g, '') === telefonoNormalizado
    );

    if (telefonoDuplicado) {
      setError('Este número de teléfono ya está asociado a otra cuenta.');
      return;
    }

    // Si todo esta bien, guardamos al usuario
    agregarUsuario({
      nombre: `${nombre.trim()} ${apellido.trim()}`,
      email: emailNormalizado,
      telefono: telefono.trim(), 
      direccion: direccion.trim(),
      password: password, 
    });

    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    navigate('/login');
  };

  return (
    <Layout container={false}>
      <div className="login-page">
        <div className="login-card" style={{ maxWidth: 520 }}>
          <div className="logo">
            <i className="fas fa-user-plus"></i>
            <h2>Crear Cuenta</h2>
            <p className="text-muted">Completa tus datos para registrarte</p>
          </div>

          {error && <div className="alert alert-danger py-2 text-center small fw-bold">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label fw-semibold">Nombre</label>
                <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="apellido" className="form-label fw-semibold">Apellido</label>
                <input type="text" className="form-control" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
              </div>
            </div>

            <div className="mb-3 mt-3">
              <label htmlFor="direccion" className="form-label fw-semibold">Dirección</label>
              <input type="text" className="form-control" id="direccion" placeholder="Calle, número, comuna" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label htmlFor="telefono" className="form-label fw-semibold">Teléfono</label>
              <input 
                type="tel" 
                className="form-control" 
                id="telefono" 
                placeholder="+56912345678" 
                value={telefono} 
                onChange={handleTelefonoChange} 
                required 
              />
              <div className="form-text small">Ingresa tu número con código de país. Ej: +56912345678</div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Correo electrónico</label>
              <input type="email" className="form-control" id="email" placeholder="ejemplo@correo.cl" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
              <input type="password" className="form-control" id="password" placeholder="Mínimo 8 caracteres" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
              <div className="form-text">La contraseña debe tener al menos 8 caracteres.</div>
            </div>

            <div className="mb-4 form-check">
              <input className="form-check-input" type="checkbox" id="terminos" checked={aceptaTerminos} onChange={(e) => setAceptaTerminos(e.target.checked)} />
              <label className="form-check-label" htmlFor="terminos">
                Acepto los <a href="#" onClick={(e) => e.preventDefault()}>términos y condiciones</a>
              </label>
            </div>

            <button type="submit" className="btn btn-login w-100">
              <i className="fas fa-user-check me-2"></i>Registrarse
            </button>
          </form>

          <div className="register-link">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Registro;