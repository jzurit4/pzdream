import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useUsers } from '../../context/UsersContext';

function AdminUsuarioNuevo() {
  const navigate = useNavigate();
  const { agregarUsuario } = useUsers();
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', direccion: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarUsuario(form);
    navigate('/admin/usuarios');
  };

  return (
    <AdminLayout title="Nuevo Usuario" subtitle="Registra un nuevo cliente en el sistema">
      <div className="card shadow-sm col-lg-8 mx-auto">
        <div className="card-body">
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre Completo *</label>
              <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo Electrónico *</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input type="text" className="form-control" name="telefono" value={form.telefono} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input type="text" className="form-control" name="direccion" value={form.direccion} onChange={handleChange} />
            </div>
            
            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save me-2"></i>Guardar Usuario
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/usuarios')}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminUsuarioNuevo;