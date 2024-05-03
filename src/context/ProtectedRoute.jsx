import { Route, Navigate } from 'react-router-dom';
import { useUser } from './usercontext';

const ProtectedRoute = ({ element, requiredRole }) => {
  const { userRole } = useUser();

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

export default ProtectedRoute;
