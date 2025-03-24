import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function AdminRoute({ children }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!user?.role || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}