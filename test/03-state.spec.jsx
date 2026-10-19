import { screen, fireEvent } from '@testing-library/react';
import Login from '../src/pages/login';
import AdminLogin from '../src/pages/admin/AdminLogin';
import { renderWithProviders } from './helpers/test-utils';

describe('Pruebas de Estado (state)', () => {

  it('7) Login actualiza el estado del formulario al escribir', () => {
    renderWithProviders(<Login />, { route: '/login' });

    const username = document.getElementById('username');
    const email    = document.getElementById('email');
    const password = document.getElementById('password');

    fireEvent.change(username, { target: { value: 'Carlos' } });
    fireEvent.change(email,    { target: { value: 'carlos@test.com' } });
    fireEvent.change(password, { target: { value: '12345678' } });

    expect(username.value).toBe('Carlos');
    expect(email.value).toBe('carlos@test.com');
    expect(password.value).toBe('12345678');
  });

  it('8) AdminLogin limpia la contraseña y expone error tras fallo', () => {
    renderWithProviders(<AdminLogin />);

    const password = document.getElementById('contrasenia');
    fireEvent.change(password, { target: { value: 'incorrecta' } });
    fireEvent.submit(password.closest('form'));

    expect(screen.getByText(/Credenciales incorrectas/i)).toBeTruthy();
    expect(password.value).toBe('');
  });
});