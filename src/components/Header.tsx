import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './theme-toggle';
import { useState, useEffect } from 'react';
import { User, LogOut, Settings, Menu, X, Eye } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { usePreviewMode } from '../hooks/usePreviewMode';
import { useStakeholderAuth, useStakeholderDisplayName } from '../hooks/useStakeholderAuth';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Send Money', path: '/send-money' },
  { name: 'Pay Bills', path: '/pay-bills' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === '/dashboard';
  const { isPreviewMode, disablePreviewMode } = usePreviewMode();
  const { isAuthenticated, logout } = useStakeholderAuth();
  const displayName = useStakeholderDisplayName();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    if (location.pathname === '/') {
      const waitlistSection = document.getElementById('waitlist-section');
      if (waitlistSection) {
        waitlistSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/#waitlist-section';
    }
  };

  return (
    <>
      {/* Preview Mode Banner */}
      {isPreviewMode && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-amber-500 text-black text-center py-1 text-sm font-medium">
          <span className="flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" />
            Preview Mode - Stakeholder Access
            <button
              onClick={disablePreviewMode}
              className="ml-4 px-2 py-0.5 bg-black/20 rounded text-xs hover:bg-black/30"
            >
              Exit Preview
            </button>
          </span>
        </div>
      )}

      <nav className={`fixed w-full z-50 transition-all duration-300 ${isPreviewMode ? 'top-7' : 'top-0'
        } ${isScrolled
          ? 'bg-white/95 dark:bg-foundation-dark/95 shadow-lg backdrop-blur-sm'
          : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <img
                  src="/favicon.svg.svg"
                  alt="MoneyHive"
                  className="h-12 w-auto block dark:hidden transition-transform group-hover:scale-105"
                  style={{ maxWidth: '48px' }}
                />
                <img
                  src="/favicon.svg.svg"
                  alt="MoneyHive"
                  className="h-12 w-auto hidden dark:block transition-transform group-hover:scale-105"
                  style={{ filter: 'brightness(0) invert(1)', maxWidth: '48px' }}
                />
                <span className="ml-3 text-2xl font-bold text-primary font-jakarta transition-colors group-hover:text-primary/80">
                  MoneyHive
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Show ALL nav links in preview mode - ProtectedRoute handles auth redirects */}
              {isPreviewMode && !isDashboard && (
                <div className="flex items-center space-x-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path
                          ? 'text-primary'
                          : 'text-secondary dark:text-foundation-light/80'
                        }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}

              <ThemeToggle />

              {isPreviewMode && isAuthenticated ? (
                // PREVIEW MODE + LOGGED IN: Show Dashboard + User Menu
                <div className="flex items-center space-x-3">
                  {!isDashboard && (
                    <Link to="/dashboard">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/30 hover:border-primary hover:bg-primary/10 text-secondary dark:text-foundation-light"
                      >
                        Dashboard
                      </Button>
                    </Link>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/30 hover:border-primary hover:bg-primary/10 text-secondary dark:text-foundation-light font-jakarta"
                      >
                        <User className="w-4 h-4 mr-2" />
                        {displayName}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/settings')}>
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => {
                          logout();
                          navigate('/');
                        }}
                        className="text-red-600 dark:text-red-400"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : isPreviewMode ? (
                // PREVIEW MODE + NOT LOGGED IN: Show Login/Signup buttons
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary/30 hover:border-primary hover:bg-primary/10 text-secondary dark:text-foundation-light"
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-secondary font-semibold"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              ) : (
                // PUBLIC MODE: Just Waitlist
                <button
                  onClick={scrollToWaitlist}
                  className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-8 py-3 rounded-lg text-lg hover:shadow-button-hover transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                >
                  Join Waitlist
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              {isPreviewMode ? (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              ) : (
                <button
                  onClick={scrollToWaitlist}
                  className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-4 py-2 rounded-lg text-sm hover:shadow-button-hover transition-all duration-300"
                >
                  Join
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu - Enhanced with Smooth Animation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isPreviewMode && isMobileMenuOpen 
              ? 'max-h-screen opacity-100' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-gradient-to-b from-white to-gray-50 dark:from-foundation-dark dark:to-slate-900 border-t border-gray-200 dark:border-gray-800 shadow-xl">
            <div className="px-4 py-6 space-y-1">
              {/* Show ALL nav links - ProtectedRoute handles auth redirects */}
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 text-base font-medium rounded-xl transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'bg-primary/10 text-primary shadow-sm'
                      : 'text-secondary dark:text-foundation-light/80 hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                  style={{
                    animation: isMobileMenuOpen ? `slideIn 0.3s ease-out ${index * 0.05}s both` : 'none'
                  }}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>
              
              {isAuthenticated ? (
                // Logged in: Show Dashboard and Sign Out
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-4 text-base font-medium rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200 shadow-sm"
                    style={{
                      animation: isMobileMenuOpen ? `slideIn 0.3s ease-out ${navLinks.length * 0.05}s both` : 'none'
                    }}
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                      navigate('/');
                    }}
                    className="block w-full text-left py-3 px-4 text-base font-medium rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                    style={{
                      animation: isMobileMenuOpen ? `slideIn 0.3s ease-out ${(navLinks.length + 1) * 0.05}s both` : 'none'
                    }}
                  >
                    <LogOut className="w-4 h-4 inline mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                // Not logged in: Show Login and Sign Up
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-4 text-base font-medium rounded-xl text-secondary dark:text-foundation-light/80 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
                    style={{
                      animation: isMobileMenuOpen ? `slideIn 0.3s ease-out ${navLinks.length * 0.05}s both` : 'none'
                    }}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-4 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-supporting text-white hover:shadow-lg transition-all duration-200"
                    style={{
                      animation: isMobileMenuOpen ? `slideIn 0.3s ease-out ${(navLinks.length + 1) * 0.05}s both` : 'none'
                    }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Slide-in Animation Keyframes */}
        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </nav>
    </>
  );
}