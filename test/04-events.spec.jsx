import { screen, fireEvent } from '@testing-library/react';
import Carrito from '../src/pages/carrito';
import Login from '../src/pages/login';
import { renderWithProviders } from './helpers/test-utils';

describe('Pruebas de Eventos — simulación de usuario', () => {

  it('9) Carrito incrementa la cantidad al hacer click en "+"', () => {
    localStorage.setItem('pz_carrito', JSON.stringify([
      { id: 1, nombre: 'Notebook Gamer', precio: 1299990, imagen: 'x', cantidad: 1 },
    ]));

    renderWithProviders(<Carrito />, { route: '/carrito' });

    fireEvent.click(screen.getByText('+'));

    expect(JSON.parse(localStorage.getItem('pz_carrito'))[0].cantidad).toBe(2);
  });

  it('10) Login invoca loginUser al enviar credenciales válidas', async () => {
    localStorage.setItem('pz_usuarios', JSON.stringify([
      { id: 1, nombre: 'Carlos', email: 'carlos@test.com', password: '12345678',
        telefono: '+56911111111', direccion: 'Santiago' },
    ]));

    renderWithProviders(<Login />, { route: '/login' });

    fireEvent.change(document.getElementById('username'), { target: { value: 'Carlos' } });
    fireEvent.change(document.getElementById('email'),    { target: { value: 'carlos@test.com' } });
    fireEvent.change(document.getElementById('password'), { target: { value: '12345678' } });
    fireEvent.submit(document.getElementById('email').closest('form'));


    await new Promise((resolve) => setTimeout(resolve, 50));

    const user = JSON.parse(localStorage.getItem('pz_user'));
    expect(user).toBeTruthy();
    expect(user.email).toBe('carlos@test.com');
    expect(user.nombre).toBe('Carlos');
  });
});