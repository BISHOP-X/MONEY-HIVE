import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function BusinessPage() {
  return (
    <main className="flex min-h-screen flex-col bg-foundation-light dark:bg-foundation-dark">
      <Header />
      <div className="pt-16 pb-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white dark:from-slate-800 dark:via-foundation-dark dark:to-foundation-dark py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-secondary dark:text-foundation-light">
                  Business Solutions for
                  <span className="text-primary block">Global Payments</span>
                </h1>
                <p className="text-lg text-secondary/80 dark:text-foundation-light/80">
                  Streamline your international payments with MoneyHive Business. Send money to employees, contractors, and suppliers in over 100 countries at competitive rates.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-8 py-4 text-lg hover:shadow-button-hover transition-all duration-300">
                    Contact Sales
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-4 text-lg transition-all duration-300">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="lg:h-[450px] bg-gradient-to-br from-primary/10 to-supporting/10 rounded-lg flex items-center justify-center">
                <span className="text-secondary/50 dark:text-foundation-light/50 text-lg">Business Image Placeholder</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-secondary dark:text-foundation-light">Tailored Services for Your Business</h2>
              <p className="text-lg text-secondary/80 dark:text-foundation-light/80 max-w-2xl mx-auto">
                From small businesses to large enterprises, we offer solutions that scale with your needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Global Payroll",
                  description: "Pay your remote employees and contractors in their local currency, with transparent fees and competitive exchange rates.",
                  icon: (
                    <svg className="h-10 w-10 text-primary\" fill="none\" stroke="currentColor\" viewBox="0 0 24 24\" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
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
                  description: "Send multiple payments at once with our batch processing feature, saving time and reducing administrative overhead.",
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
              <h2 className="text-3xl font-bold mb-4 text-secondary dark:text-foundation-light">Why Businesses Choose MoneyHive</h2>
              <p className="text-lg text-secondary/80 dark:text-foundation-light/80 max-w-2xl mx-auto">
                Join thousands of businesses that trust MoneyHive for their international payment needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Up to 90% Cost Savings",
                  description: "Save on international transfer fees compared to traditional banks.",
                },
                {
                  title: "Real-time Tracking",
                  description: "Track your payments in real-time from initiation to receipt.",
                },
                {
                  title: "Dedicated Account Manager",
                  description: "Get personalized support from a dedicated account manager.",
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
                  description: "Hold balances in multiple currencies to avoid conversion fees.",
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

        {/* API Section */}
        <section className="py-20 bg-white dark:bg-foundation-dark">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-secondary dark:bg-slate-800 p-6 rounded-lg text-foundation-light font-mono text-sm overflow-x-auto">
                  <pre>{`// Example API request
const response = await fetch('https://api.moneyhive.com/v1/transfers', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    source: { type: 'business_account', id: 'ba_123' },
    destination: { type: 'bank_account', id: 'ba_456' },
    amount: 1000,
    currency: 'USD',
    reference: 'Invoice #123'
  })
});

const data = await response.json();
console.log(data);`}</pre>
                </div>
              </div>
              <div className="order-1 lg:order-2 max-w-xl">
                <h2 className="text-3xl font-bold mb-6 text-secondary dark:text-foundation-light">Powerful API for Seamless Integration</h2>
                <p className="text-lg text-secondary/80 dark:text-foundation-light/80 mb-6">
                  Our RESTful API allows you to integrate international payments directly into your existing systems and workflows. Automate your payment processes and reduce manual intervention.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-secondary/80 dark:text-foundation-light/80">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Comprehensive documentation
                  </li>
                  <li className="flex items-center text-secondary/80 dark:text-foundation-light/80">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Sandbox environment for testing
                  </li>
                  <li className="flex items-center text-secondary/80 dark:text-foundation-light/80">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    SDKs for popular languages
                  </li>
                  <li className="flex items-center text-secondary/80 dark:text-foundation-light/80">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Webhook notifications
                  </li>
                </ul>
                <Button className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-6 py-3 hover:shadow-button-hover transition-all duration-300">
                  View API Documentation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-secondary dark:text-foundation-light">What Our Business Clients Say</h2>
              <p className="text-lg text-secondary/80 dark:text-foundation-light/80 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what businesses using our platform have to say.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "MoneyHive has revolutionized how we pay our remote team members across 12 countries. The process is now seamless and we've saved thousands in fees.",
                  author: "Sarah Chen",
                  title: "CFO, TechGrowth Inc.",
                },
                {
                  quote: "The API integration was straightforward and our developers had it up and running in days. Now our payment system is fully automated.",
                  author: "Mark Johnson",
                  title: "CTO, GlobalTrade Ltd.",
                },
                {
                  quote: "Our suppliers love getting paid in their local currency, and we love the competitive exchange rates. It's a win-win situation.",
                  author: "Elena Rodriguez",
                  title: "Operations Director, Nexus Supplies",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="border-none shadow-md bg-white dark:bg-slate-700/50">
                  <CardContent className="p-6">
                    <svg className="h-8 w-8 text-primary mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-secondary/80 dark:text-foundation-light/80 mb-6 italic">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-secondary dark:text-foundation-light">{testimonial.author}</p>
                      <p className="text-sm text-secondary/60 dark:text-foundation-light/60">{testimonial.title}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Simplify Your Global Payments?</h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of businesses that trust MoneyHive for their international payment needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-secondary font-semibold px-8 py-4 text-lg hover:shadow-lg transition-all duration-300">
                  Schedule a Demo
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg transition-all duration-300">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}