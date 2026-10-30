import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { blogPosts } from "@/data/blogPosts";

export async function GET() {
  let dbPosts: any[] = [];
  
  try {
    // Try to get from DB
    if (prisma && (prisma as any).post) {
      dbPosts = await prisma.post.findMany({
        orderBy: { publishedAt: "desc" },
      });

      // If DB has fewer posts than static blogPosts, sync with blogPosts
      if (dbPosts.length < blogPosts.length) {
        console.log("Syncing database with starter posts...");
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

        dbPosts = await prisma.post.findMany({
          orderBy: { publishedAt: "desc" },
        });
      }
    }
  } catch (error) {
    console.error("Prisma error, falling back to local data:", error);
    // Sort local data descending by date
    const sortedLocal = [...blogPosts].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    return NextResponse.json(sortedLocal.map(p => ({ ...p, id: p.slug })));
  }

  // Merge extra metadata (tags, authorRole) from static data
  const enrichedPosts = (dbPosts.length > 0 ? dbPosts : blogPosts).map((p: any) => {
    const local = blogPosts.find(lp => lp.slug === p.slug);
    return {
      ...p,
      tags: local?.tags || [],
      authorRole: local?.authorRole || (p.author === "Ardian Setiawan" ? "Mahasiswa Teknik Informatika, Universitas Pamulang" : "Asterix Studio Agency"),
    };
  });

  return NextResponse.json(enrichedPosts);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: body,
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
