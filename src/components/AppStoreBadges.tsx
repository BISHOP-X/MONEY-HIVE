import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface AppStoreBadgesProps {
  className?: string;
  showTitle?: boolean;
  title?: string;
  titleClassName?: string;
  layout?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}

export function AppStoreBadges({ 
  className = '', 
  showTitle = true, 
  title = 'Join the Hive',
  titleClassName = 'text-xl font-semibold text-secondary dark:text-foundation-light mb-6 font-jakarta text-center',
  layout = 'horizontal',
  size = 'md' 
}: AppStoreBadgesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sizeClasses = useMemo(
    () => ({
      sm: 'w-32 h-10',
      md: 'w-40 h-12',
      lg: 'w-48 h-14'
    }),
    []
  );

  const containerClasses = layout === 'horizontal' 
    ? 'flex flex-col sm:flex-row justify-center items-center gap-6'
    : 'flex flex-col justify-center items-center gap-6';

  useEffect(() => {
    if (!isModalOpen) return;
    if (typeof window === 'undefined') return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleJoinWaitlist = () => {
    closeModal();
    if (typeof window === 'undefined') return;

    const waitlistSection = document.getElementById('waitlist-section');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    window.location.assign('/#waitlist-section');
  };

  return (
    <div className={`${className}`}>
      {showTitle && (
        <h4 className={titleClassName}>{title}</h4>
      )}
      <div className={containerClasses}>
        <motion.button
          type="button"
          className={`inline-flex items-center justify-center bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${sizeClasses[size]}`}
          whileHover={{ 
            y: -2, 
            scale: 1.05,
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)" 
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          aria-label="Download MoneyHive on the Apple App Store"
          onClick={openModal}
        >
          <img 
            src="/appstore.svg" 
            alt="Download on the App Store" 
            className="w-full h-full object-contain"
          />
        </motion.button>
        
        <motion.button
          type="button"
          className={`inline-flex items-center justify-center bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${sizeClasses[size]}`}
          whileHover={{ 
            y: -2, 
            scale: 1.05,
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)" 
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          aria-label="Get MoneyHive on Google Play Store"
          onClick={openModal}
        >
          <img 
            src="/googleplay.svg" 
            alt="Get it on Google Play" 
            className="w-full h-full object-contain"
          />
        </motion.button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Join the Hive"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <motion.div
              className="relative w-full max-w-lg rounded-2xl border border-slate-200/70 bg-white p-6 shadow-2xl dark:border-slate-700/70 dark:bg-slate-900"
              initial={{ y: 16, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white dark:focus-visible:ring-offset-slate-900"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-3 pr-8">
                <h3 className="text-2xl font-bold text-secondary dark:text-foundation-light font-jakarta">
                  Join the Hive
                </h3>
                <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta">
                  Our mobile apps are still under construction. You can experience MoneyHive on the web for now, and join the waitlist to be first in line when we launch.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-secondary transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-900 dark:text-foundation-light dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900 font-jakarta"
                >
                  Continue on web
                </button>
                <button
                  type="button"
                  onClick={handleJoinWaitlist}
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-secondary transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 font-jakarta"
                >
                  Join the waitlist
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}