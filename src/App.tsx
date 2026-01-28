import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './components/theme-provider';
import { ScrollToTop } from './components/ScrollToTop';
import { ProtectedRoute, PreviewOnlyRoute } from './components/ProtectedRoute';
import { supabase } from './lib/supabase';
import { useAuthStore } from './store/auth';

// Critical path - load immediately
import HomePage from './pages/home';

// Lazy load non-critical pages for better initial load
const AboutPage = lazy(() => import('./pages/about'));
const BusinessPage = lazy(() => import('./pages/business'));
const BlogPage = lazy(() => import('./pages/blog/index'));
const CareersPage = lazy(() => import('./pages/careers'));
const ContactPage = lazy(() => import('./pages/contact'));
const TermsPage = lazy(() => import('./pages/legal/terms'));
const PrivacyPage = lazy(() => import('./pages/legal/privacy'));
const CookiesPage = lazy(() => import('./pages/legal/cookies'));

// Preview-only pages - lazy loaded (stakeholder testing)
const LoginPage = lazy(() => import('./pages/login'));
const SignupPage = lazy(() => import('./pages/signup'));
const VerifyPage = lazy(() => import('./pages/verify'));
const DashboardPage = lazy(() => import('./pages/dashboard'));
const SendMoneyPage = lazy(() => import('./pages/send-money'));
const PayBillsPage = lazy(() => import('./pages/pay-bills'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-foundation-light dark:bg-foundation-dark">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-secondary/60 dark:text-foundation-light/60">Loading...</span>
    </div>
  </div>
);

// Page transition wrapper
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.15, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

// Animated Routes component
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* ============================================
            PUBLIC PAGES - Always visible to everyone
            ============================================ */}
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/business" element={<PageWrapper><BusinessPage /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
        <Route path="/careers" element={<PageWrapper><CareersPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        <Route path="/legal/terms" element={<PageWrapper><TermsPage /></PageWrapper>} />
        <Route path="/legal/privacy" element={<PageWrapper><PrivacyPage /></PageWrapper>} />
        <Route path="/legal/cookies" element={<PageWrapper><CookiesPage /></PageWrapper>} />

        {/* ============================================
            PREVIEW-ONLY PAGES - Auth pages for testing
            In public mode: redirects to /
            In preview mode: shows login/signup
            ============================================ */}
        <Route path="/login" element={
          <PageWrapper>
            <PreviewOnlyRoute>
              <LoginPage />
            </PreviewOnlyRoute>
          </PageWrapper>
        } />
        <Route path="/signup" element={
          <PageWrapper>
            <PreviewOnlyRoute>
              <SignupPage />
            </PreviewOnlyRoute>
          </PageWrapper>
        } />

        {/* ============================================
            PROTECTED PAGES - Internal app pages
            In public mode: redirects to /
            In preview mode: full access for testing
            ============================================ */}
        <Route path="/dashboard" element={
          <PageWrapper>
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          </PageWrapper>
        } />
        <Route path="/send-money" element={
          <PageWrapper>
            <ProtectedRoute>
              <SendMoneyPage />
            </ProtectedRoute>
          </PageWrapper>
        } />
        <Route path="/pay-bills" element={
          <PageWrapper>
            <ProtectedRoute>
              <PayBillsPage />
            </ProtectedRoute>
          </PageWrapper>
        } />
        <Route path="/verify" element={
          <PageWrapper>
            <ProtectedRoute>
              <VerifyPage />
            </ProtectedRoute>
          </PageWrapper>
        } />
      </Routes>
    </AnimatePresence>
  );
}

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
        <Suspense fallback={<PageLoader />}>
          <AnimatedRoutes />
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;