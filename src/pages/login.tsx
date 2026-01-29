import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowRight, Eye, EyeOff, Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStakeholderAuth } from '@/hooks/useStakeholderAuth';
import { usePreviewMode } from '@/hooks/usePreviewMode';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isPreviewMode } = usePreviewMode();
  const { login, isAuthenticated, intendedDestination, setIntendedDestination } = useStakeholderAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the intended destination from location state or stored state
  const from = location.state?.from?.pathname || intendedDestination || '/dashboard';

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Store intended destination for after login
  useEffect(() => {
    if (location.state?.from?.pathname) {
      setIntendedDestination(location.state.from.pathname);
    }
  }, [location.state, setIntendedDestination]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Please enter your email');
      return;
    }

    setIsSubmitting(true);

    // Simulate network delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock login - just sets session
    login(email);
    
    // Clear intended destination after use
    setIntendedDestination(null);
    
    // Navigate to intended destination
    navigate(from, { replace: true });
    
    setIsSubmitting(false);
  };

  const handleDemoLogin = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    login('demo@moneyhive.app', 'Demo', 'User');
    setIntendedDestination(null);
    navigate(from, { replace: true });
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-amber-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        {/* Honeycomb Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="honeycomb" x="0" y="0" width="20" height="23" patternUnits="userSpaceOnUse">
              <polygon points="10,0 20,5.77 20,17.32 10,23.09 0,17.32 0,5.77" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#honeycomb)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/favicon.svg.svg"
                alt="MoneyHive"
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold text-secondary font-jakarta">
                MoneyHive
              </span>
            </Link>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-3xl xl:text-4xl font-bold text-secondary mb-4 leading-tight">
              Send money home,
              <br />
              <span className="text-secondary/80">the smart way.</span>
            </h1>
            <p className="text-base text-secondary/70 max-w-md">
              Join thousands of diaspora members who trust MoneyHive for fast, 
              secure, and affordable transfers to loved ones in Africa.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            <div>
              <div className="text-2xl font-bold text-secondary">£0</div>
              <div className="text-xs text-secondary/60">Transfer fees</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">5 min</div>
              <div className="text-xs text-secondary/60">Delivery time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">3</div>
              <div className="text-xs text-secondary/60">Countries</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-foundation-light via-white to-foundation-light dark:from-foundation-dark dark:via-secondary dark:to-foundation-dark px-4 py-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md my-auto"
        >
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-secondary/60 dark:text-white/60 hover:text-primary dark:hover:text-primary transition-colors group mb-4">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          {/* Mobile Logo */}
          <Link to="/" className="lg:hidden flex items-center justify-center gap-2 mb-6">
            <img
              src="/favicon.svg.svg"
              alt="MoneyHive"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-secondary dark:text-white font-jakarta">
              MoneyHive
            </span>
          </Link>

          {/* Preview Mode Badge */}
          {isPreviewMode && (
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                <Eye className="w-3 h-3" />
                Stakeholder Preview
              </span>
            </div>
          )}

          {/* Card */}
          <div className="bg-white dark:bg-secondary/40 rounded-2xl shadow-2xl shadow-primary/5 p-6 backdrop-blur-sm border border-gray-100 dark:border-gray-800">
            <h1 className="text-xl font-bold text-center text-secondary dark:text-white mb-1.5 font-jakarta">
              Welcome back
            </h1>
            <p className="text-center text-sm text-supporting dark:text-gray-400 mb-5">
              Sign in to continue to your dashboard
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl p-3 mb-4 text-xs"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-secondary dark:text-white mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-secondary/30 text-secondary dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-xs font-medium text-secondary dark:text-white">
                    Password
                  </label>
                  <button type="button" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-secondary/30 text-secondary dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-secondary py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white dark:bg-secondary/40 text-gray-500">
                  or continue with
                </span>
              </div>
            </div>

            {/* Demo Login Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleDemoLogin}
              disabled={isSubmitting}
              className="w-full py-2.5 text-sm rounded-xl border-2 border-primary/30 hover:border-primary hover:bg-primary/5"
            >
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              Quick Demo Login
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-xs text-supporting dark:text-gray-400 mt-4">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                state={{ from: location.state?.from }}
                className="text-primary hover:underline font-semibold"
              >
                Create account
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-4">
            Protected by industry-leading security.{' '}
            <Link to="/legal/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
