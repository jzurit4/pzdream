import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';
import '../assets/css/style.css';

function Nosotros() {
  return (
    <>
      <Navbar />

      {/* BANNER DE ANCHO COMPLETO */}
      <div className="about-banner">
        <img
          src="https://picsum.photos/seed/technology/1600/500"
          alt="Sobre PZDREAM"
          className="about-banner-img"
        />
        <div className="about-banner-overlay">
          <h1 className="about-banner-title">Sobre Nosotros</h1>
          <p className="about-banner-sub">Conoce la historia detrás de PZDREAM</p>
        </div>
      </div>

      {/* CONTENIDO INFORMATIVO */}
      <main className="main-content container my-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h2 className="about-title text-center mb-4">
              <i className="fas fa-store-alt text-primary me-2"></i> ¿Quiénes somos?
            </h2>
            <p className="about-text">
              <strong>PZDREAM</strong> nació en 2020 con la misión de acercar la
              tecnología de vanguardia a todos los chilenos. Somos una tienda
              online especializada en hardware, periféricos y equipos de
              computación de las mejores marcas del mercado.
            </p>
            <p className="about-text">
              Nuestro compromiso es ofrecer productos de calidad a precios
              competitivos, respaldados por un servicio al cliente excepcional.
              Creemos que la tecnología debe ser accesible y fácil de entender,
              por eso cada producto en nuestro catálogo está cuidadosamente
              seleccionado para garantizar el mejor rendimiento y durabilidad.
            </p>
            <div className="row mt-4 g-4 text-center">
              <div className="col-md-4">
                <div className="about-feature">
                  <i className="fas fa-shield-alt fa-2x text-primary"></i>
                  <h5 className="mt-2">Garantía</h5>
                  <p className="text-muted small">
                    Todos nuestros productos tienen garantía oficial.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="about-feature">
                  <i className="fas fa-truck-fast fa-2x text-primary"></i>
                  <h5 className="mt-2">Envíos rápidos</h5>
                  <p className="text-muted small">
                    Entregas a todo Chile en 24-48 horas.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="about-feature">
                  <i className="fas fa-headset fa-2x text-primary"></i>
                  <h5 className="mt-2">Soporte 24/7</h5>
                  <p className="text-muted small">
                    Atención al cliente disponible todos los días.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Nosotros;