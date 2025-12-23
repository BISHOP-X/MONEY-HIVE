import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Globe, TrendingUp, Clock, Shield } from 'lucide-react';

export function SocialProof() {
  const stats = [
    {
      icon: Users,
      value: "1,000+",
      label: "Verified Members",
      description: "Join our growing community of verified members"
    },
    {
      icon: Globe,
      value: "Key African Corridors",
      label: "Market Coverage",
      description: "Available in key African corridors, expanding globally"
    },
    {
      icon: Clock,
      value: "<60 seconds",
      label: "Transfer Speed",
      description: "Average transfer completion: less than 60 seconds"
    },
    {
      icon: TrendingUp,
      value: "8x",
      label: "Lower Fees",
      description: "Compared to traditional banks"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      location: "London, UK → Lagos, Nigeria",
      quote: "Finally, a remittance service built for people like us. The AI features are game-changing.",
      avatar: "👩🏻‍💼"
    },
    {
      name: "Michael Osei",
      location: "Toronto, CA → Accra, Ghana",
      quote: "The rate predictor saved me hundreds last month. Can't wait for the full launch!",
      avatar: "👨🏿‍💻"
    },
    {
      name: "Priya Patel",
      location: "Sydney, AU → Mumbai, India",
      quote: "Transparent pricing and instant transfers. This is the future of sending money home.",
      avatar: "👩🏽‍🔬"
    }
  ];

  return (
    <section className="section-spacing px-4 bg-gradient-to-br from-primary/5 to-supporting/5 dark:from-primary/10 dark:to-supporting/10 mode-transition">
      <div className="max-w-7xl mx-auto">
        {/* Stats Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary dark:text-foundation-light font-jakarta">
            Trusted by the Diaspora Community
          </h2>
          <p className="text-xl text-secondary/80 dark:text-foundation-light/80 max-w-3xl mx-auto font-jakarta">
            Join thousands who are already excited about the future of remittances
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-secondary dark:text-foundation-light font-jakarta mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-secondary dark:text-foundation-light font-jakarta mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-secondary/70 dark:text-foundation-light/70 font-jakarta">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-secondary dark:text-foundation-light font-jakarta mb-2">
            What Beta Users Are Saying
          </h3>
          <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta">
            Real feedback from our early access community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeInOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -4, boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-supporting/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-secondary dark:text-foundation-light font-jakarta">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-secondary/60 dark:text-foundation-light/60 font-jakarta">
                    {testimonial.location}
                  </div>
                </div>
              </div>
              <p className="text-secondary/80 dark:text-foundation-light/80 italic font-jakarta">
                "{testimonial.quote}"
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Promise Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-green-500/20 dark:bg-green-500/10 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-secondary dark:text-foundation-light font-jakarta mb-4">
              Our Security Promise
            </h3>
            <p className="text-secondary/80 dark:text-foundation-light/80 font-jakarta mb-6">
              Your money and data are protected by bank-grade security measures, including end-to-end encryption and biometric authentication.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 font-jakarta">99.9%</div>
                <div className="text-sm text-secondary/70 dark:text-foundation-light/70 font-jakarta">Verification Threshold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 font-jakarta">0.5s</div>
                <div className="text-sm text-secondary/70 dark:text-foundation-light/70 font-jakarta">Maximum Verification Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 font-jakarta">24/7</div>
                <div className="text-sm text-secondary/70 dark:text-foundation-light/70 font-jakarta">Fraud Detection</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}