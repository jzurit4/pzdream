import { screen, fireEvent } from '@testing-library/react';
import ProductCardMini from '../src/components/productos/ProductCardMini';
import { renderWithProviders } from './helpers/test-utils';

describe('Pruebas de Propiedades (props)', () => {

  it('5) ProductCardMini recibe y utiliza la prop "producto"', () => {
    const producto = {
      id: 99,
      nombre: 'Producto de Prueba',
      precio: 12345,
      imagen: 'https://example.com/test.jpg',
    };

    renderWithProviders(<ProductCardMini producto={producto} />);

    expect(screen.getByText('Producto de Prueba')).toBeTruthy();
    expect(screen.getByText(/\$?\s?12[.\s]345/)).toBeTruthy();

    const img = document.querySelector('.product-card-mini img');
    expect(img.src).toBe('https://example.com/test.jpg');
    expect(img.alt).toBe('Producto de Prueba');
  });

  it('6) ProductCardMini expone botón "Agregar" cuyo onClick ejecuta add(id)', () => {
    renderWithProviders(
      <ProductCardMini producto={{ id: 5, nombre: 'X', precio: 1000, imagen: 'x' }} />
    );

    const button = screen.getByRole('button', { name: /agregar/i });
    expect(button).toBeTruthy();

    fireEvent.click(button);


    const carrito = JSON.parse(localStorage.getItem('pz_carrito') || '[]');
    expect(carrito.length).toBe(1);
    expect(carrito[0].id).toBe(5);
    expect(carrito[0].cantidad).toBe(1);
  });
});