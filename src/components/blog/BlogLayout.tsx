import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AppStoreBadges } from "@/components/AppStoreBadges";
import { motion } from "framer-motion";

export function BlogLayout({ children }) {
  return (
    <main className="flex min-h-screen flex-col bg-foundation-light dark:bg-foundation-dark mode-transition">
      <Header />
      <div className="flex-grow pt-20">
        {children}
      </div>
      
      {/* App Store Section for Blog */}
      <motion.section 
        className="py-16 bg-gradient-to-br from-primary/5 to-supporting/5 dark:from-primary/10 dark:to-supporting/10 mode-transition"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 text-secondary dark:text-foundation-light font-jakarta">
            Ready to Transform Your Remittances?
          </h3>
          <p className="text-secondary/80 dark:text-foundation-light/80 mb-8 font-jakarta">
            Join thousands on our waitlist and be the first to experience the future of money transfers.
          </p>
          <AppStoreBadges />
        </div>
      </motion.section>
      
      <Footer />
    </main>
  );
}