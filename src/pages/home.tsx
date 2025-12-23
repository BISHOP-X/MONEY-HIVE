import React, { useState, useEffect } from 'react';
import { Send, CreditCard, Shield, ArrowRight, Globe2, Banknote, Lock, Smartphone, Download, QrCode, Loader2 } from 'lucide-react';
import { Footer } from "@/components/Footer";
import { Globe } from "@/components/Globe";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { LetterFromHome } from "@/components/LetterFromHome";
import { AppStoreBadges } from "@/components/AppStoreBadges";
import { AIFeatures } from "@/components/AIFeatures";
import { SocialProof } from "@/components/SocialProof";
import { addToWaitlist } from "@/lib/supabase";

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countrySearchOpen, setCountrySearchOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    devicePreference: 'both'
  });

  const countries = [
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

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
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setFormData({ ...formData, country: country.name });
    setCountrySearchOpen(false);
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
        country: formData.country || 'Unknown',
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
        country: '',
        devicePreference: 'both'
      });
      setSelectedCountry(null);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.'
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

        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-[3.2rem] lg:text-[3.8rem] font-bold mb-6 text-secondary dark:text-foundation-light font-jakarta leading-tight">
                Bridging Hearts Across Continents
              </h1>
              <p className="text-xl md:text-2xl text-primary dark:text-primary mb-8 max-w-2xl mx-auto lg:mx-0 font-jakarta">
                Your money travels fast—your love travels faster
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  onClick={scrollToWaitlist}
                  className="btn btn-primary group animate-button-pulse"
                  whileHover={{ y: -2, boxShadow: "0px 8px 32px rgba(227, 178, 60, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  Join Waitlist
                  <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
                </motion.button>
                <motion.button
                  className="btn btn-outline"
                  whileHover={{ y: -2, boxShadow: "0px 4px 16px rgba(45, 49, 66, 0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  How It Works
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="hidden lg:block relative h-[500px]"
            >
              <Globe width={600} height={600} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-spacing px-4 bg-slate-50 dark:bg-slate-800/50 mode-transition">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-secondary dark:text-foundation-light font-jakarta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            AI-Powered, Fast, Secure and Built with you in mind
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light font-jakarta">Fast global transfers</h3>
              <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta">Send money to over 100 countries instantly with real-time tracking and competitive rates.</p>
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
              <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light font-jakarta">Instant localised bill payments</h3>
              <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta">Pay utilities, school fees, and more directly to local providers in your home country.</p>
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
              <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light font-jakarta">Low Rates and no hidden fees</h3>
              <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta">Enjoy transparent pricing with no hidden charges. Save up to 8x compared to traditional banks.</p>
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
              <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light font-jakarta">Security Promise</h3>
              <div className="space-y-3">
                <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta">End-to-end encryption + biometric authentication for ultimate security.</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium font-jakarta">
                  <Shield className="w-4 h-4 mr-2" />
                  Bank-Grade Security
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <AIFeatures />

      {/* Social Proof Section */}
      <SocialProof />

      {/* How it Works */}
      <section className="section-spacing px-4 bg-white dark:bg-foundation-dark mode-transition">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-secondary dark:text-foundation-light font-jakarta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
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
              <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light font-jakarta">Choose bills to pay</h3>
              <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta">Select from a wide range of bill payment options including utilities, education, and more.</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary dark:text-foundation-light font-jakarta">
                MoneyHive Mobile App
                <span className="block text-primary dark:text-primary mt-2">Coming Soon</span>
              </h2>
              <p className="text-lg text-secondary/80 dark:text-foundation-light/80 mb-8 font-jakarta">
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
            className="bg-white dark:bg-slate-700/50 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-slate-200 dark:border-slate-600 mode-transition"
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
                    placeholder="John"
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary text-secondary dark:text-foundation-light transition-all duration-300 ease-in-out font-jakarta"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary dark:text-foundation-light font-jakarta">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary text-secondary dark:text-foundation-light transition-all duration-300 ease-in-out font-jakarta"
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
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary text-secondary dark:text-foundation-light transition-all duration-300 ease-in-out font-jakarta"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary dark:text-foundation-light font-jakarta">Country of Residence</label>
                <div className="relative">
                  <div
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-600/50 rounded-lg flex justify-between items-center cursor-pointer text-secondary dark:text-foundation-light transition-all duration-300 ease-in-out font-jakarta"
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
                <label className="block text-sm font-medium mb-2 text-secondary dark:text-foundation-light font-jakarta">Device Preference</label>
                <select
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary text-secondary dark:text-foundation-light transition-all duration-300 ease-in-out font-jakarta"
                  value={formData.devicePreference}
                  onChange={(e) => setFormData({ ...formData, devicePreference: e.target.value })}
                >
                  <option value="both">Both iOS and Android</option>
                  <option value="ios">iOS (iPhone/iPad)</option>
                  <option value="android">Android</option>
                </select>
              </div>

              {/* Status Message */}
              {submitStatus && (
                <div className={`p-4 rounded-lg ${submitStatus.type === 'success'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  } font-jakarta text-sm`}>
                  {submitStatus.message}
                </div>
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
              We'll notify you once we launch. No spam, ever.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
      <LetterFromHome position="right" />

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