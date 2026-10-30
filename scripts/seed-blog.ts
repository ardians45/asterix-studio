import { PrismaClient } from "@prisma/client";
import { blogPosts } from "../data/blogPosts";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing all 22 blog posts to SQLite database...");

  for (const post of blogPosts) {
    const pubDate = new Date(post.publishedAt);
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        category: post.category,
        author: post.author,
        readTime: post.readTime,
        publishedAt: isNaN(pubDate.getTime()) ? new Date() : pubDate,
        isPublished: true,
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        category: post.category,
        author: post.author,
        readTime: post.readTime,
        publishedAt: isNaN(pubDate.getTime()) ? new Date() : pubDate,
        isPublished: true,
      },
    });
  }

  const count = await prisma.post.count();
  console.log(`Sync complete! Total posts in database: ${count}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
