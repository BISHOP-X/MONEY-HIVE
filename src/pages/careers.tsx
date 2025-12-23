import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CareersPage() {
  const [showCVForm, setShowCVForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedIn: '',
    portfolio: '',
    coverLetter: '',
    cv: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cv: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your application! We will review your CV and get back to you soon.');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      linkedIn: '',
      portfolio: '',
      coverLetter: '',
      cv: null,
    });
    setShowCVForm(false);
  };

  return (
    <main className="flex min-h-screen flex-col bg-foundation-light dark:bg-foundation-dark">
      <Header />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-slate-50 via-white to-white dark:from-slate-800 dark:via-foundation-dark dark:to-foundation-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">Join Our Mission</h1>
              <p className="text-lg text-secondary/80 dark:text-foundation-light/80 mb-8">
                Help us transform how diaspora communities support their loved ones back home. We're looking for passionate individuals who want to make a difference.
              </p>
              <Button 
                onClick={() => setShowCVForm(true)}
                className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-8 py-4 text-lg hover:shadow-button-hover transition-all duration-300"
              >
                Send Your CV
              </Button>
            </div>
          </div>
        </section>

        {/* CV Form Modal */}
        {showCVForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-secondary dark:text-foundation-light">Submit Your CV</h2>
                  <button 
                    onClick={() => setShowCVForm(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ×
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary/80 dark:text-foundation-light/80 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-primary bg-white dark:bg-slate-700 text-secondary dark:text-foundation-light"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary/80 dark:text-foundation-light/80 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-primary bg-white dark:bg-slate-700 text-secondary dark:text-foundation-light"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary/80 dark:text-foundation-light/80 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-primary bg-white dark:bg-slate-700 text-secondary dark:text-foundation-light"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary/80 dark:text-foundation-light/80 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      value={formData.linkedIn}
                      onChange={(e) => setFormData({...formData, linkedIn: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-primary bg-white dark:bg-slate-700 text-secondary dark:text-foundation-light"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary/80 dark:text-foundation-light/80 mb-2">
                      Portfolio/Website
                    </label>
                    <input
                      type="url"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-primary bg-white dark:bg-slate-700 text-secondary dark:text-foundation-light"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary/80 dark:text-foundation-light/80 mb-2">
                      Cover Letter
                    </label>
                    <textarea
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-primary bg-white dark:bg-slate-700 text-secondary dark:text-foundation-light"
                      placeholder="Tell us why you'd be a great fit..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary/80 dark:text-foundation-light/80 mb-2">
                      Upload CV *
                    </label>
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-primary bg-white dark:bg-slate-700 text-secondary dark:text-foundation-light"
                    />
                    <p className="mt-1 text-sm text-secondary/60 dark:text-foundation-light/60">
                      Accepted formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowCVForm(false)}
                      className="border-primary/20 hover:border-primary hover:bg-primary/10 text-secondary dark:text-foundation-light"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-secondary"
                    >
                      Submit Application
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Values Section */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-secondary dark:text-foundation-light">Life at MoneyHive</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Innovation First",
                    description: "We encourage creative thinking and innovative solutions to complex problems.",
                  },
                  {
                    title: "Global Impact",
                    description: "Your work directly helps millions of people support their families across borders.",
                  },
                  {
                    title: "Growth Mindset",
                    description: "We invest in our team's professional development and personal growth.",
                  },
                ].map((value, index) => (
                  <div key={index} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-foundation-light">{value.title}</h3>
                    <p className="text-secondary/80 dark:text-foundation-light/80">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-secondary dark:text-foundation-light">Benefits & Perks</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  {
                    title: "Competitive Salary",
                    description: "We offer top-market compensation packages.",
                  },
                  {
                    title: "Health & Wellness",
                    description: "Comprehensive health insurance and wellness programs.",
                  },
                  {
                    title: "Flexible Working",
                    description: "Work from anywhere with flexible hours.",
                  },
                  {
                    title: "Stock Options",
                    description: "Be an owner in our growing company.",
                  },
                  {
                    title: "Paid Time Off",
                    description: "Generous vacation policy and paid holidays.",
                  },
                  {
                    title: "Team Events",
                    description: "Regular team building and social events.",
                  }
                ].map((benefit, index) => (
                  <div key={index} className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2 text-secondary dark:text-foundation-light">{benefit.title}</h3>
                    <p className="text-secondary/80 dark:text-foundation-light/80 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-white dark:bg-foundation-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-secondary dark:text-foundation-light">Open Positions</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Senior Full Stack Engineer",
                    department: "Engineering",
                    location: "Remote",
                    type: "Full-time",
                  },
                  {
                    title: "Product Manager",
                    department: "Product",
                    location: "London, UK",
                    type: "Full-time",
                  },
                  {
                    title: "Growth Marketing Manager",
                    department: "Marketing",
                    location: "Remote",
                    type: "Full-time",
                  },
                  {
                    title: "Customer Success Manager",
                    department: "Operations",
                    location: "Remote",
                    type: "Full-time",
                  },
                ].map((position, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-primary dark:hover:border-primary transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-secondary dark:text-foundation-light">
                          {position.title}
                        </h3>
                        <p className="text-secondary/80 dark:text-foundation-light/80">
                          {position.department} · {position.location} · {position.type}
                        </p>
                      </div>
                      <Button 
                        onClick={() => setShowCVForm(true)}
                        className="bg-primary hover:bg-primary/90 text-secondary"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Don't see the right role?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                We're always looking for talented people to join our team. Send us your CV and we'll keep you in mind for future opportunities.
              </p>
              <Button 
                onClick={() => setShowCVForm(true)}
                className="bg-white hover:bg-gray-100 text-secondary font-semibold px-8 py-4 text-lg hover:shadow-lg transition-all duration-300"
              >
                Send Your CV
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}