import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { ScrollToTop } from './components/ScrollToTop';
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

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="moneyhive-theme">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/send-money" element={<SendMoneyPage />} />
          <Route path="/pay-bills" element={<PayBillsPage />} />
          <Route path="/legal/terms" element={<TermsPage />} />
          <Route path="/legal/privacy" element={<PrivacyPage />} />
          <Route path="/legal/cookies" element={<CookiesPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;