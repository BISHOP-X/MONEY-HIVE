import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AboutPage() {
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
              <div className="flex justify-center mb-6">
                <span className="text-4xl">🐝</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">Our Mission</h1>
              <p className="text-xl text-secondary dark:text-foundation-light mb-8 max-w-3xl mx-auto">
                To empower diaspora communities by providing affordable, fast, and secure financial solutions that help them care for loved ones back home—seamlessly and with confidence.
              </p>
              <div className="flex justify-center mb-8">
                <div className="relative w-20 h-1 bg-gradient-to-r from-primary to-primary"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Where We Are Today Section */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-6 text-secondary dark:text-foundation-light">Where We Are Today</h2>
                <p className="text-xl text-secondary/80 dark:text-foundation-light/80 max-w-3xl mx-auto">
                  We're just getting started, but our ambition is clear:
                  To become the most trusted bridge between global diasporas and their home countries, starting with enabling bill payments, wallet funding, and remittances in a way that's effortless, transparent, and community-driven.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-secondary dark:text-foundation-light">Our Story</h2>
                  <p className="text-secondary/80 dark:text-foundation-light/80 mb-4">
                    MoneyHive was born in 2025 out of a real need:
                    As Africans living and working abroad, our founding team experienced the frustrations of sending money home—the high fees, the delays, the uncertainty, and the disconnect.
                  </p>
                  <p className="text-secondary/80 dark:text-foundation-light/80 mb-4">
                    We knew there had to be a better way.
                  </p>
                  <p className="text-secondary/80 dark:text-foundation-light/80 mb-4">
                    Instead of waiting for traditional banks or legacy remittance companies to catch up, we built the future ourselves—using modern tech, AI tools, and customer-centric design. MoneyHive is a product of lived experience, global thinking, and relentless innovation.
                  </p>
                  <p className="text-secondary/80 dark:text-foundation-light/80">
                    We're not just building a fintech company.
                    We're building a movement and community that puts Family first.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-supporting/20 rounded-full blur-3xl transform -translate-x-4 translate-y-4"></div>
                  <div className="relative z-10 w-full h-80 bg-gradient-to-br from-primary/10 to-supporting/10 dark:from-primary/5 dark:to-supporting/5 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hive Values Section */}
        <section className="py-16 bg-white dark:bg-foundation-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-secondary dark:text-foundation-light">Our Hive Values: The Soul of MoneyHive</h2>
              <p className="text-secondary/80 dark:text-foundation-light/80">
                At MoneyHive, our foundation is built upon four guiding principles—Heart, Home, Hustle, and Hope—which encapsulate our mission to empower diaspora communities with accessible, secure, and affordable financial solutions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <span className="text-4xl">❤️</span>
                  <h3 className="text-xl font-bold mt-2 text-secondary dark:text-foundation-light">Heart: Empowering Connections</h3>
                </div>
                <p className="text-secondary/80 dark:text-foundation-light/80">
                  Heart represents the emotional drive behind every transaction. It's about the love and commitment diaspora individuals show when supporting their families.
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <span className="text-4xl">🏠</span>
                  <h3 className="text-xl font-bold mt-2 text-secondary dark:text-foundation-light">Home: Bridging Distances</h3>
                </div>
                <p className="text-secondary/80 dark:text-foundation-light/80">
                  Home signifies the emotional anchor that inspires our platform. We aim to keep families connected and cultures alive.
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <span className="text-4xl">⚡</span>
                  <h3 className="text-xl font-bold mt-2 text-secondary dark:text-foundation-light">Hustle: Driving Innovation</h3>
                </div>
                <p className="text-secondary/80 dark:text-foundation-light/80">
                  Hustle embodies our relentless pursuit of excellence and innovation. We strive to deliver services that meet the dynamic needs of our users.
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <span className="text-4xl">🌱</span>
                  <h3 className="text-xl font-bold mt-2 text-secondary dark:text-foundation-light">Hope: Building a Better Future</h3>
                </div>
                <p className="text-secondary/80 dark:text-foundation-light/80">
                  Hope is our promise of a brighter financial future. We aim to provide services that not only meet immediate needs but also contribute to long-term prosperity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-secondary dark:text-foundation-light">Our Core Values in Action</h2>
              <p className="text-secondary/80 dark:text-foundation-light/80">
                Each of our Hive Values is underpinned by our core principles
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Transparency",
                  description: "We believe in clear communication and no hidden fees. What you see is what you get.",
                },
                {
                  title: "Accessibility",
                  description: "Financial services should be accessible to everyone, regardless of location or background.",
                },
                {
                  title: "Innovation",
                  description: "We continuously innovate to provide the best possible experience for our customers.",
                },
                {
                  title: "Security",
                  description: "We employ bank-level security measures to protect our customers' data and funds.",
                },
                {
                  title: "Community",
                  description: "We're committed to strengthening diaspora communities and their connections to home.",
                },
                {
                  title: "Affordability",
                  description: "We're committed to making financial services affordable for everyone.",
                },
              ].map((value, index) => (
                <div key={index} className="bg-white dark:bg-foundation-dark p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2 text-secondary dark:text-foundation-light">{value.title}</h3>
                  <p className="text-secondary/80 dark:text-foundation-light/80">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white dark:bg-foundation-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-secondary dark:text-foundation-light">Our Leadership Team</h2>
              <p className="text-secondary/80 dark:text-foundation-light/80">
                Meet the team building the hive 🐝
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { name: "Deji Jegede", title: "Co-Founder & Head of Product and Operations" },
                { name: "John Doherty", title: "Co-Founder & Head of Engineering" },
                { name: "Chibundu Obidegwu", title: "Co-Founder & Head of Legal, Compliance and Data Governance" },
                { name: "AI Tools", title: "Co-Founder & Chief Automation Officer" },
              ].map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-40 h-40 bg-gradient-to-br from-primary/20 to-supporting/20 dark:from-primary/10 dark:to-supporting/10 rounded-full mb-4 flex items-center justify-center">
                    <span className="text-4xl">{index === 3 ? '🤖' : '👤'}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-secondary dark:text-foundation-light">{member.name}</h3>
                  <p className="text-secondary/80 dark:text-foundation-light/80">{member.title}</p>
                  {index === 3 && (
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 italic">Yes, really. We believe in AI-first collaboration for better speed, design, and scale</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Join the Hive, Now</h2>
              <p className="text-white/90 text-lg mb-8">
                We're about to launch—and we want you on the inside.<br />
                Be the first to experience what modern remittance should feel like.
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