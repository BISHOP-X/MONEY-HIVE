import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900">
      <Header />
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
          <h1 className="text-4xl font-bold mb-8 text-secondary dark:text-foundation-light">Privacy Policy</h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-lg text-secondary/80 dark:text-foundation-light/80">
              Last updated: March 15, 2025
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-secondary dark:text-foundation-light">1. Information We Collect</h2>
            <p className="text-secondary/80 dark:text-foundation-light/80">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-secondary/80 dark:text-foundation-light/80">
              <li>Personal identification information</li>
              <li>Contact information</li>
              <li>Financial information</li>
              <li>Transaction history</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-secondary dark:text-foundation-light">2. How We Use Your Information</h2>
            <p className="text-secondary/80 dark:text-foundation-light/80">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-secondary/80 dark:text-foundation-light/80">
              <li>Process your transactions</li>
              <li>Verify your identity</li>
              <li>Communicate with you</li>
              <li>Improve our services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-secondary dark:text-foundation-light">3. Information Sharing</h2>
            <p className="text-secondary/80 dark:text-foundation-light/80">
              We do not sell your personal information. We share your information only with:
            </p>
            <ul className="list-disc pl-6 text-secondary/80 dark:text-foundation-light/80">
              <li>Service providers</li>
              <li>Financial partners</li>
              <li>Legal authorities when required</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-secondary dark:text-foundation-light">4. Data Security</h2>
            <p className="text-secondary/80 dark:text-foundation-light/80">
              We implement appropriate technical and organizational measures to protect your personal information.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-secondary dark:text-foundation-light">5. Your Rights</h2>
            <p className="text-secondary/80 dark:text-foundation-light/80">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-secondary/80 dark:text-foundation-light/80">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
