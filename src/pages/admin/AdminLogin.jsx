import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../assets/css/admin.css';

function AdminLogin() {
  const navigate = useNavigate();
  const { admin, loginAdmin } = useAuth();

  const [usuario, setUsuario] = useState('admin');
  const [contrasenia, setContrasenia] = useState('admin123');
  const [error, setError] = useState('');

  useEffect(() => {
    if (admin) navigate('/admin');
  }, [admin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = loginAdmin(usuario.trim(), contrasenia.trim());
    if (ok) {
      navigate('/admin');
    } else {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
      setContrasenia('');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <i className="fas fa-user-shield"></i>
          <h1>Panel de Administración</h1>
          <p>Acceso restringido a administradores</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-login-field">
            <label htmlFor="usuario">Usuario</label>
            <div className="admin-login-input">
              <i className="fas fa-user"></i>
              <input
                type="text"
                id="usuario"
                placeholder="Usuario administrador"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="admin-login-field">
            <label htmlFor="contrasenia">Contraseña</label>
            <div className="admin-login-input">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="contrasenia"
                placeholder="••••••••"
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className="admin-login-error">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}

          <button type="submit" className="admin-login-btn">
            <i className="fas fa-sign-in-alt me-2"></i>
            Acceder al panel
          </button>
        </form>

        <div className="admin-login-footer">
          <Link to="/">
            <i className="fas fa-arrow-left me-1"></i>
            Volver a la tienda
          </Link>
        </div>

        <div className="admin-login-hint">
          <i className="fas fa-info-circle me-1"></i>
          Demo: <strong>admin</strong> / <strong>admin123</strong>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;