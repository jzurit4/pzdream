import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AdminPerfil() {
  const { logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  return (
    <AdminLayout title="Mi Perfil" subtitle="Configuración de la cuenta de administrador">
      <div className="card shadow-sm col-lg-6 mx-auto text-center py-5">
        <i className="fas fa-user-shield fa-5x text-primary mb-4"></i>
        <h3>Administrador Principal</h3>
        <p className="text-muted mb-4">admin@pzdream.cl</p>
        
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-outline-secondary" onClick={() => navigate('/admin')}>
            Volver al Dashboard
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt me-2"></i>Cerrar Sesión
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminPerfil;