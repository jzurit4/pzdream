import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';

export default function Layout({ children, container = true }) {
  return (
    <>
      <Navbar />
      <main className={container ? 'main-content container my-4' : 'main-content'}>
        {children}
      </main>
      <Footer />
    </>
  );
}