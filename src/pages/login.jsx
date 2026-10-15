import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';
import { useCart } from '../context/CartContext';

import '../assets/css/login.css';

function Login() {
  const navigate = useNavigate();
  const { clear } = useCart(); // Obtener la función para reiniciar el carrito

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      return;
    }

    // 1. Limpiar la clave del localStorage directamente
    localStorage.removeItem('pz_carrito');

    // 2. Limpiar el estado de React
    clear();

    // 3. Guardar sesión
    localStorage.setItem('userLogged', 'true');
    localStorage.setItem('userName', username.trim());
    localStorage.setItem('userEmail', email.trim());

    // 4. Redirigir al inicio
    navigate('/');
  };

  return (
    <>
      <Navbar />

      <main className="login-page">
        <div className="login-card">

          <div className="logo">
            <i className="fas fa-user-circle"></i>  

            <h2>Bienvenido</h2>

            <p className="text-muted">
              Inicia sesión en tu cuenta
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Nombre de usuario */}
            <div className="mb-3">
              <label
                htmlFor="username"
                className="form-label fw-semibold"
              >
                Nombre de usuario
              </label>

              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-user"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Ej. Carlos"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Correo */}
            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label fw-semibold"
              >
                Correo electrónico
              </label>

              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-envelope"></i>
                </span>

                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label fw-semibold"
              >
                Contraseña
              </label>

              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-lock"></i>
                </span>

                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Olvidó contraseña */}
            <div className="forgot-link">
              <a href="#" onClick={(e) => e.preventDefault()}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="btn btn-login"
            >
              <i className="fas fa-sign-in-alt me-2"></i>
              Iniciar sesión
            </button>

          </form>

          {/* Registro */}
          <div className="register-link">
            ¿No tienes cuenta?{' '}
            <Link to="/registro">
              Regístrate aquí
            </Link>
          </div>

          {/* Volver */}
          <div className="back-home">
            <Link to="/">
              <i className="fas fa-arrow-left me-1"></i>
              Volver al inicio
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default Login;