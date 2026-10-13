import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Contacto from './pages/contacto';
import Login from './pages/login';
import Home from './pages/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path='/contacto' element={<Contacto />} />S
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
