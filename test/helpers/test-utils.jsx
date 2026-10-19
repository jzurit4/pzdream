import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthProvider }       from '../../src/context/AuthContext';
import { ProductsProvider }   from '../../src/context/ProductsContext';
import { CartProvider }       from '../../src/context/CartContext';
import { UsersProvider }      from '../../src/context/UsersContext';
import { CategoriesProvider } from '../../src/context/CategoriesContext';
import { OrdersProvider }     from '../../src/context/OrdersContext';

export function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <UsersProvider>
              <CategoriesProvider>
                <OrdersProvider>{ui}</OrdersProvider>
              </CategoriesProvider>
            </UsersProvider>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

export function renderWithRouter(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
  );
}