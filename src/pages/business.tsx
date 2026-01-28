import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function BusinessPage() {
  const scrollToWaitlist = () => {
    window.location.href = '/#waitlist-section';
  };

  return (
    <main className="flex min-h-screen flex-col bg-foundation-light dark:bg-foundation-dark">
      <Header />
      <div className="pb-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white dark:from-slate-900 dark:via-foundation-dark dark:to-foundation-dark pt-28 pb-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
                  <span className="mr-2">🚀</span> Coming Soon
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-secondary dark:text-foundation-light">
                  Business Solutions for
                  <span className="text-primary block">Global Payments</span>
                </h1>
                <p className="text-lg text-secondary/80 dark:text-foundation-light/80">
                  We're building powerful business payment solutions to help you pay employees, contractors, and suppliers across borders. Be the first to know when we launch.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                  <Button 
                    onClick={scrollToWaitlist}
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-8 py-4 text-lg hover:shadow-button-hover transition-all duration-300"
                  >
                    Join the Waitlist
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-4 text-lg transition-all duration-300">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="lg:h-[450px] bg-gradient-to-br from-primary/10 to-supporting/10 rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <span className="text-6xl mb-4 block">🏢</span>
                  <p className="text-secondary/70 dark:text-foundation-light/70 text-lg font-medium">Business Solutions</p>
                  <p className="text-primary font-semibold">Coming Q3 2026</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-secondary dark:text-foundation-light">What We're Building for Businesses</h2>
              <p className="text-lg text-secondary/80 dark:text-foundation-light/80 max-w-2xl mx-auto">
                Powerful tools designed to simplify your international payment operations.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Global Payroll",
                  description: "Pay your remote employees and contractors in their local currency, with transparent fees and competitive exchange rates.",
                  icon: (
                    <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                },
                {
                  title: "Supplier Payments",
                  description: "Easily pay your international suppliers in their local currency with detailed tracking and reconciliation.",
                  icon: (
                    <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                },
                {
                  title: "Mass Payments",
                  description: "Send multiple payments at once with batch processing, saving time and reducing administrative overhead.",
                  icon: (
                    <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ),
                },
              ].map((feature, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-700/50">
                  <CardContent className="flex flex-col p-6">
                    <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-secondary dark:text-foundation-light">{feature.title}</h3>
                    <p className="text-secondary/80 dark:text-foundation-light/80">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-secondary dark:text-foundation-light">Why Businesses Will Choose MoneyHive</h2>
              <p className="text-lg text-secondary/80 dark:text-foundation-light/80 max-w-2xl mx-auto">
                We're building the features that matter most to growing businesses.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Up to 70% Cost Savings",
                  description: "Save significantly on international transfer fees compared to traditional banks.",
                },
                {
                  title: "Real-time Tracking",
                  description: "Track your payments in real-time from initiation to receipt.",
                },
                {
                  title: "Dedicated Support",
                  description: "Get personalized support from our business solutions team.",
                },
                {
                  title: "API Integration",
                  description: "Integrate with your existing systems through our robust API.",
                },
                {
                  title: "Secure Transactions",
                  description: "Bank-level encryption and security for all your transactions.",
                },
                {
                  title: "Regulatory Compliance",
                  description: "We handle compliance with international regulations so you don't have to.",
                },
                {
                  title: "Multi-currency Accounts",
                  description: "Hold balances in multiple currencies to optimize conversion costs.",
                },
                {
                  title: "Custom Reporting",
                  description: "Generate custom reports for accounting and reconciliation.",
                },
              ].map((benefit, index) => (
                <div key={index} className="bg-white dark:bg-slate-700/50 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2 text-primary">{benefit.title}</h3>
                  <p className="text-secondary/80 dark:text-foundation-light/80">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="py-20 bg-white dark:bg-foundation-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 text-secondary dark:text-foundation-light">Our Business Roadmap</h2>
                <p className="text-lg text-secondary/80 dark:text-foundation-light/80">
                  Here's what we're working on to serve businesses better.
                </p>
              </div>
              <div className="space-y-8">
                {[
                  {
                    phase: "Phase 1 (Now)",
                    title: "Consumer Remittance Launch",
                    description: "Establishing our UK to Nigeria corridor with fast, affordable transfers for individuals.",
                    status: "In Progress",
                  },
                  {
                    phase: "Phase 2 (2026)",
                    title: "Business Payment Solutions",
                    description: "Launching bulk payments, supplier payments, and dedicated business accounts.",
                    status: "Planned",
                  },
                  {
                    phase: "Phase 3 (2027+)",
                    title: "API & Enterprise Features",
                    description: "Full API access, custom integrations, and enterprise-grade features for larger organizations.",
                    status: "Future",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        item.status === 'In Progress' ? 'bg-primary' : 
                        item.status === 'Planned' ? 'bg-supporting' : 'bg-slate-400'
                      }`}>
                        {index + 1}
                      </div>
                      {index < 2 && <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 mt-2"></div>}
                    </div>
                    <div className="flex-1 pb-8">
                      <span className="text-sm font-medium text-primary">{item.phase}</span>
                      <h3 className="text-xl font-semibold text-secondary dark:text-foundation-light mt-1">{item.title}</h3>
                      <p className="text-secondary/80 dark:text-foundation-light/80 mt-2">{item.description}</p>
                      <span className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === 'In Progress' ? 'bg-primary/10 text-primary' : 
                        item.status === 'Planned' ? 'bg-supporting/10 text-supporting' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Be the First to Access Business Solutions</h2>
              <p className="text-xl text-white/90 mb-8">
                Join our waitlist and we'll notify you as soon as business features are available.
              </p>
              <Button 
                onClick={scrollToWaitlist}
                size="lg" 
                className="bg-white hover:bg-gray-100 text-secondary font-semibold px-8 py-4 text-lg hover:shadow-lg transition-all duration-300"
              >
                Join the Waitlist
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}