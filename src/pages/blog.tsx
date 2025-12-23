import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Blog | MoneyHive",
  description: "Read the latest insights, guides, and news about diaspora remittances, money transfers, and financial wellness.",
};

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "How Remittances Are Helping Build Schools in Rural Africa",
    excerpt: "Learn how diaspora remittances are funding education infrastructure in rural communities across Africa, changing lives one school at a time.",
    date: "May 15, 2023",
    author: "Sarah Johnson",
    category: "Impact Stories",
    image: "/images/placeholder.jpg",
    slug: "how-remittances-are-helping-build-schools-in-rural-africa",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "The Evolution of Digital Remittance Services",
    excerpt: "From traditional money transfer operations to mobile apps, see how technology has transformed the way diaspora communities send money home.",
    date: "April 28, 2023",
    author: "Michael Davis",
    category: "Technology",
    image: "/images/placeholder.jpg",
    slug: "the-evolution-of-digital-remittance-services",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "5 Ways to Save on Money Transfer Fees",
    excerpt: "Practical tips to help you reduce fees and get more value when sending money to friends and family abroad.",
    date: "April 10, 2023",
    author: "Elena Perez",
    category: "Tips & Advice",
    image: "/images/placeholder.jpg",
    slug: "5-ways-to-save-on-money-transfer-fees",
    readTime: "4 min read"
  },
  {
    id: 4,
    title: "Understanding Exchange Rate Fluctuations",
    excerpt: "A simple guide to how currency exchange rates work and what factors affect your remittance value.",
    date: "March 22, 2023",
    author: "James Wilson",
    category: "Education",
    image: "/images/placeholder.jpg",
    slug: "understanding-exchange-rate-fluctuations",
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "The Economic Impact of Diaspora Remittances",
    excerpt: "How money sent by expatriates contributes to economic growth and stability in developing countries.",
    date: "March 5, 2023",
    author: "Aisha Mohammed",
    category: "Research",
    image: "/images/placeholder.jpg",
    slug: "the-economic-impact-of-diaspora-remittances",
    readTime: "10 min read"
  },
  {
    id: 6,
    title: "Supporting Elderly Parents Abroad: A Guide",
    excerpt: "Practical advice for managing regular payments and healthcare costs for aging parents in your home country.",
    date: "February 18, 2023",
    author: "David Chen",
    category: "Family Finance",
    image: "/images/placeholder.jpg",
    slug: "supporting-elderly-parents-abroad-a-guide",
    readTime: "7 min read"
  },
];

// Categories for filter
const categories = [
  "All",
  "Impact Stories",
  "Technology",
  "Tips & Advice",
  "Education",
  "Research",
  "Family Finance"
];

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="pt-16 pb-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-yellow-50 via-white to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                MoneyHive Blog
              </h1>
              <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
                Insights, guides, and stories about diaspora remittances, international money transfers, and financial wellness.
              </p>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    className={
                      category === "All"
                        ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                        : "border-yellow-200 hover:border-yellow-500 hover:bg-yellow-50"
                    }
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Featured Image</span>
                </div>
              </div>
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Featured
                </span>
                <h2 className="text-2xl md:text-3xl font-bold">
                  The Future of Cross-Border Payments: How Technology is Revolutionizing Remittances
                </h2>
                <p className="text-gray-600">
                  From blockchain to mobile money, discover how innovative technologies are making international money transfers faster, cheaper, and more accessible for diaspora communities worldwide.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="text-sm font-medium">Robert Chang</p>
                    <p className="text-xs text-gray-500">June 2, 2023 • 12 min read</p>
                  </div>
                </div>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  Read Article
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Latest Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="h-full hover:shadow-lg transition-shadow duration-300 border-none shadow-md overflow-hidden">
                  <div className="relative h-48 bg-gray-200">
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Post Image</span>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-xl">
                      <Link to={`/blog/${post.slug}`} className="hover:text-yellow-600 transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center space-x-4 pt-0">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200"></div>
                    <div>
                      <p className="text-sm font-medium">{post.author}</p>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button variant="outline" size="lg" className="border-yellow-200 hover:border-yellow-500">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-yellow-500">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-white/90 mb-8">
                Get the latest insights on remittances, money transfers, and financial tips delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-md focus:outline-none"
                />
                <Button className="bg-black hover:bg-gray-900 text-white w-full sm:w-auto">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-white/80 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}