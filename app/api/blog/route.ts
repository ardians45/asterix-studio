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

      // If DB is empty, auto-seed with professional posts
      if (dbPosts.length === 0) {
        console.log("Seeding starter posts to DB...");
        const seedData = blogPosts.map(post => ({
          ...post,
          publishedAt: new Date(), // Convert string to Date for Prisma
        }));
        
        await prisma.post.createMany({
          data: seedData as any
        });

        dbPosts = await prisma.post.findMany({
          orderBy: { publishedAt: "desc" },
        });
      }
    }
  } catch (error) {
    console.error("Prisma error, falling back to local data:", error);
    // Fallback to local data if DB fails completely
    return NextResponse.json(blogPosts.map(p => ({ ...p, id: p.slug })));
  }

  return NextResponse.json(dbPosts);
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
