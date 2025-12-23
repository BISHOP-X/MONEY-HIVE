import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Globe, Shield, Clock, DollarSign } from "lucide-react";

export default function SendMoneyPage() {
  const scrollToWaitlist = () => {
    window.location.href = '/#waitlist-section';
  };

  return (
    <main className="flex min-h-screen flex-col bg-foundation-light dark:bg-foundation-dark">
      <Header />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-slate-50 via-white to-white dark:from-slate-800 dark:via-foundation-dark dark:to-foundation-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                Send Money Globally
              </h1>
              <p className="text-xl text-secondary/80 dark:text-foundation-light/80 mb-8 max-w-3xl mx-auto">
                Transfer money to over 100 countries with competitive rates, transparent fees, and instant delivery. Your family receives funds in minutes, not days.
              </p>
              <Button 
                onClick={scrollToWaitlist}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-8 py-4 text-lg hover:shadow-button-hover transition-all duration-300"
              >
                Start Sending Money
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-secondary dark:text-foundation-light">
                Why Choose MoneyHive for Money Transfers?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-700/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-secondary dark:text-foundation-light">Global Reach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-secondary/80 dark:text-foundation-light/80 text-center">
                      Send money to over 100 countries with extensive payout network coverage.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-700/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-supporting/20 dark:bg-supporting/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-supporting" />
                    </div>
                    <CardTitle className="text-xl text-secondary dark:text-foundation-light">Instant Transfers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-secondary/80 dark:text-foundation-light/80 text-center">
                      Most transfers arrive within minutes, not hours or days.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-700/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-secondary dark:text-foundation-light">Low Fees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-secondary/80 dark:text-foundation-light/80 text-center">
                      Save up to 8x compared to traditional banks with transparent pricing.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-700/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-supporting/20 dark:bg-supporting/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-supporting" />
                    </div>
                    <CardTitle className="text-xl text-secondary dark:text-foundation-light">Secure & Safe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-secondary/80 dark:text-foundation-light/80 text-center">
                      Bank-level security with 256-bit encryption and regulatory compliance.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-secondary dark:text-foundation-light">
                How to Send Money in 3 Simple Steps
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light">Enter Details</h3>
                  <p className="text-secondary/80 dark:text-foundation-light/80">
                    Enter the amount you want to send and your recipient's information.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-supporting/20 dark:bg-supporting/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-supporting">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light">Pay Securely</h3>
                  <p className="text-secondary/80 dark:text-foundation-light/80">
                    Pay with your bank account, debit card, or credit card securely.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light">Money Delivered</h3>
                  <p className="text-secondary/80 dark:text-foundation-light/80">
                    Your recipient receives the money instantly via bank transfer or cash pickup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Countries Section */}
        <section className="py-16 bg-white dark:bg-foundation-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-secondary dark:text-foundation-light">
                Send Money to These Countries
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "Nigeria", flag: "🇳🇬" },
                  { name: "Ghana", flag: "🇬🇭" },
                  { name: "Kenya", flag: "🇰🇪" },
                  { name: "South Africa", flag: "🇿🇦" },
                  { name: "India", flag: "🇮🇳" },
                  { name: "Philippines", flag: "🇵🇭" },
                  { name: "Mexico", flag: "🇲🇽" },
                  { name: "Brazil", flag: "🇧🇷" },
                  { name: "Bangladesh", flag: "🇧🇩" },
                  { name: "Pakistan", flag: "🇵🇰" },
                  { name: "Egypt", flag: "🇪🇬" },
                  { name: "Morocco", flag: "🇲🇦" },
                ].map((country, index) => (
                  <div key={index} className="text-center p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="text-4xl mb-2">{country.flag}</div>
                    <p className="text-sm font-medium text-secondary dark:text-foundation-light">{country.name}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <p className="text-secondary/80 dark:text-foundation-light/80">
                  And 90+ more countries worldwide
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Send Money?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands who trust MoneyHive for fast, secure, and affordable money transfers.
              </p>
              <Button 
                onClick={scrollToWaitlist}
                size="lg" 
                className="bg-white hover:bg-gray-100 text-secondary font-semibold px-8 py-4 text-lg hover:shadow-lg transition-all duration-300"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}