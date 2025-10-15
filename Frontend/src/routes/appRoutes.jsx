import { createBrowserRouter, Navigate } from 'react-router-dom';
import RouteHandler from './RouteHandler';
import Login from '../views/Login';
import LandingPage from '../views/LandingPage';
import Dashboard from '../views/Dashboard';
import AppointmentBook from '../views/AppointmentBook';
import UserSignUp from '../views/UserSignUp';
import AdminDashboard from '../views/AdminDashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteHandler type="public" component={LandingPage} />
  },
  {
    path: '/login',
    element: <RouteHandler type="public" component={Login} />
  },
  {
    path: '/signup',
    element: <RouteHandler type="public" component={UserSignUp} />
  },
  {
    path: '/dashboard',
    element: <RouteHandler 
      type="protected" 
      component={Dashboard} 
      allowedRoles={['user']} 
    />
  },
  {
    path: '/adminDashboard',
    element: <RouteHandler 
      type="protected" 
      component={AdminDashboard} 
      allowedRoles={['admin']} 
    />
  },
  {
    path: '/appointment',
    element: <RouteHandler 
      type="protected" 
      component={AppointmentBook} 
      allowedRoles={['user']} 
    />
  }
]);

export default router;