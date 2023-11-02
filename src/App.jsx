import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query';

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
  Register,
  Pay
} from './pages';
import Success from './pages/success/Success';

function App() {
  const queryClient = new QueryClient();
  
  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
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
          path: '/pay/:id',
          element: <Pay />
        },
        {
          path: '/success',
          element: <Success />
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
