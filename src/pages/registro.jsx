import { useState } from 'react';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';
import '../assets/css/style.css';
import '../assets/css/registro.css';

function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    email: '',
    password: '',
    terminos: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de registro:', formData);
  };

  return (
    <>
      <Navbar />

      <main className="main-content container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="register-card">
              <h2 className="text-center mb-4">
                <i className="fas fa-user-plus text-primary me-2"></i>Crear Cuenta
              </h2>
              <p className="text-muted text-center mb-4">
                Completa tus datos para registrarte en PZDREAM
              </p>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      placeholder="Ingresa tu nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="apellido" className="form-label">
                      Apellido
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="apellido"
                      placeholder="Ingresa tu apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3 mt-3">
                  <label htmlFor="direccion" className="form-label">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="direccion"
                    placeholder="Calle, número, comuna"
                    value={formData.direccion}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="telefono"
                    placeholder="+56 9 1234 5678"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="ejemplo@correo.cl"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Mínimo 8 caracteres"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <div className="form-text">
                    La contraseña debe tener al menos 8 caracteres.
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="terminos"
                      checked={formData.terminos}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="terminos">
                      Acepto los{' '}
                      <a href="#" className="text-primary">
                        términos y condiciones
                      </a>
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn btn-register w-100">
                  <i className="fas fa-user-check me-2"></i>Registrarse
                </button>
              </form>

              <div className="login-link text-center mt-4">
                <p className="mb-0">
                  ¿Ya tienes cuenta?{' '}
                  <a href="/login" className="text-primary fw-semibold">
                    Inicia sesión aquí
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Registro;