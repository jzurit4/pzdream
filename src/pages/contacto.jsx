import { useEffect, useState } from 'react';

import Layout from '../components/layout/Layout';
import '../assets/css/contacto.css';

function Contacto() {
  const usuario = localStorage.getItem('userName');

  const publicacionesIniciales = [
    { id: 1, type: 'duda', title: 'Compatibilidad de RAM con Ryzen 7000', content: '¿Es preferible ir por 6000MHz CL30 o la diferencia frente a CL36 es mínima en juegos?', author: 'Usuario', replies: [] },
    { id: 2, type: 'recomendacion', title: 'Build para edición de video por $800.000 CLP', content: 'Busco armar un PC optimizado para Premiere Pro y After Effects.', author: 'Usuario', replies: [] },
  ];

  const [posts, setPosts] = useState(() => {
    const guardadas = localStorage.getItem('posts');
    return guardadas ? JSON.parse(guardadas) : publicacionesIniciales;
  });

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [replyText, setReplyText] = useState({});
  const [replyOpen, setReplyOpen] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usuario) { alert('Debes iniciar sesión para publicar.'); return; }
    if (!type || !title.trim() || !content.trim()) return;

    const newPost = { id: Date.now(), type, title: title.trim(), content: content.trim(), author: usuario, replies: [] };
    setPosts((prev) => [newPost, ...prev]);
    setType(''); setTitle(''); setContent('');
  };

  const toggleReply = (postId) => setReplyOpen((prev) => (prev === postId ? null : postId));
  const handleReplyChange = (postId, value) => setReplyText((prev) => ({ ...prev, [postId]: value }));

  const handleReplySubmit = (e, postId) => {
    e.preventDefault();
    if (!usuario) { alert('Debes iniciar sesión para responder.'); return; }
    const text = replyText[postId]?.trim();
    if (!text) return;

    const newReply = { id: Date.now(), author: usuario, text };
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, replies: [...post.replies, newReply] } : post
      )
    );
    setReplyText((prev) => ({ ...prev, [postId]: '' }));
    setReplyOpen(null);
  };

  return (
    <Layout>
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">
          <i className="fas fa-headset text-primary me-2"></i>Contacto y Soporte
        </h1>
        <p className="text-muted">Estamos aquí para ayudarte</p>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="contact-card text-center">
            <div className="contact-icon"><i className="fas fa-envelope"></i></div>
            <h5>Correo electrónico</h5>
            <a href="mailto:contacto@pzdream.cl">contacto@pzdream.cl</a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="contact-card text-center">
            <div className="contact-icon"><i className="fas fa-phone-alt"></i></div>
            <h5>Teléfono</h5>
            <a href="tel:+56912345678">+56 9 1234 5678</a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="contact-card text-center">
            <div className="contact-icon"><i className="fas fa-clock"></i></div>
            <h5>Horario de atención</h5>
            <p className="text-muted mb-0">Lun-Vie: 9:00 - 18:00</p>
          </div>
        </div>
      </div>

      <div className="text-center mb-5">
        <h4 className="fw-semibold"><i className="fas fa-share-alt text-primary me-2"></i>Redes Sociales</h4>
        <div className="mt-3">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn-circle"><i className="fab fa-instagram"></i></a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn-circle"><i className="fab fa-facebook-f"></i></a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="social-btn-circle"><i className="fab fa-x-twitter"></i></a>
          <a href="https://discord.com" target="_blank" rel="noreferrer" className="social-btn-circle"><i className="fab fa-discord"></i></a>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="post-card">
            <h4 className="fw-semibold"><i className="fas fa-pen-fancy text-primary me-2"></i>Publica tu consulta</h4>
            <p className="text-muted small">Comparte tus dudas o recomendaciones con la comunidad</p>

            {!usuario && <div className="alert alert-warning">Debes iniciar sesión para publicar o responder.</div>}

            <form className="post-form mt-3" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="tipoPublicacion" className="form-label fw-semibold">Tipo de publicación</label>
                <select id="tipoPublicacion" className="form-select" value={type} onChange={(e) => setType(e.target.value)} required>
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="duda">Tengo una duda técnica</option>
                  <option value="recomendacion">Busco recomendación de componentes</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="tituloPost" className="form-label fw-semibold">Título</label>
                <input type="text" id="tituloPost" className="form-control" placeholder="Ej. ¿Qué fuente recomiendan para una RTX 4080?" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>

              <div className="mb-3">
                <label htmlFor="contenidoPost" className="form-label fw-semibold">Descripción</label>
                <textarea id="contenidoPost" className="form-control" rows="3" placeholder="Describe tu duda o requerimiento..." value={content} onChange={(e) => setContent(e.target.value)} required />
              </div>

              <button type="submit" className="btn btn-primary" disabled={!usuario}>
                <i className="fas fa-paper-plane me-2"></i>Publicar
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="post-card">
            <div className="posts-feed">
              <h4 className="fw-semibold mb-3"><i className="fas fa-comments text-primary me-2"></i>Consultas recientes</h4>

              {posts.map((post) => (
                <article className="post-item" key={post.id}>
                  <span className={`post-badge ${post.type === 'duda' ? 'duda' : 'recomendacion'}`}>
                    {post.type === 'duda' ? 'Duda' : 'Recomendación'}
                  </span>
                  <h5 className="mt-1">{post.title}</h5>

                  <div className="d-flex align-items-center mb-2">
                    <i className="fas fa-user-circle text-secondary me-2"></i>
                    <span className="fw-bold small">{post.author}</span>
                    <span className="text-muted small ms-2">• Justo ahora</span>
                  </div>

                  <p className="text-muted small mb-2">{post.content}</p>

                  <div className="d-flex align-items-center gap-2 mb-2">
                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => toggleReply(post.id)} disabled={!usuario}>
                      <i className="fas fa-reply me-1"></i>Responder
                    </button>
                  </div>

                  <div className="replies-list mb-2">
                    {post.replies.map((reply) => (
                      <div className="reply-item mt-2 ps-3 border-start border-2 border-primary" key={reply.id}>
                        <div className="d-flex align-items-center mb-1">
                          <i className="fas fa-user-circle text-secondary me-2"></i>
                          <span className="fw-bold small">{reply.author}</span>
                          <span className="text-muted small ms-2">• Justo ahora</span>
                        </div>
                        <p className="small text-dark mb-0">{reply.text}</p>
                      </div>
                    ))}
                  </div>

                  {replyOpen === post.id && usuario && (
                    <div className="reply-form-container mb-3">
                      <form className="reply-form d-flex gap-2" onSubmit={(e) => handleReplySubmit(e, post.id)}>
                        <input type="text" className="form-control form-control-sm" placeholder="Escribe tu respuesta..." value={replyText[post.id] || ''} onChange={(e) => handleReplyChange(post.id, e.target.value)} required />
                        <button type="submit" className="btn btn-sm btn-primary">Enviar</button>
                      </form>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contacto;