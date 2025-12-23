import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BlogArticle({ article }) {
  const relatedArticles = [
    {
      id: 1,
      title: "The Future of Cross-Border Payments",
      excerpt: "How blockchain technology is revolutionizing international money transfers.",
      image: "https://images.pexels.com/photos/6771985/pexels-photo-6771985.jpeg",
      category: "Technology",
      readTime: "8 min read",
      slug: "/blog/articles/technology/future-cross-border-payments"
    },
    {
      id: 2,
      title: "Supporting Family Abroad: A Complete Guide",
      excerpt: "Best practices for managing regular financial support for family members overseas.",
      image: "https://images.pexels.com/photos/4386339/pexels-photo-4386339.jpeg",
      category: "Family Finance",
      readTime: "12 min read",
      slug: "/blog/articles/family-finance/supporting-family-abroad"
    },
    {
      id: 3,
      title: "Understanding Remittance Regulations",
      excerpt: "Navigate the complex world of international money transfer compliance.",
      image: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg",
      category: "Education",
      readTime: "10 min read",
      slug: "/blog/articles/education/remittance-regulations"
    }
  ];

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this article: ${article.title}`;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Article Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary">
          {article.category}
        </span>
      </motion.div>
      
      {/* Article Title */}
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-6 text-secondary dark:text-foundation-light font-jakarta leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
      >
        {article.title}
      </motion.h1>
      
      {/* Author and Meta Information */}
      <motion.div 
        className="flex items-center space-x-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
      >
        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-supporting/20 flex items-center justify-center">
          <span className="text-xl">👤</span>
        </div>
        <div>
          <p className="text-sm font-medium text-secondary dark:text-foundation-light">{article.author}</p>
          <p className="text-xs text-secondary/60 dark:text-foundation-light/60">
            {article.date} • {article.readTime}
          </p>
        </div>
      </motion.div>

      {/* Featured Image */}
      {article.coverImage && (
        <motion.div 
          className="relative h-[400px] mb-12 rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
        >
          <img 
            src={article.coverImage} 
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* Article Content */}
      <motion.div 
        className="prose prose-lg dark:prose-invert max-w-none text-secondary/80 dark:text-foundation-light/80 mb-12"
        dangerouslySetInnerHTML={{ __html: article.content }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
      />

      {/* Social Sharing */}
      <motion.div 
        className="border-t border-b border-gray-200 dark:border-gray-700 py-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-secondary dark:text-foundation-light">Share this article</h3>
          <div className="flex space-x-4">
            <motion.a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
              whileHover={{ y: -2, boxShadow: "0px 4px 14px rgba(59, 130, 246, 0.25)" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Share on Twitter"
            >
              <Twitter className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-300"
              whileHover={{ y: -2, boxShadow: "0px 4px 14px rgba(29, 78, 216, 0.25)" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ y: -2, boxShadow: "0px 4px 14px rgba(37, 99, 235, 0.25)" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Share on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Related Articles */}
      <motion.section 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
      >
        <h3 className="text-2xl font-bold mb-8 text-secondary dark:text-foundation-light font-jakarta">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedArticles.map((relatedArticle, index) => (
            <motion.div
              key={relatedArticle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + (index * 0.1), ease: "easeInOut" }}
            >
              <Link to={relatedArticle.slug}>
                <div className="bg-white dark:bg-slate-700/50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary mb-3">
                      {relatedArticle.category}
                    </span>
                    <h4 className="text-lg font-semibold mb-2 text-secondary dark:text-foundation-light group-hover:text-primary transition-colors duration-300">
                      {relatedArticle.title}
                    </h4>
                    <p className="text-secondary/70 dark:text-foundation-light/70 text-sm mb-3 line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                    <p className="text-xs text-secondary/60 dark:text-foundation-light/60">
                      {relatedArticle.readTime}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Navigation */}
      <motion.div 
        className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeInOut" }}
      >
        <Link 
          to="/blog"
          className="flex items-center text-primary hover:text-primary/80 transition-colors duration-300 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
        <Link 
          to="/blog"
          className="flex items-center text-primary hover:text-primary/80 transition-colors duration-300 font-medium"
        >
          More Articles
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </motion.div>
    </article>
  );
}