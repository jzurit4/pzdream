#PZDREAM - Tienda de Tecnología (E-commerce Frontend)

Este proyecto es la migración y actualización de una tienda online de tecnología a **React.js**. Originalmente construida en HTML/CSS/JS básico, la plataforma ha sido refactorizada para incorporar un framework moderno de frontend, una arquitectura basada en componentes, enrutamiento dinámico (SPA) y un panel de administración completo (CRUD) con persistencia de datos local.

## Características Principales

### Para Clientes (Tienda)

- **Catálogo Interactivo:** Visualización de productos con filtros dinámicos por categoría y buscador en tiempo real.
- **Buscador con Preview:** Barra de búsqueda en el inicio que muestra un autocompletado con imágenes y precios de los productos.
- **Detalle del Producto:** Página individual con especificaciones técnicas, cálculo automático de descuentos y botón de compra.
- **Carrito de Compras:** Gestión de productos añadidos (modificar cantidades, eliminar, vaciar). Persiste en el navegador mediante `localStorage`.
- **Autenticación Simulada:** Formulario de inicio de sesión y registro de usuario.
- **Contacto y Foro:** Sección comunitaria donde los usuarios pueden publicar dudas o recomendaciones (requiere inicio de sesión).

### Para Administradores (Panel Admin)

- **Acceso Restringido:** Inicio de sesión independiente para el administrador.
- **Dashboard:** Estadísticas en tiempo real (Total productos, productos en oferta, stock total).
- **CRUD de Productos:**
  - **Crear**: Formulario completo para agregar nuevos productos.
  - **Leer**: Tabla general con todos los productos del catálogo.
  - **Actualizar**: Edición de datos, precios, stock y categorías.
  - **Eliminar**: Borrado seguro de productos con confirmación.
- **Sincronización Global:** Cualquier cambio realizado en el panel de administración se refleja **al instante** en toda la tienda pública gracias al uso de Context API.
- **Restauración:** Botón para restaurar el catálogo de productos original.

---

## Tecnologías Utilizadas

| Tecnología             | Uso en el Proyecto                                                             |
| :--------------------- | :----------------------------------------------------------------------------- |
| **React 19**           | Framework principal para la construcción de interfaces basadas en componentes. |
| **Vite 8**             | Empaquetador y entorno de desarrollo ultrarrápido.                             |
| **React Router DOM 7** | Enrutamiento dinámico del lado del cliente (SPA).                              |
| **Context API**        | Gestión del estado global (Auth, Cart, Products).                              |
| **Bootstrap 5.3**      | Framework CSS para un diseño responsivo y adaptativo.                          |
| **Font Awesome 6**     | Iconografía del sitio web.                                                     |

---

## Estructura del Proyecto

```text
src/
├── assets/
│   └── css/            # Hojas de estilo modularizadas (admin, carrito, catalogo, etc.)
├── components/
│   ├── admin/          # Componentes exclusivos del panel (AdminLayout, AdminCard)
│   ├── layout/         # Componentes estructurales (Navbar, Footer, Layout)
│   └── productos/      # Componentes de productos (ProductCard, ProductCarousel, MiniCard)
├── context/            # Estados globales (AuthContext, CartContext, ProductsContext)
├── data/               # Datos semilla (productos.js)
├── hooks/              # Hooks personalizados (useLocalStorage, useFilteredProducts)
├── pages/              # Vistas principales y subcarpeta /admin con sus vistas
├── utils/              # Funciones de utilidad (format.js para formatear CLP)
├── App.jsx             # Configuración de rutas
└── main.jsx            # Punto de entrada y proveedores de contexto
```
