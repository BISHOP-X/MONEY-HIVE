import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Shield, Zap, BarChart3, Clock, Target, Users } from 'lucide-react';

export function AIFeatures() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Rate Predictor",
      description: "ML-driven exchange rate forecast tool using LSTM models trained on 10-year forex data",
      example: "Best time to send Naira next week: Thursday AM",
      color: "from-blue-500 to-purple-600",
      metrics: {
        accuracy: "94.7%",
        timeframe: "30-day forecast",
        savings: "Up to 5%"
      }
    },
    {
      icon: Target,
      title: "Smart Timing System",
      description: "AI analyzes market patterns to suggest 3 daily optimal transfer windows with potential savings calculator",
      example: "Save 3.2% by sending tomorrow at 2 PM GMT",
      color: "from-green-500 to-emerald-600",
      metrics: {
        windows: "3 daily",
        savings: "1-5%",
        success: "98.2%"
      }
    },
    {
      icon: Shield,
      title: "Advanced Security Features",
      description: "99.9% verification threshold with 0.5-second maximum verification time and real-time fraud detection",
      example: "Transaction verified in 0.3 seconds",
      color: "from-red-500 to-pink-600",
      metrics: {
        threshold: "99.9%",
        speed: "0.5s max",
        detection: "Real-time"
      }
    },
    {
      icon: BarChart3,
      title: "Personal Analytics Dashboard",
      description: "3-month minimum data analysis with weekly insight updates and peer comparison metrics",
      example: "You typically save 15% sending on weekdays",
      color: "from-yellow-500 to-orange-600",
      metrics: {
        analysis: "3+ months",
        updates: "Weekly",
        insights: "Top 3 opportunities"
      }
    }
  ];

  return (
    <section className="section-spacing px-4 bg-white dark:bg-foundation-dark mode-transition">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary dark:text-foundation-light font-jakarta">
            AI-Powered Features
          </h2>
          <p className="text-xl text-secondary/80 dark:text-foundation-light/80 max-w-3xl mx-auto font-jakarta">
            Experience the future of remittances with our cutting-edge AI technology that learns, predicts, and protects your money transfers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl consistent-hover shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeInOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 text-secondary dark:text-foundation-light font-jakarta">
                    {feature.title}
                  </h3>
                  <p className="text-secondary/70 dark:text-foundation-light/70 mb-4 font-jakarta">
                    {feature.description}
                  </p>
                </div>
              </div>
              
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {Object.entries(feature.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-lg font-bold text-primary dark:text-primary font-jakarta">
                      {value}
                    </div>
                    <div className="text-xs text-secondary/60 dark:text-foundation-light/60 font-jakarta capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white dark:bg-slate-700 p-3 rounded-lg border-l-4 border-primary">
                <p className="text-sm text-primary dark:text-primary font-medium font-jakarta italic">
                  "{feature.example}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Stats Section */}
        <motion.div
          className="bg-gradient-to-br from-primary/5 to-supporting/5 dark:from-primary/10 dark:to-supporting/10 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-secondary dark:text-foundation-light font-jakarta mb-4">
              AI Performance Metrics
            </h3>
            <p className="text-secondary/70 dark:text-foundation-light/70 font-jakarta">
              Real-time performance data from our AI systems
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-secondary dark:text-foundation-light font-jakarta">15min</div>
              <div className="text-sm text-secondary/70 dark:text-foundation-light/70 font-jakarta">Model Updates</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-secondary dark:text-foundation-light font-jakarta">10TB</div>
              <div className="text-sm text-secondary/70 dark:text-foundation-light/70 font-jakarta">Training Data</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-secondary dark:text-foundation-light font-jakarta">94.7%</div>
              <div className="text-sm text-secondary/70 dark:text-foundation-light/70 font-jakarta">Prediction Accuracy</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-secondary dark:text-foundation-light font-jakarta">50K+</div>
              <div className="text-sm text-secondary/70 dark:text-foundation-light/70 font-jakarta">Users Benefiting</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}