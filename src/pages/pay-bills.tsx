import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, CreditCard, Smartphone, GraduationCap, Home, Car } from "lucide-react";

export default function PayBillsPage() {
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
                Pay Bills Instantly
              </h1>
              <p className="text-xl text-secondary/80 dark:text-foundation-light/80 mb-8 max-w-3xl mx-auto">
                Pay utilities, school fees, mobile top-ups, and more directly to local providers in your home country. No more asking family to handle payments for you.
              </p>
              <Button 
                onClick={scrollToWaitlist}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-8 py-4 text-lg hover:shadow-button-hover transition-all duration-300"
              >
                Start Paying Bills
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Bill Types Section */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-secondary dark:text-foundation-light">
                Bills You Can Pay
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-700/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-secondary dark:text-foundation-light">Utilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-secondary/80 dark:text-foundation-light/80 space-y-2">
                      <li>• Electricity bills</li>
                      <li>• Water bills</li>
                      <li>• Gas bills</li>
                      <li>• Internet & Cable TV</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-700/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-supporting/20 dark:bg-supporting/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="h-8 w-8 text-supporting" />
                    </div>
                    <CardTitle className="text-xl text-secondary dark:text-foundation-light">Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-secondary/80 dark:text-foundation-light/80 space-y-2">
                      <li>• School fees</li>
                      <li>• University tuition</li>
                      <li>• Exam fees</li>
                      <li>• Educational materials</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-700/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-secondary dark:text-foundation-light">Mobile & Telecom</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-secondary/80 dark:text-foundation-light/80 space-y-2">
                      <li>• Mobile top-ups</li>
                      <li>• Phone bills</li>
                      <li>• Data bundles</li>
                      <li>• Airtime purchases</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-700/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-supporting/20 dark:bg-supporting/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Home className="h-8 w-8 text-supporting" />
                    </div>
                    <CardTitle className="text-xl text-secondary dark:text-foundation-light">Housing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-secondary/80 dark:text-foundation-light/80 space-y-2">
                      <li>• Rent payments</li>
                      <li>• Property taxes</li>
                      <li>• Maintenance fees</li>
                      <li>• Security services</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-700/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-secondary dark:text-foundation-light">Financial Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-secondary/80 dark:text-foundation-light/80 space-y-2">
                      <li>• Loan payments</li>
                      <li>• Insurance premiums</li>
                      <li>• Credit card bills</li>
                      <li>• Investment contributions</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-700/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-supporting/20 dark:bg-supporting/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Car className="h-8 w-8 text-supporting" />
                    </div>
                    <CardTitle className="text-xl text-secondary dark:text-foundation-light">Transportation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-secondary/80 dark:text-foundation-light/80 space-y-2">
                      <li>• Vehicle registration</li>
                      <li>• Fuel cards</li>
                      <li>• Parking fees</li>
                      <li>• Public transport</li>
                    </ul>
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
                How Bill Payment Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light">Select Bill Type</h3>
                  <p className="text-secondary/80 dark:text-foundation-light/80">
                    Choose from utilities, education, mobile top-ups, and more.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-supporting/20 dark:bg-supporting/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-supporting">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light">Enter Details</h3>
                  <p className="text-secondary/80 dark:text-foundation-light/80">
                    Provide the account number, amount, and payment details.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light">Pay Securely</h3>
                  <p className="text-secondary/80 dark:text-foundation-light/80">
                    Complete payment using your preferred payment method.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-supporting/20 dark:bg-supporting/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-supporting">4</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light">Bill Paid</h3>
                  <p className="text-secondary/80 dark:text-foundation-light/80">
                    Bill is paid instantly and confirmation is sent to you and your family.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white dark:bg-foundation-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-secondary dark:text-foundation-light">
                Why Use MoneyHive for Bill Payments?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light">Instant Payment</h3>
                  <p className="text-secondary/80 dark:text-foundation-light/80">
                    Bills are paid instantly, no more waiting for family to handle payments.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-supporting/20 dark:bg-supporting/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CreditCard className="h-8 w-8 text-supporting" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light">Direct Payment</h3>
                  <p className="text-secondary/80 dark:text-foundation-light/80">
                    Pay directly to service providers, eliminating the middleman.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Smartphone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light">Real-time Updates</h3>
                  <p className="text-secondary/80 dark:text-foundation-light/80">
                    Get instant confirmation and receipts for all payments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Never Miss a Bill Payment Again
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Take control of your family's bills from anywhere in the world. Fast, secure, and reliable.
              </p>
              <Button 
                onClick={scrollToWaitlist}
                size="lg" 
                className="bg-white hover:bg-gray-100 text-secondary font-semibold px-8 py-4 text-lg hover:shadow-lg transition-all duration-300"
              >
                Start Paying Bills
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