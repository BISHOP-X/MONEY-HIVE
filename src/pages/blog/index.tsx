import { useState } from 'react';
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Categories and articles data
const categories = [
  "All",
  "Impact Stories",
  "Technology",
  "Tips & Advice",
  "Education",
  "Research",
  "Family Finance"
];

const articles = [
  {
    id: 1,
    title: "How Remittances Are Helping Build Schools in Rural Africa",
    excerpt: "Learn how diaspora remittances are funding education infrastructure in rural communities across Africa, changing lives one school at a time.",
    date: "May 15, 2023",
    author: "Sarah Johnson",
    category: "Impact Stories",
    image: "https://images.pexels.com/photos/8466776/pexels-photo-8466776.jpeg",
    slug: "/blog/articles/impact-stories/schools-in-africa",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "The Evolution of Digital Remittance Services",
    excerpt: "From traditional money transfer operations to mobile apps, see how technology has transformed the way diaspora communities send money home.",
    date: "April 28, 2023",
    author: "Michael Davis",
    category: "Technology",
    image: "https://images.pexels.com/photos/6771985/pexels-photo-6771985.jpeg",
    slug: "/blog/articles/technology/digital-remittance-evolution",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "5 Ways to Save on Money Transfer Fees",
    excerpt: "Practical tips to help you reduce fees and get more value when sending money to friends and family abroad.",
    date: "April 10, 2023",
    author: "Elena Perez",
    category: "Tips & Advice",
    image: "https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg",
    slug: "/blog/articles/tips/save-on-transfer-fees",
    readTime: "4 min read"
  },
  {
    id: 4,
    title: "Understanding Exchange Rate Fluctuations",
    excerpt: "A comprehensive guide to how exchange rates work and their impact on international money transfers.",
    date: "March 25, 2023",
    author: "John Smith",
    category: "Education",
    image: "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg",
    slug: "/blog/articles/education/understanding-exchange-rates",
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "The Impact of Remittances on Developing Economies",
    excerpt: "An in-depth analysis of how international money transfers contribute to economic growth in receiving countries.",
    date: "March 15, 2023",
    author: "Maria Rodriguez",
    category: "Research",
    image: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg",
    slug: "/blog/articles/research/impact-on-developing-economies",
    readTime: "10 min read"
  },
  {
    id: 6,
    title: "Supporting Elderly Parents Abroad: A Guide",
    excerpt: "Practical advice for managing regular payments and healthcare costs for aging parents in your home country.",
    date: "February 18, 2023",
    author: "David Chen",
    category: "Family Finance",
    image: "https://images.pexels.com/photos/4386339/pexels-photo-4386339.jpeg",
    slug: "/blog/articles/family-finance/managing-across-borders",
    readTime: "7 min read"
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  // Sort articles by date (most recent first)
  const sortedArticles = [...filteredArticles].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get featured article (most recent from all articles)
  const featuredArticle = articles.reduce((latest, current) => 
    new Date(current.date) > new Date(latest.date) ? current : latest
  );

  return (
    <main className="flex min-h-screen flex-col bg-foundation-light dark:bg-foundation-dark mode-transition">
      <Header />
      <div className="pt-16 pb-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-slate-50 via-white to-white dark:from-slate-800 dark:via-foundation-dark dark:to-foundation-dark mode-transition">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent font-jakarta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                Global Thread
              </motion.h1>
              <motion.p 
                className="text-xl text-secondary/80 dark:text-foundation-light/80 mb-2 font-jakarta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
              >
                A publication by MoneyHive
              </motion.p>
              <motion.p 
                className="text-lg text-secondary/70 dark:text-foundation-light/70 mb-8 max-w-3xl mx-auto font-jakarta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
              >
                Connecting stories, currencies, and communities across continents
              </motion.p>
              <motion.div 
                className="flex flex-wrap justify-center gap-2 md:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
              >
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === selectedCategory ? "default" : "outline"}
                    className={
                      category === selectedCategory
                        ? "bg-primary hover:bg-primary/90 text-secondary font-jakarta"
                        : "border-primary/20 hover:border-primary hover:bg-primary/10 text-secondary dark:text-foundation-light font-jakarta"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-10 bg-white dark:bg-slate-900 mode-transition">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div className="relative h-64 md:h-96 bg-gradient-to-br from-primary/20 to-supporting/20 dark:from-primary/10 dark:to-supporting/10 rounded-xl overflow-hidden">
                <img 
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary font-jakarta">
                  Featured
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-foundation-light font-jakarta">
                  {featuredArticle.title}
                </h2>
                <p className="text-secondary/80 dark:text-foundation-light/80 font-jakarta">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-supporting/20 flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary dark:text-foundation-light font-jakarta">{featuredArticle.author}</p>
                    <p className="text-xs text-secondary/60 dark:text-foundation-light/60 font-jakarta">{featuredArticle.date} • {featuredArticle.readTime}</p>
                  </div>
                </div>
                <Link to={featuredArticle.slug}>
                  <Button className="bg-primary hover:bg-primary/90 text-secondary font-jakarta">
                    Read Article
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800 mode-transition">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-secondary dark:text-foundation-light font-jakarta">
              {selectedCategory === "All" ? "Latest Articles" : selectedCategory}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedArticles.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeInOut" }}
                >
                  <Link to={post.slug}>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-none shadow-md overflow-hidden bg-white dark:bg-slate-700/50 consistent-hover">
                      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-supporting/20 dark:from-primary/10 dark:to-supporting/10">
                        <img 
                          src={post.image}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center mb-2">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary font-jakarta">
                            {post.category}
                          </span>
                          <span className="text-xs text-secondary/60 dark:text-foundation-light/60 font-jakarta">{post.readTime}</span>
                        </div>
                        <CardTitle className="text-xl text-secondary dark:text-foundation-light hover:text-primary dark:hover:text-primary transition-colors font-jakarta">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-secondary/80 dark:text-foundation-light/80 text-sm line-clamp-3 font-jakarta">
                          {post.excerpt}
                        </p>
                      </CardContent>
                      <CardFooter className="flex items-center space-x-4 pt-0">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-supporting/20 flex items-center justify-center">
                          <span className="text-sm">👤</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-secondary dark:text-foundation-light font-jakarta">{post.author}</p>
                          <p className="text-xs text-secondary/60 dark:text-foundation-light/60 font-jakarta">{post.date}</p>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary/20 hover:border-primary hover:bg-primary/10 text-secondary dark:text-foundation-light font-jakarta"
              >
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white font-jakarta">
                Subscribe to Global Thread
              </h2>
              <p className="text-white/90 mb-8 font-jakarta">
                Get the latest insights on remittances, money transfers, and financial tips delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 bg-white/10 text-white placeholder-white/70 font-jakarta"
                />
                <Button className="bg-white hover:bg-gray-100 text-secondary w-full sm:w-auto font-jakarta">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-white/80 mt-4 font-jakarta">
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