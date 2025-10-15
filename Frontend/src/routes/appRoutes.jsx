import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Login from '../views/Login';
import LandingPage from '../views/LandingPage';
import Dashboard from '../views/Dashboard';
import AppointmentBook from '../views/AppointmentBook';
import UserSignUp from '../views/UserSignUp';
import AdminDashboard from '../views/AdminDashboard';

function RouteHandler({ type = 'public', component: Component }) {
  const { user } = useAuthContext();

  if (type === 'public') {
    return !user ? <Component /> : <Navigate to="/dashboard" replace />;
  }

  if (type === 'protected') {
    return user ? <Component /> : <Navigate to="/login" replace />;
  }

  return <Component />;
}

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <RouteHandler type="public" component={LandingPage} />
  // },
  {
    path: '/',
    element: <AdminDashboard />
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
    element: <RouteHandler type="protected" component={Dashboard} />
  },
  {
    path: '/appointment',
    element: <RouteHandler type="protected" component={AppointmentBook} />
  }
]);

export default router;