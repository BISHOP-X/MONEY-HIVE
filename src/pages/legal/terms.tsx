import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900">
      <Header />
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
          <h1 className="text-4xl font-bold mb-8 text-secondary dark:text-foundation-light">Terms of Service</h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-lg text-secondary/80 dark:text-foundation-light/80">
              Last updated: March 15, 2025
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-secondary dark:text-foundation-light">1. Agreement to Terms</h2>
            <p className="text-secondary/80 dark:text-foundation-light/80">
              By accessing or using MoneyHive's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-secondary dark:text-foundation-light">2. Use License</h2>
            <p className="text-secondary/80 dark:text-foundation-light/80">
              Permission is granted to temporarily access and use MoneyHive's services for personal, non-commercial transactional purposes only. This is the grant of a license, not a transfer of title.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-secondary dark:text-foundation-light">3. Service Description</h2>
            <p className="text-secondary/80 dark:text-foundation-light/80">
              MoneyHive provides international money transfer and bill payment services. We facilitate the transfer of funds between users and their designated recipients in accordance with applicable laws and regulations.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-secondary dark:text-foundation-light">4. User Obligations</h2>
            <ul className="list-disc pl-6 text-secondary/80 dark:text-foundation-light/80">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Use the service only for legitimate purposes</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-secondary dark:text-foundation-light">5. Fees and Charges</h2>
            <p className="text-secondary/80 dark:text-foundation-light/80">
              Users agree to pay all fees associated with their use of MoneyHive's services. Fees will be clearly displayed before each transaction is confirmed.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-secondary dark:text-foundation-light">6. Limitation of Liability</h2>
            <p className="text-secondary/80 dark:text-foundation-light/80">
              MoneyHive shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-secondary dark:text-foundation-light">7. Changes to Terms</h2>
            <p className="text-secondary/80 dark:text-foundation-light/80">
              MoneyHive reserves the right to modify these terms at any time. Users will be notified of any changes through the service.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
