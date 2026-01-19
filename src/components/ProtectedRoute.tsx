import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { usePreviewMode } from '@/hooks/usePreviewMode';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireKYC?: boolean;
}

/**
 * ProtectedRoute - Guards internal pages
 * 
 * Logic:
 * 1. If in preview mode → allow access (for stakeholder demos)
 * 2. If auth is loading → show spinner
 * 3. If not authenticated → redirect to login
 * 4. If requireKYC and not verified → redirect to verify page
 * 5. Otherwise → render children
 */
export function ProtectedRoute({ 
  children, 
  requireAuth = true,
  requireKYC = false 
}: ProtectedRouteProps) {
  const { isPreviewMode } = usePreviewMode();
  const { user, isLoading, kycStatus } = useAuthStore();
  const location = useLocation();

  // Preview mode bypasses all protection
  if (isPreviewMode) {
    return <>{children}</>;
  }

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Require authentication
  if (requireAuth && !user) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Require KYC verification for sensitive pages (like send-money)
  if (requireKYC && kycStatus !== 'verified') {
    return <Navigate to="/verify" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

/**
 * PublicOnlyRoute - For pages that authenticated users shouldn't see
 * (e.g., login page when already logged in)
 */
export function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthStore();
  const { isPreviewMode } = usePreviewMode();

  // Preview mode - allow access
  if (isPreviewMode) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
