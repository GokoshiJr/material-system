import { Navigate, useRoutes, Outlet } from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import EditUser from './pages/EditUser';
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
        { path: 'app', element: <DashboardApp /> },
        { 
          path: 'user', 
          element: 
          <>
            <User />            
          </>,
          children: [{
            path: ':id',
            element: <EditUser />
          }]
        },
        
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'profile', element: <Profile /> },
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
