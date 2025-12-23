import React from 'react';
import { motion } from 'framer-motion';

interface AppStoreBadgesProps {
  className?: string;
  showTitle?: boolean;
  layout?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}

export function AppStoreBadges({ 
  className = '', 
  showTitle = true, 
  layout = 'horizontal',
  size = 'md' 
}: AppStoreBadgesProps) {
  const sizeClasses = {
    sm: 'w-32 h-10',
    md: 'w-40 h-12',
    lg: 'w-48 h-14'
  };

  const containerClasses = layout === 'horizontal' 
    ? 'flex flex-col sm:flex-row justify-center items-center gap-6'
    : 'flex flex-col justify-center items-center gap-6';

  return (
    <div className={`${className}`}>
      {showTitle && (
        <h4 className="text-xl font-semibold text-secondary dark:text-foundation-light mb-6 font-jakarta text-center">
          Download Our App
        </h4>
      )}
      <div className={containerClasses}>
        <motion.a
          href="#"
          className={`inline-flex items-center justify-center bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${sizeClasses[size]}`}
          whileHover={{ 
            y: -2, 
            scale: 1.05,
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)" 
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          aria-label="Download MoneyHive on the Apple App Store"
        >
          <img 
            src="/appstore.svg" 
            alt="Download on the App Store" 
            className="w-full h-full object-contain"
          />
        </motion.a>
        
        <motion.a
          href="#"
          className={`inline-flex items-center justify-center bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${sizeClasses[size]}`}
          whileHover={{ 
            y: -2, 
            scale: 1.05,
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)" 
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          aria-label="Get MoneyHive on Google Play Store"
        >
          <img 
            src="/googleplay.svg" 
            alt="Get it on Google Play" 
            className="w-full h-full object-contain"
          />
        </motion.a>
      </div>
    </div>
  );
}