# PZDREAM - Tienda de Tecnología (E-commerce Frontend)

Este proyecto es la migración y actualización de una tienda online de tecnología a **React.js**. Originalmente construida en HTML/CSS/JS básico, la plataforma ha sido refactorizada para incorporar un framework moderno de frontend, una arquitectura basada en componentes, enrutamiento dinámico (SPA) y un panel de administración completo (CRUD) con persistencia de datos local.

El proyecto no cuenta con un backend real (servidor o base de datos externa), por lo que toda la lógica de estado, sesiones, usuarios y persistencia se simula utilizando la API de Context de React junto con `localStorage`.

## Características Principales

### Para Clientes (Tienda)

- **Catálogo Interactivo:** Visualización de productos con filtros dinámicos por categoría y buscador en tiempo real.
- **Buscador con Preview:** Barra de búsqueda en el inicio que muestra un autocompletado con imágenes y precios de los productos.
- **Detalle del Producto:** Página individual con especificaciones técnicas, cálculo automático de descuentos y botón de compra.
- **Carrito de Compras:** Gestión de productos añadidos (modificar cantidades, eliminar, vaciar). Persiste en el navegador para no perder los productos al recargar.
- **Checkout Realista:** Proceso de pago que requiere inicio de sesión, autocompleta los datos del cliente, valida la existencia del correo y bloquea la edición del mismo para evitar fraudes.
- **Autenticación:** Registro con validación de formato de teléfono, correo único y contraseña segura. Inicio de sesión validado contra los usuarios registrados.
- **Contacto y Foro:** Sección comunitaria donde los usuarios pueden publicar dudas o recomendaciones (requiere inicio de sesión).

### Para Administradores (Panel Admin)

- **Acceso Restringido:** Inicio de sesión independiente para el administrador.
- **Dashboard:** Estadísticas en tiempo real con accesos rápidos a todas las secciones.
- **Órdenes y Boletas:** Historial de compras reales generadas por los clientes. Permite visualizar la boleta detallada con los productos comprados.
- **Gestión de Productos (CRUD):**
  - Crear, Leer, Actualizar y Eliminar productos del catálogo.
  - **Reabastecimiento:** Función para sumar stock a cualquier producto (tanto desde el listado general como desde el listado de productos críticos).
  - **Listado Crítico:** Alerta visual de productos con stock menor a 5 unidades o agotados.
- **Gestión de Categorías (CRUD):** Creación y edición de las categorías que alimentan el catálogo público.
- **Gestión de Usuarios:**
  - CRUD completo de clientes registrados.
  - **Historial de Compras:** Acceso a todas las boletas generadas por un cliente específico.
- **Reportes Dinámicos:** Visualización de ingresos reales, ticket promedio, valor del inventario, gráfico de ventas por categoría y alertas de bajo stock. Todos los datos se calculan en tiempo real basados en las compras y el inventario.
- **Perfil de Administrador:** Opción para reiniciar la tienda por completo (borra los datos y restaura el catálogo inicial), ideal para pruebas y demostraciones.

---

## Tecnologías Utilizadas

| Tecnología             | Uso en el Proyecto                                                             |
| :--------------------- | :----------------------------------------------------------------------------- |
| **React 19**           | Framework principal para la construcción de interfaces basadas en componentes. |
| **Vite 8**             | Empaquetador y entorno de desarrollo ultrarrápido.                             |
| **React Router DOM 7** | Enrutamiento dinámico del lado del cliente (SPA).                              |
| **Context API**        | Gestión del estado global (Auth, Cart, Products, Users, Categories, Orders).   |
| **localStorage**       | Simulación de base de datos y persistencia de datos del lado del cliente.      |
| **Bootstrap 5.3**      | Framework CSS para un diseño responsivo y adaptativo.                          |
| **Font Awesome 6**     | Iconografía del sitio web.                                                     |

---

## Arquitectura y Persistencia de Datos

Al no tener un servidor, la aplicación guarda todo en el navegador del usuario. Los datos se dividen en los siguientes estados globales (Context API) y se guardan en las siguientes claves de `localStorage`:

| Contexto              | Clave en localStorage  | Propósito                                                                   |
| :-------------------- | :--------------------- | :-------------------------------------------------------------------------- |
| **AuthContext**       | `pz_user` / `pz_admin` | Guarda la sesión activa del cliente y del administrador.                    |
| **ProductsContext**   | `pz_productos`         | Almacena el catálogo completo, incluyendo precios y stock.                  |
| **CartContext**       | `pz_carrito`           | Guarda los productos que el cliente va a comprar.                           |
| **UsersContext**      | `pz_usuarios`          | Almacena los clientes registrados, contraseñas e historial de compras.      |
| **CategoriesContext** | `pz_categorias`        | Guarda las categorías disponibles para filtrar productos.                   |
| **OrdersContext**     | `pz_ordenes`           | Almacena el registro histórico de todas las boletas generadas en la tienda. |

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
├── context/            # Estados globales y persistencia (Auth, Cart, Products, Users, Categories, Orders)
├── data/               # Datos semilla (productos.js)
├── hooks/              # Hooks personalizados (useLocalStorage, useFilteredProducts)
├── pages/              # Vistas principales y subcarpeta /admin con sus vistas
│   └── admin/          # CRUD de Productos, Usuarios, Categorías, Órdenes, Reportes
├── utils/              # Funciones de utilidad (format.js para formatear CLP)
├── App.jsx             # Configuración de rutas
└── main.jsx            # Punto de entrada y proveedores de contexto
```
