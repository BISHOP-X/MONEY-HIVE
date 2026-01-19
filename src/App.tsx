import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { ScrollToTop } from './components/ScrollToTop';
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute';
import { supabase } from './lib/supabase';
import { useAuthStore } from './store/auth';

// Pages
import HomePage from './pages/home';
import DashboardPage from './pages/dashboard';
import AboutPage from './pages/about';
import BusinessPage from './pages/business';
import BlogPage from './pages/blog/index';
import CareersPage from './pages/careers';
import ContactPage from './pages/contact';
import SendMoneyPage from './pages/send-money';
import PayBillsPage from './pages/pay-bills';
import TermsPage from './pages/legal/terms';
import PrivacyPage from './pages/legal/privacy';
import CookiesPage from './pages/legal/cookies';

// Auth pages
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import VerifyPage from './pages/verify';

function App() {
  const { setUser, setLoading } = useAuthStore();

  // Initialize auth state on app load
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
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
          {/* Public pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/legal/terms" element={<TermsPage />} />
          <Route path="/legal/privacy" element={<PrivacyPage />} />
          <Route path="/legal/cookies" element={<CookiesPage />} />

          {/* Auth pages (redirect if logged in) */}
          <Route path="/login" element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          } />
          <Route path="/signup" element={
            <PublicOnlyRoute>
              <SignupPage />
            </PublicOnlyRoute>
          } />

          {/* Protected pages (require auth or preview mode) */}
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

export default App;