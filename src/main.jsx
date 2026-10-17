
import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./assets/css/style.css";
import "./assets/css/contacto.css";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";
import { UsersProvider } from "./context/UsersContext";
import { CategoriesProvider } from "./context/CategoriesContext"; 
import { OrdersProvider } from "./context/OrdersContext"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <UsersProvider>
            <CategoriesProvider> 
              <OrdersProvider>
                <App />
              </OrdersProvider>
            </CategoriesProvider>
          </UsersProvider>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  </React.StrictMode>
);