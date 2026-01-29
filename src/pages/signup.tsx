import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Loader2, ArrowRight, Check, Eye, EyeOff, Shield, Zap, Globe, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStakeholderAuth } from '@/hooks/useStakeholderAuth';
import { usePreviewMode } from '@/hooks/usePreviewMode';

export default function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isPreviewMode } = usePreviewMode();
  const { signup, isAuthenticated, intendedDestination, setIntendedDestination } = useStakeholderAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'form' | 'success'>('form');

  const from = location.state?.from?.pathname || intendedDestination || '/dashboard';

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Store intended destination for after signup
  useEffect(() => {
    if (location.state?.from?.pathname) {
      setIntendedDestination(location.state.from.pathname);
    }
  }, [location.state, setIntendedDestination]);

  const passwordRequirements = [
    { met: formData.password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(formData.password), text: 'One uppercase letter' },
    { met: /[0-9]/.test(formData.password), text: 'One number' },
  ];

  const isPasswordValid = passwordRequirements.every((req) => req.met);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.firstName || !formData.lastName) {
      setError('Please enter your full name');
      return;
    }

    if (!formData.email) {
      setError('Please enter your email');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!isPasswordValid) {
      setError('Password does not meet requirements');
      return;
    }

    setIsSubmitting(true);

    // Simulate network delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock signup - just sets session
    signup(formData.email, formData.firstName, formData.lastName);
    
    // Clear intended destination after use
    setIntendedDestination(null);
    
    // Show success then redirect
    setStep('success');
    
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 2000);
    
    setIsSubmitting(false);
  };

  // Success state
  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-foundation-light via-white to-foundation-light dark:from-foundation-dark dark:via-secondary dark:to-foundation-dark px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-secondary dark:text-white mb-4 font-jakarta">
            Welcome to MoneyHive!
          </h1>
          <p className="text-lg text-supporting dark:text-gray-400 mb-8">
            Your account has been created successfully.
            <br />
            Redirecting to dashboard...
          </p>
          <div className="flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary via-secondary/95 to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
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
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <span className="text-2xl font-bold text-white font-jakarta">
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
            <h1 className="text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight">
              Join the future of
              <br />
              <span className="text-primary">African remittance.</span>
            </h1>
            <p className="text-base text-gray-300 max-w-md mb-8">
              Create your free account and start sending money to Nigeria, 
              Ghana, and Kenya in minutes.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-white text-sm font-semibold mb-0.5">Instant Transfers</h3>
                <p className="text-gray-400 text-xs">Money arrives in minutes, not days</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-white text-sm font-semibold mb-0.5">Bank-Level Security</h3>
                <p className="text-gray-400 text-xs">Your money and data are always protected</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-white text-sm font-semibold mb-0.5">Best Exchange Rates</h3>
                <p className="text-gray-400 text-xs">More money reaches your loved ones</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-foundation-light via-white to-foundation-light dark:from-foundation-dark dark:via-secondary dark:to-foundation-dark px-4 py-4 overflow-y-auto">
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
          <Link to="/" className="lg:hidden flex items-center justify-center gap-2 mb-4">
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
            <div className="flex justify-center mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                <Eye className="w-3 h-3" />
                Stakeholder Preview
              </span>
            </div>
          )}

          {/* Card */}
          <div className="bg-white dark:bg-secondary/40 rounded-2xl shadow-2xl shadow-primary/5 p-5 backdrop-blur-sm border border-gray-100 dark:border-gray-800">
            <h1 className="text-xl font-bold text-center text-secondary dark:text-white mb-1 font-jakarta">
              Create your account
            </h1>
            <p className="text-center text-sm text-supporting dark:text-gray-400 mb-4">
              Start sending money to loved ones today
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl p-2.5 mb-3 text-xs"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-2.5">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-medium text-secondary dark:text-white mb-1">
                    First name
                  </label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                      className="w-full pl-8 pr-2 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-secondary/30 text-secondary dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-medium text-secondary dark:text-white mb-1">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                    className="w-full px-2 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-secondary/30 text-secondary dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-secondary dark:text-white mb-1">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full pl-8 pr-2 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-secondary/30 text-secondary dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-xs font-medium text-secondary dark:text-white mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-8 pr-9 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-secondary/30 text-secondary dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                
                {/* Password Requirements */}
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {passwordRequirements.map((req, i) => (
                    <span
                      key={i}
                      className={`inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                        req.met 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                      }`}
                    >
                      {req.met && <Check className="w-2.5 h-2.5" />}
                      {req.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-medium text-secondary dark:text-white mb-1">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-8 pr-8 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-secondary/30 text-secondary dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <Check className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-green-500" />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-secondary py-2.5 rounded-lg font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all mt-1"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-xs text-supporting dark:text-gray-400 mt-3">
              Already have an account?{' '}
              <Link 
                to="/login" 
                state={{ from: location.state?.from }}
                className="text-primary hover:underline font-semibold"
              >
                Sign in
              </Link>
            </p>

            {/* Terms */}
            <p className="text-center text-[10px] text-gray-400 mt-2">
              By creating an account, you agree to our{' '}
              <Link to="/legal/terms" className="underline hover:text-gray-600">Terms</Link>
              {' '}and{' '}
              <Link to="/legal/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
