import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import '../assets/css/login.css';

function Registro() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!aceptaTerminos) {
      alert('Debes aceptar los términos y condiciones.');
      return;
    }

    loginUser({ email: email.trim(), nombre: nombre.trim() });

    localStorage.setItem('userLogged', 'true');
    localStorage.setItem('userName', nombre.trim());
    localStorage.setItem('userEmail', email.trim());

    navigate('/');
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
              <input type="tel" className="form-control" id="telefono" placeholder="+56 9 1234 5678" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
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