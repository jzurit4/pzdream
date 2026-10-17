import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('pz_user', null);
  const [admin, setAdmin] = useLocalStorage('pz_admin', false);

  const loginUser = useCallback(({ email, nombre }) => {
    setUser({ email, nombre: nombre || email.split('@')[0] });
  }, [setUser]);

  const logoutUser = useCallback(() => setUser(null), [setUser]);

  const loginAdmin = useCallback((usuario, contrasenia) => {
    if (usuario === ADMIN_USER && contrasenia === ADMIN_PASS) {
      setAdmin(true);
      return true;
    }
    return false;
  }, [setAdmin]);

  const logoutAdmin = useCallback(() => setAdmin(false), [setAdmin]);

  return (
    <AuthContext.Provider
      value={{ user, admin, loginUser, logoutUser, loginAdmin, logoutAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
};