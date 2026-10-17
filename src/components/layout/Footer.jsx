import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">

          <div className="col-md-4 mb-3">
            <h5 className="footer-title">
              <i className="fas fa-store me-2"></i>PZDREAM
            </h5>
            <p className="footer-text">
              Tu tienda de tecnología favorita. Encuentra los mejores
              productos al mejor precio.
            </p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link"><i className="fab fa-facebook-f"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link"><i className="fab fa-instagram"></i></a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-link"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          <div className="col-md-2 mb-3">
            <h6 className="footer-title">Enlaces</h6>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/catalogo">Catálogo</Link></li>
              <li><Link to="/ofertas">Ofertas</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>

          <div className="col-md-2 mb-3">
            <h6 className="footer-title">Categorías</h6>
            <ul className="footer-links">
              <li><Link to="/catalogo?categoria=computador">Computadores</Link></li>
              <li><Link to="/catalogo?categoria=notebook">Notebooks</Link></li>
              <li><Link to="/catalogo?categoria=disco-duro">Discos duros</Link></li>
              <li><Link to="/catalogo?categoria=tarjeta-grafica">Tarjetas de video</Link></li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="footer-title">Contacto</h6>
            <ul className="footer-links">
              <li><i className="fas fa-map-marker-alt me-2"></i>Santiago, Chile</li>
              <li><i className="fas fa-phone me-2"></i>+56 9 1234 5678</li>
              <li><i className="fas fa-envelope me-2"></i>contacto@pzdream.cl</li>
              <li><i className="fas fa-clock me-2"></i>Lun-Vie: 9:00 - 18:00</li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="row">
            <div className="col text-center">
              <p className="mb-0">
                &copy; 2026 <strong>PZDREAM</strong> - Todos los derechos reservados.
                <br className="d-sm-none" />
                <span className="text-muted">
                  Hecho con <i className="fas fa-heart text-danger"></i> para los amantes de la tecnología
                </span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;