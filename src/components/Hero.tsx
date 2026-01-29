import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePreviewMode } from '@/hooks/usePreviewMode';
import { useStakeholderAuth } from '@/hooks/useStakeholderAuth';

export function Hero() {
  const { isPreviewMode } = usePreviewMode();
  const { isAuthenticated } = useStakeholderAuth();

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist-section');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById('how-it-works-section');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine CTA based on mode and auth state
  const renderCTA = () => {
    if (isPreviewMode && isAuthenticated) {
      // Logged in stakeholder: Go to Dashboard
      return (
        <Link 
          to="/dashboard"
          className="btn btn-primary group animate-button-pulse"
        >
          Go to Dashboard
          <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      );
    } else if (isPreviewMode) {
      // Preview mode but not logged in: Sign Up
      return (
        <Link 
          to="/signup"
          className="btn btn-primary group animate-button-pulse"
        >
          Get Started
          <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      );
    } else {
      // Public mode: Join Waitlist
      return (
        <button 
          onClick={scrollToWaitlist}
          className="btn btn-primary group animate-button-pulse"
        >
          Join Waitlist
          <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      );
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-hive-gold/20 to-diaspora-blue/20 dark:from-hive-gold/10 dark:to-diaspora-blue/10 backdrop-blur-3xl" />
        <div className="absolute inset-0 mix-blend-multiply bg-gradient-to-b from-transparent via-coconut-milk to-coconut-milk dark:via-midnight-ash dark:to-midnight-ash" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-[2.8rem] font-bold mb-6">
              Built for the Ones Who Never Send Blind.
              <span className="block text-hive-gold dark:text-diaspora-blue mt-2">
                When your money carries meaning, your platform should carry weight.
              </span>
            </h1>
            <p className="text-lg text-midnight-ash/80 dark:text-coconut-milk/80 mb-8 max-w-2xl mx-auto lg:mx-0">
              Welcome to the new standard
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {renderCTA()}
              <button 
                onClick={scrollToHowItWorks}
                className="btn btn-outline"
              >
                How It Works
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hidden lg:flex relative h-[500px] items-center justify-center"
          >
            <img 
              src="/MONEY-HIVE-HERO.png" 
              alt="Send money home with MoneyHive" 
              className="max-w-full max-h-full object-contain drop-shadow-2xl"
              loading="eager"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}