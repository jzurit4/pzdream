import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UsersContext = createContext(null);

// Datos de prueba iniciales
const usuariosSeed = [
  { id: 1, nombre: 'Carlos Pérez', email: 'carlos@correo.com', telefono: '+56 9 1111 1111', direccion: 'Santiago Centro', compras: 3 },
  { id: 2, nombre: 'Ana Gómez', email: 'ana@correo.com', telefono: '+56 9 2222 2222', direccion: 'Providencia', compras: 1 },
  { id: 3, nombre: 'Luis Silva', email: 'luis@correo.com', telefono: '+56 9 3333 3333', direccion: 'Las Condes', compras: 0 },
];

export function UsersProvider({ children }) {
  const [usuarios, setUsuarios] = useLocalStorage('pz_usuarios', usuariosSeed);

  // Funcion actualizada para id
  const agregarUsuario = useCallback((data) => {
    setUsuarios((prev) => {
      const maxId = prev.length > 0 ? Math.max(...prev.map(u => Number(u.id))) : 0;
      const nuevoId = maxId + 1;
      const nuevo = { ...data, id: nuevoId, compras: 0 };
      return [...prev, nuevo];
    });
  }, [setUsuarios]);

  const modificarUsuario = useCallback((id, data) => {
    setUsuarios((prev) =>
      prev.map((u) => (u.id === Number(id) ? { ...u, ...data } : u))
    );
  }, [setUsuarios]);

  const eliminarUsuario = useCallback((id) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== Number(id)));
  }, [setUsuarios]);

  const getUsuario = useCallback((id) => {
    return usuarios.find((u) => u.id === Number(id)) || null;
  }, [usuarios]);

  return (
    <UsersContext.Provider value={{ usuarios, agregarUsuario, modificarUsuario, eliminarUsuario, getUsuario }}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error('useUsers debe usarse dentro de UsersProvider');
  return ctx;
};