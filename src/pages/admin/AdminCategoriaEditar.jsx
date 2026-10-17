import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useCategories } from '../../context/CategoriesContext';

function AdminCategoriaEditar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCategoria, modificarCategoria } = useCategories();
  const [form, setForm] = useState({ label: '', slug: '' });

  useEffect(() => {
    const c = getCategoria(id);
    if (c) setForm(c);
  }, [id, getCategoria]);

  const handleSubmit = (e) => {
    e.preventDefault();
    modificarCategoria(id, form);
    navigate('/admin/categorias');
  };

  return (
    <AdminLayout title="Editar Categoría" subtitle="Actualiza los datos de la categoría">
      <div className="card shadow-sm col-lg-6 mx-auto border-0">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Nombre visible</label>
              <input type="text" className="form-control" value={form.label} onChange={e => setForm({...form, label: e.target.value})} required />
            </div>
            <div className="mb-4">
              <label className="form-label fw-bold">Slug (URL sin espacios)</label>
              <input type="text" className="form-control" value={form.slug} onChange={e => setForm({...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Guardar Cambios</button>
            <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => navigate('/admin/categorias')}>Volver a la lista</button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
export default AdminCategoriaEditar;