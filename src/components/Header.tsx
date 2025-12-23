import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './theme-toggle';
import { useState, useEffect } from 'react';
import { User, LogOut, Settings, Bell, Menu, X, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { usePreviewMode } from '../hooks/usePreviewMode';

const navLinks = [
  { name: 'Send Money', path: '/send-money' },
  { name: 'Pay Bills', path: '/pay-bills' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const { isPreviewMode, disablePreviewMode } = usePreviewMode();

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
              {/* Show nav links only in preview mode */}
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

              {isDashboard ? (
                // Dashboard Header - Authenticated User
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/20 hover:border-primary hover:bg-primary/10 text-secondary dark:text-foundation-light font-jakarta"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Notifications</span>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/20 hover:border-primary hover:bg-primary/10 text-secondary dark:text-foundation-light font-jakarta"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Sarah C.
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem>
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : isPreviewMode ? (
                // Preview Mode - Show Login/Dashboard buttons
                <div className="flex items-center space-x-3">
                  <Link to="/dashboard">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary/20 hover:border-primary hover:bg-primary/10"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <button
                    onClick={scrollToWaitlist}
                    className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-6 py-2 rounded-lg text-sm hover:shadow-button-hover transition-all duration-300"
                  >
                    Get Started
                  </button>
                </div>
              ) : (
                // Public - Landing Page Header (Waitlist Only)
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

        {/* Mobile Menu */}
        {isPreviewMode && isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-foundation-dark border-t border-gray-200 dark:border-gray-800">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-base font-medium ${location.pathname === link.path
                      ? 'text-primary'
                      : 'text-secondary dark:text-foundation-light/80'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-gray-200 dark:border-gray-700" />
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-primary"
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}