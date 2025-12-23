import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './theme-toggle';
import { useState, useEffect } from 'react';
import { User, LogOut, Settings, Bell } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
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

          <div className="hidden md:flex items-center space-x-8">
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
            ) : (
              // Landing Page Header
              <button 
                onClick={scrollToWaitlist}
                className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-8 py-3 rounded-lg text-lg hover:shadow-button-hover transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              >
                Join Waitlist
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            {isDashboard ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/20 hover:border-primary hover:bg-primary/10 text-secondary dark:text-foundation-light font-jakarta"
                  >
                    <User className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
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
            ) : (
              <button 
                onClick={scrollToWaitlist}
                className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-4 py-2 rounded-lg text-sm hover:shadow-button-hover transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Join
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}