import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import Menu from './pages/Menu/Menu.tsx';
import Cart from './pages/Cart/Cart.tsx';
import ErrorPages from './pages/ErrorPages/ErrorPages.tsx';
import MenuLayout from './layout/MenuLayout/MenuLayout.tsx';
import Product from './components/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import AuthLayout from './layout/AuthLayout/AuthLayout.tsx';
import Login from './pages/Login/Login.tsx';
import Register from './pages/Register/Register.tsx';
import RequireAuth from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import Success from './pages/Success/Success.tsx';

// const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <MenuLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<>Загрузка...</>}>
            <Menu />
          </Suspense>
        ),
      },
      { path: '/cart', element: <Cart /> },
      { path: '/success', element: <Success /> },

      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <h1>Ошибка</h1>,
        loader: async ({ params }) => {
          return defer({
            // data: await axios.get(`${PREFIX}/products/${params.id}`).then((data) => data),
            data: new Promise((resolve, reject) => {
              axios
                .get(`${PREFIX}/products/${params.id}`)
                .then((data) => resolve(data))
                .catch((e) => reject(e));
            }),
          });
          // const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          // return data;
        },
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  { path: '*', element: <ErrorPages /> },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
