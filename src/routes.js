import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
// 
import RequireAuth from './context/RequireAuth';
import IsLogged from './context/IsLogged';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: 
        <RequireAuth>
          <DashboardLayout />
        </RequireAuth>,
      children: [
        { path: 'app', element: 
          <RequireAuth>
            <DashboardApp /> 
          </RequireAuth>
        },
        { path: 'user', element: 
          <RequireAuth>
            <User />
          </RequireAuth>
        },
        { path: 'products', element: 
          <RequireAuth>
            <Products /> 
          </RequireAuth>
        },
        { path: 'blog', element: 
          <RequireAuth>
            <Blog /> 
          </RequireAuth>
        },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: 'login', element: 
          <IsLogged>
            <Login />
          </IsLogged> 
        },
        { path: 'register', element: 
          <IsLogged>
            <Register />
          </IsLogged> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
