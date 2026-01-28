import React, { useState, useEffect } from 'react';
import { CreditCard, ArrowRight, Globe2, Banknote, Lock, Smartphone, QrCode, Loader2, CheckCircle, X, AlertCircle, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { AppStoreBadges } from "@/components/AppStoreBadges";
import { SocialProof } from "@/components/SocialProof";
import { addToWaitlist } from "@/lib/supabase";

// Simple fade-in animation component using CSS
const FadeIn = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <div 
    className={`animate-fadeIn ${className}`}
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
  >
    {children}
  </div>
);

// Country type for proper typing
interface Country {
  name: string;
  code: string;
  flag: string;
}

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countrySearchOpen, setCountrySearchOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    sendToCountry: ''
  });

  const countries: Country[] = [
    { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
    { name: "United States", code: "US", flag: "🇺🇸" },
    { name: "Canada", code: "CA", flag: "🇨🇦" },
    { name: "Australia", code: "AU", flag: "🇦🇺" },
    { name: "Germany", code: "DE", flag: "🇩🇪" },
    { name: "France", code: "FR", flag: "🇫🇷" },
    { name: "Nigeria", code: "NG", flag: "🇳🇬" },
    { name: "Ghana", code: "GH", flag: "🇬🇭" },
    { name: "South Africa", code: "ZA", flag: "🇿🇦" },
    { name: "Kenya", code: "KE", flag: "🇰🇪" },
    { name: "India", code: "IN", flag: "🇮🇳" },
    { name: "China", code: "CN", flag: "🇨🇳" },
    { name: "Brazil", code: "BR", flag: "🇧🇷" },
    { name: "Mexico", code: "MX", flag: "🇲🇽" },
    { name: "Japan", code: "JP", flag: "🇯🇵" },
    { name: "South Korea", code: "KR", flag: "🇰🇷" },
    { name: "Singapore", code: "SG", flag: "🇸🇬" },
    { name: "United Arab Emirates", code: "AE", flag: "🇦🇪" },
    { name: "Saudi Arabia", code: "SA", flag: "🇸🇦" },
    { name: "Turkey", code: "TR", flag: "🇹🇷" },
    { name: "Russia", code: "RU", flag: "🇷🇺" },
    { name: "Italy", code: "IT", flag: "🇮🇹" },
    { name: "Spain", code: "ES", flag: "🇪🇸" },
    { name: "Netherlands", code: "NL", flag: "🇳🇱" },
    { name: "Sweden", code: "SE", flag: "🇸🇪" },
    { name: "Switzerland", code: "CH", flag: "🇨🇭" },
    { name: "Belgium", code: "BE", flag: "🇧🇪" },
    { name: "Portugal", code: "PT", flag: "🇵🇹" },
    { name: "Poland", code: "PL", flag: "🇵🇱" },
    { name: "Egypt", code: "EG", flag: "🇪🇬" },
    { name: "Ethiopia", code: "ET", flag: "🇪🇹" }
  ];

  const filteredCountries = countrySearch
    ? countries.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase()))
    : countries;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setFormData({ ...formData, country: country.name });
    setCountrySearchOpen(false);
  };

  const scrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById('how-it-works-section');
    if (howItWorksSection) {
      const yOffset = -80; // Offset for fixed header
      const y = howItWorksSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Get phone placeholder based on selected country
  const getPhonePlaceholder = () => {
    if (!selectedCountry) return 'Select your country first';
    const phonePlaceholders: Record<string, string> = {
      'GB': '+44 XXXX XXXXXX',
      'US': '+1 (XXX) XXX-XXXX',
      'CA': '+1 (XXX) XXX-XXXX',
      'AU': '+61 XXX XXX XXX',
      'DE': '+49 XXX XXXXXXX',
      'FR': '+33 X XX XX XX XX',
      'NG': '+234 XXX XXX XXXX',
      'GH': '+233 XX XXX XXXX',
      'ZA': '+27 XX XXX XXXX',
      'KE': '+254 XXX XXXXXX',
      'IN': '+91 XXXXX XXXXX',
      'CN': '+86 XXX XXXX XXXX',
      'BR': '+55 XX XXXXX XXXX',
      'MX': '+52 XX XXXX XXXX',
      'JP': '+81 XX XXXX XXXX',
      'KR': '+82 XX XXXX XXXX',
      'SG': '+65 XXXX XXXX',
      'AE': '+971 XX XXX XXXX',
      'SA': '+966 XX XXX XXXX',
      'TR': '+90 XXX XXX XXXX',
      'RU': '+7 XXX XXX XXXX',
      'IT': '+39 XXX XXX XXXX',
      'ES': '+34 XXX XXX XXX',
      'NL': '+31 X XXXXXXXX',
      'SE': '+46 XX XXX XXXX',
      'CH': '+41 XX XXX XXXX',
      'BE': '+32 XXX XX XX XX',
      'PT': '+351 XXX XXX XXX',
      'PL': '+48 XXX XXX XXX',
      'EG': '+20 XX XXXX XXXX',
      'ET': '+251 XX XXX XXXX'
    };
    return phonePlaceholders[selectedCountry.code] || 'Enter your phone number';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await addToWaitlist({
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone || undefined,
        country: formData.country || 'Unknown',
        send_to_country: formData.sendToCountry || undefined,
        referral_source: document.referrer || 'direct'
      });

      setSubmitStatus({
        type: 'success',
        message: `Thank you for joining the waitlist, ${formData.firstName}! You'll be among the first to experience MoneyHive.`
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        sendToCountry: ''
      });
      setSelectedCountry(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist-section');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-foundation-light to-white dark:from-foundation-dark dark:to-slate-900 mode-transition">
      <Header />

      {/* Hero Section with Globe */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/10 dark:to-accent/10 backdrop-blur-3xl" />
          <div className="absolute inset-0 mix-blend-multiply bg-gradient-to-b from-transparent via-foundation-light to-foundation-light dark:via-foundation-dark dark:to-foundation-dark" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <FadeIn className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-[3.8rem] font-bold mb-4 md:mb-6 text-secondary dark:text-foundation-light font-jakarta leading-[1.15] tracking-tight">
                Bridging Hearts<br className="hidden sm:block" /> Across Continents
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-primary dark:text-primary mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 font-jakarta">
                Your money travels fast. Your love travels faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <button
                  onClick={scrollToWaitlist}
                  className="btn btn-primary group hover:-translate-y-0.5 hover:shadow-lg active:scale-95 transition-all duration-200 w-full sm:w-auto"
                >
                  Join Waitlist
                  <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button
                  className="btn btn-outline hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all duration-200 w-full sm:w-auto"
                  onClick={scrollToHowItWorks}
                >
                  How It Works
                </button>
              </div>
            </FadeIn>

            {/* Hero Image */}
            <FadeIn delay={200} className="hidden lg:flex relative h-[500px] items-center justify-center">
              <img 
                src="/MONEY-HIVE-HERO.png" 
                alt="Send money home with MoneyHive" 
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                loading="eager"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-spacing px-4 bg-slate-50 dark:bg-slate-800/50 mode-transition">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10 md:mb-16 px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-secondary dark:text-foundation-light font-jakarta"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              AI Powered Remittances
            </motion.h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-secondary/80 dark:text-foundation-light/80 font-jakarta max-w-4xl mx-auto">
              Fast, Secure, and Designed for Diaspora Families Like Yours
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
            <motion.div
              className="bg-white dark:bg-slate-700/50 p-8 rounded-2xl consistent-hover shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-14 h-14 bg-accent/20 dark:bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <Globe2 className="w-7 h-7 text-accent dark:text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light font-jakarta">
                Rapid Global Transfers
              </h3>
              <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta leading-relaxed">
                Starting with the UK to Nigeria, Send money to countries in under 60 seconds on average, with real time tracking and competitive exchange rates that keep more in your pocket.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-slate-700/50 p-8 rounded-2xl consistent-hover shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-14 h-14 bg-supporting/20 dark:bg-supporting/10 rounded-full flex items-center justify-center mb-6">
                <CreditCard className="w-7 h-7 text-supporting dark:text-supporting" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light font-jakarta">
                Seamless Local Bill Payments
              </h3>
              <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta leading-relaxed">
                Easily pay utilities, school fees, and other essentials directly to providers in your home country.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-slate-700/50 p-8 rounded-2xl consistent-hover shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-14 h-14 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Banknote className="w-7 h-7 text-primary dark:text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light font-jakarta">
                Affordable Rates with Full Transparency
              </h3>
              <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta leading-relaxed">
                Benefit from low fees and no hidden charges, potentially saving up to 8x compared to traditional banks. See exactly what you pay upfront.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-slate-700/50 p-8 rounded-2xl consistent-hover shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-14 h-14 bg-green-500/20 dark:bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                <Lock className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light font-jakarta">
                Robust Security You Can Trust
              </h3>
              <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta leading-relaxed">
                Protect your transfers with end to end encryption, biometric authentication, and 24/7 fraud detection, bank grade protection for peace of mind.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-slate-700/50 p-8 rounded-2xl consistent-hover shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-14 h-14 bg-purple-500/20 dark:bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
                <Gift className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light font-jakarta">
                Earn Rewards & Send Gifts Home
              </h3>
              <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta leading-relaxed">
                Earn points on every transaction that you can convert to cash. Plus, join our quarterly prize draws where we send foodstuff, gifts, and hampers directly to your loved ones back home. Building community, rewarding loyalty.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Diaspora-First Fintech Solutions */}
      <section className="section-spacing px-4 bg-white dark:bg-foundation-dark mode-transition">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10 md:mb-16 px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-secondary dark:text-foundation-light font-jakarta">
              Diaspora First Fintech Solutions
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-secondary/80 dark:text-foundation-light/80 max-w-4xl mx-auto font-jakarta">
              Discover how our startup innovation bridges financial gaps for families across borders, with secure, affordable tools tailored for diaspora communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-16">
            {/* Seamless Rate Locking */}
            <motion.div
              className="bg-slate-50 dark:bg-slate-800/50 p-5 md:p-8 rounded-2xl consistent-hover shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-secondary dark:text-foundation-light font-jakarta">
                  Seamless Rate Locking
                </h3>
                <p className="text-secondary/80 dark:text-foundation-light/80 mb-6 font-jakarta leading-relaxed">
                  Lock in competitive exchange rates for UK Nigeria transfers, ensuring you get the best value without market surprises.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg">
                  <span className="text-sm font-medium text-secondary/70 dark:text-foundation-light/70 font-jakarta">Rate Stability</span>
                  <span className="text-lg font-bold text-primary dark:text-primary font-jakarta">99.5%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg">
                  <span className="text-sm font-medium text-secondary/70 dark:text-foundation-light/70 font-jakarta">Lock Option</span>
                  <span className="text-lg font-bold text-primary dark:text-primary font-jakarta">30 Day</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg">
                  <span className="text-sm font-medium text-secondary/70 dark:text-foundation-light/70 font-jakarta">Better Value</span>
                  <span className="text-lg font-bold text-primary dark:text-primary font-jakarta">Up to 6%</span>
                </div>
              </div>

              <div className="p-4 bg-primary/10 dark:bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-sm italic text-secondary dark:text-foundation-light font-jakarta">
                  "Secure today's rate for your next family support transfer to Lagos."
                </p>
              </div>
            </motion.div>

            {/* Effortless Scheduling Tools */}
            <motion.div
              className="bg-slate-50 dark:bg-slate-800/50 p-5 md:p-8 rounded-2xl consistent-hover shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-secondary dark:text-foundation-light font-jakarta">
                  Effortless Scheduling Tools
                </h3>
                <p className="text-sm md:text-base text-secondary/80 dark:text-foundation-light/80 mb-4 md:mb-6 font-jakarta leading-relaxed">
                  Set up recurring remittances or one time payments with flexible options, designed for busy diaspora lifestyles.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg">
                  <span className="text-sm font-medium text-secondary/70 dark:text-foundation-light/70 font-jakarta">Setup Options</span>
                  <span className="text-lg font-bold text-primary dark:text-primary font-jakarta">Weekly/Monthly</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg">
                  <span className="text-sm font-medium text-secondary/70 dark:text-foundation-light/70 font-jakarta">Fee Reduction</span>
                  <span className="text-lg font-bold text-primary dark:text-primary font-jakarta">1 to 5%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg">
                  <span className="text-sm font-medium text-secondary/70 dark:text-foundation-light/70 font-jakarta">On Time Delivery</span>
                  <span className="text-lg font-bold text-primary dark:text-primary font-jakarta">98.7%</span>
                </div>
              </div>

              <div className="p-4 bg-primary/10 dark:bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-sm italic text-secondary dark:text-foundation-light font-jakarta">
                  "Schedule monthly school fees to Nigeria and save on repeat transactions."
                </p>
              </div>
            </motion.div>

            {/* Trusted Security Protocols */}
            <motion.div
              className="bg-slate-50 dark:bg-slate-800/50 p-5 md:p-8 rounded-2xl consistent-hover shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-secondary dark:text-foundation-light font-jakarta">
                  Trusted Security Protocols
                </h3>
                <p className="text-sm md:text-base text-secondary/80 dark:text-foundation-light/80 mb-4 md:mb-6 font-jakarta leading-relaxed">
                  Multi layer verification and fraud monitoring protect your funds, compliant with global fintech standards.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg">
                  <span className="text-sm font-medium text-secondary/70 dark:text-foundation-light/70 font-jakarta">Secure Transactions</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400 font-jakarta">99.9%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg">
                  <span className="text-sm font-medium text-secondary/70 dark:text-foundation-light/70 font-jakarta">Alerts</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400 font-jakarta">Instant</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg">
                  <span className="text-sm font-medium text-secondary/70 dark:text-foundation-light/70 font-jakarta">Fraud Policy</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400 font-jakarta">Zero Tolerance</span>
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <p className="text-sm italic text-secondary dark:text-foundation-light font-jakarta">
                  "Funds verified and protected during your UK to Nigeria transfer."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <SocialProof />

      {/* How it Works */}
      <section id="how-it-works-section" className="section-spacing px-4 bg-white dark:bg-foundation-dark mode-transition">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-secondary dark:text-foundation-light font-jakarta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-accent/20 dark:bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-accent dark:text-accent font-jakarta">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light font-jakarta">Send Money or Pay Bills</h3>
              <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta">Choose to transfer money directly to your loved ones or pay bills like utilities, school fees, and other essentials on their behalf.</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-supporting/20 dark:bg-supporting/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-supporting dark:text-supporting font-jakarta">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light font-jakarta">Connect your bank or card</h3>
              <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta">Securely link your payment method with bank-grade encryption.</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary dark:text-primary font-jakarta">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light font-jakarta">Family receives it instantly</h3>
              <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta">Bills are paid instantly and your family is notified immediately.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile App Teaser Section */}
      <section className="section-spacing px-4 bg-gradient-to-br from-primary/5 to-supporting/5 dark:from-primary/10 dark:to-supporting/10 mode-transition">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-secondary dark:text-foundation-light font-jakarta">
                MoneyHive Mobile App
                <span className="block text-primary dark:text-primary mt-2">Coming Soon</span>
              </h2>
              <p className="text-base md:text-lg text-secondary/80 dark:text-foundation-light/80 mb-6 md:mb-8 font-jakarta">
                Experience the future of remittances on your mobile device. Send money, pay bills, and stay connected with your loved ones anywhere, anytime.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-secondary dark:text-foundation-light font-jakarta">Instant notifications for all transactions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center">
                    <Lock className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-secondary dark:text-foundation-light font-jakarta">Biometric authentication for enhanced security</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-secondary dark:text-foundation-light font-jakarta">Offline mode for viewing transaction history</span>
                </div>
              </div>

              <AppStoreBadges showTitle={false} />
            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl mode-transition">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-secondary dark:text-foundation-light font-jakarta mb-2">
                    Scan to Get Notified
                  </h3>
                  <p className="text-secondary/70 dark:text-foundation-light/70 text-sm font-jakarta">
                    Be the first to download when we launch
                  </p>
                </div>

                <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-supporting/20 dark:from-primary/10 dark:to-supporting/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <QrCode className="w-24 h-24 text-primary dark:text-primary" />
                </div>

                <div className="text-center">
                  <p className="text-xs text-secondary/60 dark:text-foundation-light/60 font-jakarta">
                    Scan with your camera app
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist-section" className="section-spacing px-4 bg-slate-50 dark:bg-slate-800/50 mode-transition">
        <div className="max-w-xl mx-auto">
          <motion.div
            className="bg-white dark:bg-slate-700/50 p-5 sm:p-6 md:p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-slate-200 dark:border-slate-600 mode-transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-center mb-2 text-secondary dark:text-foundation-light font-jakarta">Join Our Waitlist</h2>
            <p className="text-secondary/70 dark:text-foundation-light/70 text-center mb-8 font-jakarta">Be among the first to experience the future of remittances</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary dark:text-foundation-light font-jakarta">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-secondary dark:text-foundation-light transition-all duration-300 ease-in-out font-jakarta placeholder:text-slate-400"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary dark:text-foundation-light font-jakarta">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-secondary dark:text-foundation-light transition-all duration-300 ease-in-out font-jakarta placeholder:text-slate-400"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary dark:text-foundation-light font-jakarta">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-secondary dark:text-foundation-light transition-all duration-300 ease-in-out font-jakarta placeholder:text-slate-400"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary dark:text-foundation-light font-jakarta">Country of Residence</label>
                <div className="relative">
                  <div
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl flex justify-between items-center cursor-pointer text-secondary dark:text-foundation-light transition-all duration-300 ease-in-out font-jakarta hover:border-primary"
                    onClick={() => setCountrySearchOpen(!countrySearchOpen)}
                  >
                    {selectedCountry ? (
                      <div className="flex items-center">
                        <span className="mr-2 text-xl">{selectedCountry.flag}</span>
                        <span className="font-jakarta">{selectedCountry.name}</span>
                      </div>
                    ) : (
                      <span className="text-slate-500 dark:text-slate-400 font-jakarta">Select your country</span>
                    )}
                    <ArrowRight className={`h-4 w-4 transition-transform duration-300 ease-in-out ${countrySearchOpen ? 'rotate-90' : ''}`} />
                  </div>

                  {countrySearchOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white dark:bg-slate-700 rounded-lg shadow-lg border border-slate-200 dark:border-slate-600 overflow-hidden mode-transition">
                      <div className="p-2 border-b border-slate-200 dark:border-slate-600">
                        <input
                          type="text"
                          placeholder="Search countries..."
                          className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary text-secondary dark:text-foundation-light font-jakarta"
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {filteredCountries.map((country) => (
                          <div
                            key={country.code}
                            className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer flex items-center transition-colors duration-300 ease-in-out"
                            onClick={() => handleCountrySelect(country)}
                          >
                            <span className="mr-2 text-xl">{country.flag}</span>
                            <span className="text-secondary dark:text-foundation-light font-jakarta">{country.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary dark:text-foundation-light font-jakarta">Phone Number <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input
                  type="tel"
                  placeholder={getPhonePlaceholder()}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-secondary dark:text-foundation-light transition-all duration-300 ease-in-out font-jakarta placeholder:text-slate-400"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary dark:text-foundation-light font-jakarta">Where will you send money to?</label>
                <select
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-secondary dark:text-foundation-light transition-all duration-300 ease-in-out font-jakarta appearance-none cursor-pointer"
                  value={formData.sendToCountry}
                  onChange={(e) => setFormData({ ...formData, sendToCountry: e.target.value })}
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                >
                  <option value="">Select destination country</option>
                  <option value="NG">🇳🇬 Nigeria</option>
                  <option value="GH">🇬🇭 Ghana</option>
                  <option value="KE">🇰🇪 Kenya</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Error Message - inline */}
              {submitStatus?.type === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 font-jakarta text-sm flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {submitStatus.message}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-secondary font-semibold py-4 rounded-lg transition-all duration-300 ease-in-out font-jakarta disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={isSubmitting ? {} : { y: -2, boxShadow: "0px 8px 24px rgba(227, 178, 60, 0.3)" }}
                whileTap={isSubmitting ? {} : { scale: 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Joining...
                  </>
                ) : (
                  'Join Waitlist'
                )}
              </motion.button>
            </form>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-4 font-jakarta">
              We'll notify you once we launch. No spam, ever. By joining, you agree to our{' '}
              <Link to="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Success Modal Popup */}
      <AnimatePresence>
        {submitStatus?.type === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSubmitStatus(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSubmitStatus(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              {/* Success Icon with animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 15, stiffness: 300 }}
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
              </motion.div>

              {/* Success Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold text-secondary dark:text-foundation-light font-jakarta mb-2">
                  You're on the list! 🎉
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-jakarta mb-6">
                  We'll notify you as soon as MoneyHive launches. Get ready to send money to your loved ones faster than ever!
                </p>

                {/* Decorative elements */}
                <div className="flex justify-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSubmitStatus(null)}
                  className="w-full bg-primary hover:bg-primary/90 text-secondary font-semibold py-3 px-6 rounded-xl transition-all duration-300 font-jakarta"
                >
                  Got it!
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .animate-on-scroll {
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          transform: translateY(20px);
        }
        
        .animate-on-scroll.animate-in {
          opacity: 1 !important;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}