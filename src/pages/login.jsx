import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../context/UsersContext';
import '../assets/css/login.css';

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const { usuarios } = useUsers();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Buscamos si el correo existe
    const usuarioExiste = usuarios.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!usuarioExiste) {
      setError('Este correo no está registrado. Por favor, regístrate primero.');
      return;
    }

    // Verificamos la contraseña
    if (usuarioExiste.password !== password) {
      setError('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
      return;
    }

    // Iniciar sesion
    loginUser({ email: email.trim(), nombre: username.trim() });
    localStorage.setItem('userLogged', 'true');
    localStorage.setItem('userName', username.trim());
    localStorage.setItem('userEmail', email.trim());

    navigate('/');
  };

  return (
    <Layout container={false}>
      <div className="login-page">
        <div className="login-card">
          <div className="logo">
            <i className="fas fa-user-circle"></i>
            <h2>Bienvenido</h2>
            <p className="text-muted">Inicia sesión en tu cuenta</p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 text-center small">
              <i className="fas fa-exclamation-circle me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold">Nombre de usuario</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-user"></i></span>
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

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Correo electrónico</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-envelope"></i></span>
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

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-lock"></i></span>
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

            <button type="submit" className="btn btn-login">
              <i className="fas fa-sign-in-alt me-2"></i>Iniciar sesión
            </button>
          </form>

          <div className="register-link">
            ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
          </div>

          <div className="back-home">
            <a href="/"><i className="fas fa-arrow-left me-1"></i>Volver al inicio</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;