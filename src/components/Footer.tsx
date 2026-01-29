import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Mail, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PaymentEngine } from './PaymentEngine';
import { AppStoreBadges } from './AppStoreBadges';

export function Footer() {
  const [showPaymentEngine, setShowPaymentEngine] = useState(false);

  return (
    <footer className="bg-secondary py-12 px-4 mode-transition">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content - 4 Column Desktop, 2 Column Tablet, 1 Column Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <img 
              src="/favicon.svg.svg" 
              alt="MoneyHive" 
              className="h-12 w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-foundation-light/80 text-lg leading-relaxed font-jakarta">
              Rewriting the story of sending love across borders. Join the Hive, Today.
            </p>
          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foundation-light text-xl font-jakarta">Product</h3>
            <ul className="space-y-3 text-foundation-light/70">
              <li>
                <Link 
                  to="/send-money" 
                  className="hover:text-primary transition-colors duration-300 ease-in-out text-lg hover:underline focus:text-primary focus:outline-none font-jakarta"
                >
                  Send Money
                </Link>
              </li>
              <li>
                <Link 
                  to="/pay-bills" 
                  className="hover:text-primary transition-colors duration-300 ease-in-out text-lg hover:underline focus:text-primary focus:outline-none font-jakarta"
                >
                  Pay Bills
                </Link>
              </li>
              <li>
                <Link 
                  to="/business" 
                  className="hover:text-primary transition-colors duration-300 ease-in-out text-lg hover:underline focus:text-primary focus:outline-none font-jakarta"
                >
                  Business
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foundation-light text-xl font-jakarta">Company</h3>
            <ul className="space-y-3 text-foundation-light/70">
              <li>
                <Link 
                  to="/about" 
                  className="hover:text-primary transition-colors duration-300 ease-in-out text-lg hover:underline focus:text-primary focus:outline-none font-jakarta"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="hover:text-primary transition-colors duration-300 ease-in-out text-lg hover:underline focus:text-primary focus:outline-none font-jakarta"
                >
                  Global Thread
                </Link>
              </li>
              <li>
                <Link 
                  to="/careers" 
                  className="hover:text-primary transition-colors duration-300 ease-in-out text-lg hover:underline focus:text-primary focus:outline-none font-jakarta"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="hover:text-primary transition-colors duration-300 ease-in-out text-lg hover:underline focus:text-primary focus:outline-none font-jakarta"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foundation-light text-xl font-jakarta">Connect</h3>
            <ul className="space-y-3 text-foundation-light/70">
              <li>
                <a 
                  href="mailto:hello@moneyhiveapp.com" 
                  className="hover:text-primary transition-colors duration-300 ease-in-out flex items-center text-lg hover:underline focus:text-primary focus:outline-none font-jakarta"
                >
                  <Mail className="h-5 w-5 mr-3" />
                  hello@moneyhiveapp.com
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/moneyhiveapp" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors duration-300 ease-in-out flex items-center text-lg hover:underline focus:text-primary focus:outline-none font-jakarta"
                >
                  <Twitter className="h-5 w-5 mr-3" />
                  @moneyhiveapp
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/moneyhiveapp" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors duration-300 ease-in-out flex items-center text-lg hover:underline focus:text-primary focus:outline-none font-jakarta"
                >
                  <Instagram className="h-5 w-5 mr-3" />
                  @moneyhiveapp
                </a>
              </li>
              <li>
                <a 
                  href="https://www.tiktok.com/@moneyhiveapp" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors duration-300 ease-in-out flex items-center text-lg hover:underline focus:text-primary focus:outline-none font-jakarta"
                >
                  <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                  @moneyhiveapp
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/moneyhiveapp" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors duration-300 ease-in-out flex items-center text-lg hover:underline focus:text-primary focus:outline-none font-jakarta"
                >
                  <Linkedin className="h-5 w-5 mr-3" />
                  MoneyHive
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* App Store Badges Section */}
        <div className="border-t border-foundation-light/20 pt-8 mb-8">
          <div className="text-center">
            <AppStoreBadges
              title="Join the Hive"
              titleClassName="text-xl font-semibold text-foundation-light mb-6 font-jakarta"
            />
          </div>
        </div>

        {/* Social Icons and Copyright */}
        <div className="border-t border-foundation-light/20 pt-8 text-center text-foundation-light/70">
          <div className="flex justify-center space-x-6 mb-6">
            <motion.a 
              href="https://x.com/moneyhiveapp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors duration-300 ease-in-out p-2 rounded-full hover:bg-foundation-light/10 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Follow us on Twitter"
              whileHover={{ y: -2, boxShadow: "0px 4px 12px rgba(227, 178, 60, 0.2)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Twitter className="h-6 w-6" />
            </motion.a>
            <motion.a 
              href="https://instagram.com/moneyhiveapp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors duration-300 ease-in-out p-2 rounded-full hover:bg-foundation-light/10 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Follow us on Instagram"
              whileHover={{ y: -2, boxShadow: "0px 4px 12px rgba(227, 178, 60, 0.2)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Instagram className="h-6 w-6" />
            </motion.a>
            <motion.a 
              href="https://www.tiktok.com/@moneyhiveapp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors duration-300 ease-in-out p-2 rounded-full hover:bg-foundation-light/10 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Follow us on TikTok"
              whileHover={{ y: -2, boxShadow: "0px 4px 12px rgba(227, 178, 60, 0.2)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/company/moneyhiveapp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors duration-300 ease-in-out p-2 rounded-full hover:bg-foundation-light/10 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Follow us on LinkedIn"
              whileHover={{ y: -2, boxShadow: "0px 4px 12px rgba(227, 178, 60, 0.2)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Linkedin className="h-6 w-6" />
            </motion.a>
            <motion.a 
              href="mailto:hello@moneyhiveapp.com" 
              className="hover:text-primary transition-colors duration-300 ease-in-out p-2 rounded-full hover:bg-foundation-light/10 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Email us"
              whileHover={{ y: -2, boxShadow: "0px 4px 12px rgba(227, 178, 60, 0.2)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Mail className="h-6 w-6" />
            </motion.a>
            
            {/* Camouflaged Payment Engine Access Button */}
            <motion.button
              onClick={() => setShowPaymentEngine(true)}
              className="hover:text-primary transition-colors duration-300 ease-in-out p-2 rounded-full hover:bg-foundation-light/10 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary opacity-30 hover:opacity-100"
              aria-label="System Settings"
              whileHover={{ y: -2, boxShadow: "0px 4px 12px rgba(227, 178, 60, 0.2)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              title="Payment Engine Access"
            >
              <Settings className="h-6 w-6" />
            </motion.button>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-jakarta">Built with ❤️ by diaspora for diaspora community</p>
            <p className="text-lg font-jakarta">
              © 2025 MoneyHive. All rights reserved. 
              <a 
                href="https://www.moneyhiveapp.com" 
                className="hover:text-primary transition-colors duration-300 ease-in-out ml-2 hover:underline focus:text-primary focus:outline-none"
              >
                www.moneyhiveapp.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Payment Engine Modal */}
      <PaymentEngine 
        isOpen={showPaymentEngine} 
        onClose={() => setShowPaymentEngine(false)} 
      />
    </footer>
  );
}