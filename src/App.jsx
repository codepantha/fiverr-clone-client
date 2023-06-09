import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import './index.scss';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import {
  Add,
  Gig,
  Gigs,
  Home,
  Login,
  Message,
  Messages,
  MyGigs,
  Orders,
  Register
} from './pages';

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/gigs',
          element: <Gigs />
        },
        {
          path: '/myGigs',
          element: <MyGigs />
        },
        {
          path: '/orders',
          element: <Orders />
        },
        {
          path: '/messages',
          element: <Messages />
        },
        {
          path: '/messages/:id',
          element: <Message />
        },
        {
          path: '/add',
          element: <Add />
        },
        {
          path: '/gigs/:id',
          element: <Gig />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/login',
          element: <Login />
        }
      ]
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
