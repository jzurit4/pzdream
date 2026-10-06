import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Contacto from './pages/contacto';
import Login from './pages/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Contacto />} />

        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
