import { Navigate, useLocation } from 'react-router-dom';
import { usePreviewMode } from '@/hooks/usePreviewMode';
import { useStakeholderAuth } from '@/hooks/useStakeholderAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
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
 *   - Must be logged in via mock auth to access protected pages
 *   - Not logged in? → Redirect to /login
 *   - Activated via ?preview=moneyhive2024
 */
export function ProtectedRoute({ 
  children, 
  requireAuth = true,
}: ProtectedRouteProps) {
  const { isPreviewMode } = usePreviewMode();
  const { isAuthenticated, _hasHydrated } = useStakeholderAuth();
  const location = useLocation();

  // Wait for Zustand to hydrate from localStorage before making decisions
  if (!_hasHydrated) {
    // Show nothing while hydrating (prevents flash redirect)
    return null;
  }

  // PUBLIC MODE: Redirect everything to home (waitlist only)
  if (!isPreviewMode) {
    return <Navigate to="/" replace />;
  }

  // === PREVIEW MODE BELOW ===

  // PREVIEW MODE: Require mock login for protected pages
  if (requireAuth && !isAuthenticated) {
    // Store the intended destination and redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

/**
 * PreviewOnlyRoute - For pages that should only exist in preview mode
 * (login, signup, etc.)
 * 
 * In public mode: Redirect to home
 * In preview mode: Show the page (unless already logged in)
 */
export function PreviewOnlyRoute({ children }: { children: React.ReactNode }) {
  const { isPreviewMode } = usePreviewMode();
  const { isAuthenticated, _hasHydrated } = useStakeholderAuth();

  // Wait for Zustand to hydrate from localStorage before making decisions
  if (!_hasHydrated) {
    return null;
  }

  // PUBLIC MODE: These pages don't exist - go to waitlist
  if (!isPreviewMode) {
    return <Navigate to="/" replace />;
  }

  // PREVIEW MODE: If already logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
