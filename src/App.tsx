import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { ScrollToTop } from './components/ScrollToTop';
import { ProtectedRoute, PreviewOnlyRoute } from './components/ProtectedRoute';
import { supabase } from './lib/supabase';
import { useAuthStore } from './store/auth';

// Public pages (always visible)
import HomePage from './pages/home';
import AboutPage from './pages/about';
import BusinessPage from './pages/business';
import BlogPage from './pages/blog/index';
import CareersPage from './pages/careers';
import ContactPage from './pages/contact';
import TermsPage from './pages/legal/terms';
import PrivacyPage from './pages/legal/privacy';
import CookiesPage from './pages/legal/cookies';

// Preview-only pages (stakeholder testing)
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import VerifyPage from './pages/verify';
import DashboardPage from './pages/dashboard';
import SendMoneyPage from './pages/send-money';
import PayBillsPage from './pages/pay-bills';

/**
 * TWO-MODE SYSTEM:
 * 
 * PUBLIC MODE (default - what users see):
 *   - Landing page (/) with waitlist signup
 *   - About, Blog, Contact, Legal pages
 *   - Everything else redirects to /
 * 
 * PREVIEW MODE (stakeholders):
 *   - Access via ?preview=moneyhive2024 or Ctrl+Shift+D
 *   - Full access to all pages including dashboard, send-money, etc.
 *   - Used for testing and stakeholder feedback
 */
function App() {
  const { setUser, setLoading } = useAuthStore();

  // Initialize auth state on app load
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, [setUser, setLoading]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="moneyhive-theme">
      <Router>
        <ScrollToTop />
        <Routes>
          {/* ============================================
              PUBLIC PAGES - Always visible to everyone
              ============================================ */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/legal/terms" element={<TermsPage />} />
          <Route path="/legal/privacy" element={<PrivacyPage />} />
          <Route path="/legal/cookies" element={<CookiesPage />} />

          {/* ============================================
              PREVIEW-ONLY PAGES - Auth pages for testing
              In public mode: redirects to /
              In preview mode: shows login/signup
              ============================================ */}
          <Route path="/login" element={
            <PreviewOnlyRoute>
              <LoginPage />
            </PreviewOnlyRoute>
          } />
          <Route path="/signup" element={
            <PreviewOnlyRoute>
              <SignupPage />
            </PreviewOnlyRoute>
          } />

          {/* ============================================
              PROTECTED PAGES - Internal app pages
              In public mode: redirects to /
              In preview mode: full access for testing
              ============================================ */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/send-money" element={
            <ProtectedRoute>
              <SendMoneyPage />
            </ProtectedRoute>
          } />
          <Route path="/pay-bills" element={
            <ProtectedRoute>
              <PayBillsPage />
            </ProtectedRoute>
          } />
          <Route path="/verify" element={
            <ProtectedRoute>
              <VerifyPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
}

export default App;