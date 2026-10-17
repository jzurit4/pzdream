import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useProducts } from '../../context/ProductsContext';
import { CATEGORIAS } from '../../data/productos';
import { formatCLP } from '../../utils/format';

function AdminModificar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { productos, modificarProducto, getProducto } = useProducts();

  const idUrl = searchParams.get('id') || '';
  const [id, setId] = useState(idUrl);
  const [form, setForm] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    if (!id) { setForm(null); return; }
    const p = getProducto(id);
    if (p) {
      setForm({
        nombre: p.nombre || '',
        precio: p.precio ?? '',
        precioOriginal: p.precioOriginal ?? '',
        stock: p.stock ?? '',
        imagen: p.imagen || '',
        descripcion: p.descripcion || '',
        categoria: p.categoria || 'notebook',
        oferta: Boolean(p.oferta),
      });
      setMensaje(null);
    } else {
      setForm(null);
    }
  }, [id, getProducto]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || form.precio === '' || form.stock === '') {
      setMensaje({ type: 'danger', text: 'Completa los campos obligatorios.' });
      return;
    }

    modificarProducto(id, {
      ...form,
      precio: Number(form.precio),
      precioOriginal: form.precioOriginal ? Number(form.precioOriginal) : null,
      stock: Number(form.stock),
    });

    setMensaje({ type: 'success', text: `Producto "${form.nombre}" actualizado.` });
  };

  return (
    <AdminLayout title="Modificar Producto" subtitle="Selecciona un producto y actualiza sus datos">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="mb-4">
                <label className="form-label fw-semibold">Seleccionar producto</label>
                <select className="form-select" value={id} onChange={(e) => setId(e.target.value)}>
                  <option value="">-- Seleccionar --</option>
                  {productos.map((p) => (
                    <option key={p.id} value={p.id}>#{p.id} — {p.nombre} ({formatCLP(p.precio)})</option>
                  ))}
                </select>
              </div>

              {form && (
                <form className="admin-form" onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Nombre</label>
                      <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} required />
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
                      <label className="form-label">Precio (CLP)</label>
                      <input type="number" className="form-control" name="precio" value={form.precio} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Precio original</label>
                      <input type="number" className="form-control" name="precioOriginal" value={form.precioOriginal} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Stock</label>
                      <input type="number" className="form-control" name="stock" value={form.stock} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 d-flex align-items-end">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="oferta" id="oferta" checked={form.oferta} onChange={handleChange} />
                        <label className="form-check-label" htmlFor="oferta">Marcar como oferta</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label">URL imagen</label>
                      <input type="text" className="form-control" name="imagen" value={form.imagen} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Descripción</label>
                      <textarea className="form-control" name="descripcion" rows="3" value={form.descripcion} onChange={handleChange}></textarea>
                    </div>
                  </div>

                  {mensaje && <div className={`alert alert-${mensaje.type} mt-3 mb-0`}>{mensaje.text}</div>}

                  <div className="d-flex gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-save me-2"></i>Guardar cambios
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin')}>
                      <i className="fas fa-arrow-left me-2"></i>Cancelar
                    </button>
                  </div>
                </form>
              )}

              {!form && id && <div className="alert alert-warning">No se encontró el producto con ID #{id}.</div>}
              {!id && (
                <div className="text-muted text-center py-4">
                  <i className="fas fa-hand-point-up fa-2x mb-2"></i>
                  <p className="mb-0">Selecciona un producto para editar sus datos.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminModificar;