function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        <div className="row">

          {/* PZDREAM */}
          <div className="col-md-4 mb-3">

            <h5 className="footer-title">
              <i className="fas fa-store me-2"></i>
              PZDREAM
            </h5>

            <p className="footer-text">
              Tu tienda de tecnología favorita. Encuentra los mejores
              productos al mejor precio.
            </p>

            <div className="social-icons">

              <a href="#" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>

              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>

              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>

              <a href="#" className="social-link">
                <i className="fab fa-youtube"></i>
              </a>

            </div>

          </div>


          {/* ENLACES */}
          <div className="col-md-2 mb-3">

            <h6 className="footer-title">
              Enlaces
            </h6>

            <ul className="footer-links">

              <li>
                <a href="/">Inicio</a>
              </li>

              <li>
                <a href="/catalogo">Catálogo</a>
              </li>

              <li>
                <a href="/ofertas">Ofertas</a>
              </li>

              <li>
                <a href="/contacto">Contacto</a>
              </li>

            </ul>

          </div>


          {/* CATEGORÍAS */}
          <div className="col-md-2 mb-3">

            <h6 className="footer-title">
              Categorías
            </h6>

            <ul className="footer-links">

              <li>
                <a href="#">Computadores</a>
              </li>

              <li>
                <a href="#">Notebooks</a>
              </li>

              <li>
                <a href="#">Discos duros</a>
              </li>

              <li>
                <a href="#">Tarjetas de video</a>
              </li>

            </ul>

          </div>


          {/* CONTACTO */}
          <div className="col-md-4 mb-3">

            <h6 className="footer-title">
              Contacto
            </h6>

            <ul className="footer-links">

              <li>
                <i className="fas fa-map-marker-alt me-2"></i>
                Santiago, Chile
              </li>

              <li>
                <i className="fas fa-phone me-2"></i>
                +56 9 1234 5678
              </li>

              <li>
                <i className="fas fa-envelope me-2"></i>
                contacto@pzdream.cl
              </li>

              <li>
                <i className="fas fa-clock me-2"></i>
                Lun-Vie: 9:00 - 18:00
              </li>

            </ul>

          </div>

        </div>


        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">

          <div className="row">

            <div className="col text-center">

              <p className="mb-0">

                &copy; 2026 <strong>PZDREAM</strong> -
                Todos los derechos reservados.

                <br className="d-sm-none" />

                <span className="text-muted">
                  Hecho con{' '}
                  <i className="fas fa-heart text-danger"></i>{' '}
                  para los amantes de la tecnología
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