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
 * TWO-MODE SYSTEM:
 * 
 * PUBLIC MODE (default):
 *   - Users can ONLY see the landing page + waitlist
 *   - ALL internal pages redirect to home (/)
 *   - No login, no signup, no dashboard - nothing
 * 
 * PREVIEW MODE (stakeholders):
 *   - Full access to test all features
 *   - Activated via ?preview=moneyhive2024 or Ctrl+Shift+D
 *   - Auth still works but isn't required for viewing
 */
export function ProtectedRoute({ 
  children, 
  requireAuth = true,
  requireKYC = false 
}: ProtectedRouteProps) {
  const { isPreviewMode } = usePreviewMode();
  const { user, isLoading, kycStatus } = useAuthStore();
  const location = useLocation();

  // PUBLIC MODE: Redirect everything to home (waitlist only)
  if (!isPreviewMode) {
    return <Navigate to="/" replace />;
  }

  // === PREVIEW MODE BELOW ===

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

  // In preview mode, auth is optional for viewing
  // But if requireAuth is true and we're testing the real flow, check auth
  if (requireAuth && !user) {
    // In preview mode, we allow viewing without auth for demo purposes
    // Real auth enforcement happens when going live
    // For now, just render children in preview mode
  }

  // Require KYC verification for sensitive pages (like send-money)
  if (requireKYC && user && kycStatus !== 'verified') {
    return <Navigate to="/verify" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

/**
 * PreviewOnlyRoute - For pages that should only exist in preview mode
 * (login, signup, verify, etc.)
 * 
 * In public mode: Redirect to home
 * In preview mode: Show the page
 */
export function PreviewOnlyRoute({ children }: { children: React.ReactNode }) {
  const { isPreviewMode } = usePreviewMode();
  const { user, isLoading } = useAuthStore();

  // PUBLIC MODE: These pages don't exist - go to waitlist
  if (!isPreviewMode) {
    return <Navigate to="/" replace />;
  }

  // PREVIEW MODE: Show the page
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
