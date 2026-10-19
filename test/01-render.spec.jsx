import { screen, fireEvent } from '@testing-library/react';
import Carrito from '../src/pages/carrito';
import Login from '../src/pages/login';
import { renderWithProviders } from './helpers/test-utils';

describe('Pruebas de Renderizado — correcto y condicional', () => {

  it('1) Carrito renderiza una tarjeta por cada producto del catálogo', () => {
    renderWithProviders(<Carrito />, { route: '/carrito' });

    const cards = document.querySelectorAll('.product-card-mini');
    expect(cards.length).toBe(16);

    expect(screen.getAllByText('Notebook Gamer').length).toBeGreaterThan(0);
  });

  it('2) Carrito muestra mensaje "vacío" cuando no hay items', () => {
    renderWithProviders(<Carrito />, { route: '/carrito' });

    expect(screen.getByText(/Tu carrito está vacío/)).toBeTruthy();
  });

  it('3) Login no muestra alerta de error en estado inicial', () => {
    renderWithProviders(<Login />, { route: '/login' });

    expect(document.querySelector('.alert-danger')).toBeNull();
  });

  it('4) Login muestra error con correo no registrado', () => {
    renderWithProviders(<Login />, { route: '/login' });

    fireEvent.change(document.getElementById('username'), { target: { value: 'Test' } });
    fireEvent.change(document.getElementById('email'),    { target: { value: 'no@existe.cl' } });
    fireEvent.change(document.getElementById('password'), { target: { value: 'cualquiera' } });

    fireEvent.submit(document.getElementById('email').closest('form'));

    expect(document.querySelector('.alert-danger')).toBeTruthy();
    expect(screen.getByText(/no está registrado/i)).toBeTruthy();
  });
});