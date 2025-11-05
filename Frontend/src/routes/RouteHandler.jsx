import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function RouteHandler({ type = 'public', component: Component, allowedRoles }) {
  const { user } = useAuthContext();

  // Public routes - redirect login users to dashboard
  if (type === 'public') {
    if (!user) return <Component />;
    
    const redirectPath = user.role === 'admin' ? '/adminDashboard' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  // Protected routes
  if (type === 'protected') {
    if (!user) return <Navigate to="/" replace />;
    
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      const redirectPath = user.role === 'admin' ? '/adminDashboard' : '/dashboard';
      return <Navigate to={redirectPath} replace />;
    }
    
    return <Component />;
  }

  return <Component />;
}

export default RouteHandler