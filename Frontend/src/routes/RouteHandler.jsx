import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function RouteHandler({ type = 'public', component: Component, allowedRoles }) {
  const { user } = useAuthContext();

  // Public routes - redirect logged-in users to their dashboard
  if (type === 'public') {
    if (!user) return <Component />;
    
    // Redirect based on role
    const redirectPath = user.role === 'admin' ? '/adminDashboard' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  // Protected routes
  if (type === 'protected') {
    if (!user) return <Navigate to="/login" replace />;
    
    // Check user has required role
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard
      const redirectPath = user.role === 'admin' ? '/adminDashboard' : '/dashboard';
      return <Navigate to={redirectPath} replace />;
    }
    
    return <Component />;
  }

  return <Component />;
}

export default RouteHandler