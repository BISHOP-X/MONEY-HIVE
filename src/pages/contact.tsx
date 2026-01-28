import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { submitEnquiry } from "@/lib/supabase";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitEnquiry({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you as soon as possible.'
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-foundation-light dark:bg-foundation-dark">
      <Header />
      <div className="flex-grow">
        <section className="pt-28 pb-16 bg-gradient-to-b from-slate-50 via-white to-white dark:from-slate-900 dark:via-foundation-dark dark:to-foundation-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">Contact Us</h1>
              <p className="text-lg text-secondary/80 dark:text-foundation-light/80 text-center mb-12">
                Have questions about MoneyHive? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
              </p>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary/80 dark:text-foundation-light/80 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full px-4 py-2 rounded-md border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary dark:focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 text-secondary dark:text-foundation-light"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary/80 dark:text-foundation-light/80 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full px-4 py-2 rounded-md border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary dark:focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 text-secondary dark:text-foundation-light"
                      />
                    </div>
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
                      className="w-full px-4 py-2 rounded-md border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary dark:focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 text-secondary dark:text-foundation-light"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary/80 dark:text-foundation-light/80 mb-2">
                      Subject *
                    </label>
                    <select 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-2 rounded-md border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary dark:focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 text-secondary dark:text-foundation-light"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Business Partnership">Business Partnership</option>
                      <option value="Press Inquiry">Press Inquiry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary/80 dark:text-foundation-light/80 mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-2 rounded-md border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary dark:focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 text-secondary dark:text-foundation-light"
                    ></textarea>
                  </div>

                  {/* Status Messages */}
                  {submitStatus && (
                    <div className={`p-4 rounded-lg flex items-center gap-3 ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
                        : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    }`}>
                      {submitStatus.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      {submitStatus.message}
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-secondary font-semibold py-3 hover:shadow-button-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </div>
              
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-secondary dark:text-foundation-light">Email Us</h3>
                  <p className="text-secondary/80 dark:text-foundation-light/80">
                    <a href="mailto:hello@moneyhiveapp.com" className="hover:text-primary">
                      hello@moneyhiveapp.com
                    </a>
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-secondary dark:text-foundation-light">Call Us</h3>
                  <p className="text-secondary/80 dark:text-foundation-light/80">+44 7908 917591</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-secondary dark:text-foundation-light">Live Chat</h3>
                  <p className="text-secondary/80 dark:text-foundation-light/80">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}