import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useUsers } from '../../context/UsersContext';

function AdminUsuarioHistorial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUsuario } = useUsers();
  const usuario = getUsuario(id);

  return (
    <AdminLayout title="Historial de Compras" subtitle={`Cliente: ${usuario?.nombre || 'Desconocido'}`}>
      <div className="card shadow-sm col-lg-8 mx-auto text-center py-5">
        <i className="fas fa-file-invoice-dollar fa-4x text-muted mb-3"></i>
        <h4>El cliente tiene {usuario?.compras || 0} compras registradas.</h4>
        
        <div className="mt-4">
          <button className="btn btn-primary" onClick={() => navigate('/admin/usuarios')}>
            <i className="fas fa-arrow-left me-2"></i>Volver a Usuarios
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminUsuarioHistorial;