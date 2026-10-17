import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useProducts } from '../../context/ProductsContext';
import { CATEGORIAS } from '../../data/productos';

function AdminAgregar() {
  const navigate = useNavigate();
  const { agregarProducto } = useProducts();

  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    precioOriginal: '',
    stock: '',
    imagen: '',
    descripcion: '',
    categoria: 'notebook',
    oferta: false,
  });

  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.precio || !form.stock) {
      setMensaje({ type: 'danger', text: 'Completa los campos obligatorios.' });
      return;
    }

    agregarProducto({
      ...form,
      precio: Number(form.precio),
      precioOriginal: form.precioOriginal ? Number(form.precioOriginal) : null,
      stock: Number(form.stock),
    });

    setMensaje({ type: 'success', text: `Producto "${form.nombre}" agregado correctamente.` });
    setTimeout(() => navigate('/admin/lista'), 1200);
  };

  return (
    <AdminLayout title="Agregar Producto" subtitle="Completa los campos para añadir un nuevo producto">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <form className="admin-form" onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nombre *</label>
                    <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Notebook Gamer" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Categoría</label>
                    <select className="form-select" name="categoria" value={form.categoria} onChange={handleChange}>
                      {CATEGORIAS.map((c) => (
                        <option key={c.slug} value={c.slug}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Precio (CLP) *</label>
                    <input type="number" className="form-control" name="precio" value={form.precio} onChange={handleChange} placeholder="1299990" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Precio original (si está en oferta)</label>
                    <input type="number" className="form-control" name="precioOriginal" value={form.precioOriginal} onChange={handleChange} placeholder="1499990" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Stock *</label>
                    <input type="number" className="form-control" name="stock" value={form.stock} onChange={handleChange} placeholder="10" required />
                  </div>
                  <div className="col-md-6 d-flex align-items-end">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="oferta" id="oferta" checked={form.oferta} onChange={handleChange} />
                      <label className="form-check-label" htmlFor="oferta">Marcar como oferta</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label">URL de la imagen</label>
                    <input type="text" className="form-control" name="imagen" value={form.imagen} onChange={handleChange} placeholder="https://..." />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Descripción</label>
                    <textarea className="form-control" name="descripcion" rows="3" value={form.descripcion} onChange={handleChange}></textarea>
                  </div>
                </div>

                {mensaje && <div className={`alert alert-${mensaje.type} mt-3 mb-0`}>{mensaje.text}</div>}

                <div className="d-flex gap-2 mt-4">
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-save me-2"></i>Guardar producto
                  </button>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin')}>
                    <i className="fas fa-arrow-left me-2"></i>Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminAgregar;