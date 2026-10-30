import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { blogPosts } from "@/data/blogPosts";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const slug = (resolvedParams.slug || "").trim().toLowerCase();
    
    // 1. Check local data first for guaranteed starter content
    const localPost = blogPosts.find(p => p.slug.toLowerCase() === slug);
    if (localPost) {
      return NextResponse.json({
        ...localPost,
        authorRole: localPost.authorRole || (localPost.author === "Ardian Setiawan" ? "Mahasiswa Teknik Informatika, Universitas Pamulang" : "Asterix Studio Agency")
      });
    }

    // 2. Fallback to DB for user-generated content
    try {
      if (prisma && (prisma as any).post) {
        const dbPost = await prisma.post.findUnique({
          where: { slug: resolvedParams.slug },
        });
        if (dbPost) {
          return NextResponse.json({
            ...dbPost,
            authorRole: dbPost.author === "Ardian Setiawan" ? "Mahasiswa Teknik Informatika, Universitas Pamulang" : "Asterix Studio Agency",
            tags: [],
          });
        }
      }
    } catch (dbError) {
      console.warn("Database matching failed, continuing with local fallback logic.");
    }

    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
