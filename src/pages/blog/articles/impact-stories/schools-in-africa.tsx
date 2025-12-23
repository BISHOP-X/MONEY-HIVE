import { BlogLayout } from "@/components/blog/BlogLayout";
import { BlogArticle } from "@/components/blog/BlogArticle";

export default function SchoolsInAfricaArticle() {
  const article = {
    title: "How Remittances Are Helping Build Schools in Rural Africa",
    excerpt: "Learn how diaspora remittances are funding education infrastructure in rural communities across Africa, changing lives one school at a time.",
    date: "May 15, 2023",
    author: "Sarah Johnson",
    category: "Impact Stories",
    readTime: "5 min read",
    content: `
      <p>The impact of diaspora remittances on education in Africa goes far beyond paying school fees. In recent years, we've seen an inspiring trend: communities coming together to build entire schools, powered by collective remittances from their members abroad.</p>

      <h2>The Power of Collective Remittances</h2>
      <p>When individual remittances come together for a common cause, the impact multiplies exponentially. In 2022 alone, diaspora-funded educational projects have:</p>
      <ul>
        <li>Built 12 new primary schools across rural Nigeria</li>
        <li>Renovated 24 existing school buildings in Ghana</li>
        <li>Provided modern learning equipment to 50+ schools in Kenya</li>
      </ul>

      <h2>From Dreams to Reality: The Abeokuta Story</h2>
      <p>In Abeokuta, Nigeria, what started as a WhatsApp group of 50 people abroad grew into a movement that built a full primary school in just 8 months. The school now serves 400 children who previously had to walk 5km to the nearest education facility.</p>

      <h2>The Ripple Effect</h2>
      <p>These projects do more than just build schools. They create jobs, boost local economies, and inspire other diaspora communities to launch similar initiatives. It's a powerful reminder of how technology can help channel remittances into sustainable development.</p>

      <h2>Looking Ahead</h2>
      <p>As digital platforms make it easier to pool and track collective remittances, we expect to see more such initiatives in 2024 and beyond. The future of diaspora-led development is bright, and education is just the beginning.</p>
    `,
    coverImage: "https://images.pexels.com/photos/8466776/pexels-photo-8466776.jpeg"
  };

  return (
    <BlogLayout>
      <BlogArticle article={article} />
    </BlogLayout>
  );
}