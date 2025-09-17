import React, { useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('ProtectedRoute Debug:', {
    user: !!user,
    loading,
    isAdmin,
    requireAdmin,
    pathname: location.pathname
  });

  useEffect(() => {
    // If not loading and no user, redirect to home with state
    if (!loading && !user) {
      console.log('No user found, redirecting to home');
      navigate('/', { 
        replace: true,
        state: { from: location.pathname, message: 'Je moet eerst inloggen om het dashboard te bekijken.' }
      });
    }
  }, [user, loading, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Laden...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  if (requireAdmin && !isAdmin) {
    console.log('User is not admin, redirecting');
    return <Navigate to="/" replace state={{ 
      message: 'Je hebt geen toestemming om het dashboard te bekijken.' 
    }} />;
  }

  console.log('Access granted to protected route');
  return <>{children}</>;
};