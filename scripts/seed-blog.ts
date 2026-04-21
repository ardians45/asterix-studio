import { PrismaClient } from "@prisma/client";
import { blogPosts } from "../data/blogPosts";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding blog posts...");

  for (const post of blogPosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        category: post.category,
        author: post.author,
        readTime: post.readTime,
        publishedAt: new Date(),
        isPublished: true,
      },
    });
  }

  console.log("Seed finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
