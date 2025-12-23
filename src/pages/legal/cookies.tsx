import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CookiesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-coconut-milk dark:bg-midnight-ash">
      <Header />
      <div className="pt-20 flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8 text-midnight-ash dark:text-coconut-milk">Cookie Policy</h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-lg text-midnight-ash/80 dark:text-coconut-milk/80">
              Last updated: March 15, 2025
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-midnight-ash dark:text-coconut-milk">1. What Are Cookies</h2>
            <p className="text-midnight-ash/80 dark:text-coconut-milk/80">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience and understand how you use our service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-midnight-ash dark:text-coconut-milk">2. Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 text-midnight-ash/80 dark:text-coconut-milk/80">
              <li>Essential cookies for basic functionality</li>
              <li>Analytics cookies to understand usage</li>
              <li>Preference cookies to remember your settings</li>
              <li>Security cookies to protect our service</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-midnight-ash dark:text-coconut-milk">3. Managing Cookies</h2>
            <p className="text-midnight-ash/80 dark:text-coconut-milk/80">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-midnight-ash dark:text-coconut-milk">4. Third-Party Cookies</h2>
            <p className="text-midnight-ash/80 dark:text-coconut-milk/80">
              Some of our service providers may place cookies on your device. These cookies help us:
            </p>
            <ul className="list-disc pl-6 text-midnight-ash/80 dark:text-coconut-milk/80">
              <li>Analyze website traffic</li>
              <li>Customize our services</li>
              <li>Protect against fraud</li>
              <li>Improve functionality</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-midnight-ash dark:text-coconut-milk">5. Updates to This Policy</h2>
            <p className="text-midnight-ash/80 dark:text-coconut-milk/80">
              We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}