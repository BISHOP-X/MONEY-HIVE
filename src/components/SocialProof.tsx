import React from 'react';
import { motion } from 'framer-motion';
import { Globe, TrendingUp, Clock, Shield, Heart, Users } from 'lucide-react';

export function SocialProof() {
  const stats = [
    {
      icon: Globe,
      value: "UK to Nigeria",
      label: "Launch Corridor",
      description: "Our first supported transfer route, with more coming soon"
    },
    {
      icon: Clock,
      value: "Under 60 seconds",
      label: "Target Transfer Speed",
      description: "Our goal for average transfer completion time"
    },
    {
      icon: TrendingUp,
      value: "Up to 8x",
      label: "Potential Savings",
      description: "Compared to traditional bank transfer fees"
    },
    {
      icon: Heart,
      value: "Diaspora First",
      label: "Built For You",
      description: "Designed by diaspora, for diaspora families"
    }
  ];

  return (
    <section className="section-spacing px-4 bg-gradient-to-br from-primary/5 to-supporting/5 dark:from-primary/10 dark:to-supporting/10 mode-transition">
      <div className="max-w-7xl mx-auto">
        {/* Stats Section */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-secondary dark:text-foundation-light font-jakarta">
            Why Choose MoneyHive?
          </h2>
          <p className="text-lg md:text-xl text-secondary/80 dark:text-foundation-light/80 max-w-3xl mx-auto font-jakarta px-4">
            We're building the remittance service we wished existed when sending money home
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 md:p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <div className="text-lg md:text-2xl lg:text-3xl font-bold text-secondary dark:text-foundation-light font-jakarta mb-1 md:mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-lg font-semibold text-secondary dark:text-foundation-light font-jakarta mb-1">
                {stat.label}
              </div>
              <div className="text-xs md:text-sm text-secondary/70 dark:text-foundation-light/70 font-jakarta hidden md:block">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Promise Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500/20 dark:bg-green-500/10 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-secondary dark:text-foundation-light font-jakarta mb-3 md:mb-4">
              Our Security Commitment
            </h3>
            <p className="text-sm md:text-base text-secondary/80 dark:text-foundation-light/80 font-jakarta mb-4 md:mb-6 px-4">
              Your money and data will be protected by bank grade security measures, including end to end encryption, biometric authentication, and round the clock fraud monitoring.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-6">
              <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full">
                <span className="text-xs md:text-sm font-medium text-green-700 dark:text-green-300 font-jakarta">Bank Grade Encryption</span>
              </div>
              <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full">
                <span className="text-xs md:text-sm font-medium text-green-700 dark:text-green-300 font-jakarta">Biometric Auth</span>
              </div>
              <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full">
                <span className="text-xs md:text-sm font-medium text-green-700 dark:text-green-300 font-jakarta">24/7 Monitoring</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}