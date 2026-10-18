import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UsersContext = createContext(null);

const usuariosSeed = [
  { id: 1, nombre: 'Carlos Pérez', email: 'carlos@correo.com', telefono: '+56 9 1111 1111', direccion: 'Santiago Centro', compras: 0, password: '123456' },
  { id: 2, nombre: 'Ana Gómez', email: 'ana@correo.com', telefono: '+56 9 2222 2222', direccion: 'Providencia', compras: 0, password: '123456' },
];

export function UsersProvider({ children }) {
  const [usuarios, setUsuarios] = useLocalStorage('pz_usuarios', usuariosSeed);

  const agregarUsuario = useCallback((data) => {
    setUsuarios((prev) => {
      const maxId = prev.length > 0 ? Math.max(...prev.map(u => Number(u.id))) : 0;
      return [...prev, { ...data, id: maxId + 1, compras: 0 }];
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

  // Funcion para guardar en boleta
  const registrarCompra = useCallback((email) => {
    setUsuarios((prev) => 
      prev.map((u) => 
        u.email.toLowerCase() === email.toLowerCase() 
          ? { ...u, compras: (u.compras || 0) + 1 } 
          : u
      )
    );
  }, [setUsuarios]);

  return (
    <UsersContext.Provider value={{ usuarios, agregarUsuario, modificarUsuario, eliminarUsuario, getUsuario, registrarCompra }}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error('useUsers debe usarse dentro de UsersProvider');
  return ctx;
};