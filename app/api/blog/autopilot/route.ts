import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!apiKey) {
      return NextResponse.json({ 
        error: "GEMINI_API_KEY belum di-set di file .env. Silakan cek .env.example" 
      }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    const prompt = `
      Buatlah artikel blog profesional dalam Bahasa Indonesia tentang topik: "${topic}".
      Artikel ini ditujukan untuk klien B2B atau pemilik bisnis.
      
      Output harus dalam format JSON mentah (tanpa markdown code blocks) dengan struktur:
      {
        "title": "Judul Artikel yang Menarik",
        "excerpt": "Ringkasan singkat 1-2 kalimat",
        "content": "Isi artikel lengkap dalam format HTML (gunakan tag <p>, <h2>, <ul>, <li>, <strong>)",
        "category": "Pilih satu: Bisnis Digital, Tips & Trik, atau Fun Fact",
        "readTime": "X menit",
        "searchKeyword": "1 keyword bahasa inggris untuk mencari gambar di Unsplash"
      }
    `;

    let result;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      result = await model.generateContent(prompt);
    } catch (e) {
      console.log("Gemini 1.5 Flash failed, trying Gemini Pro...");
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-pro" });
      result = await fallbackModel.generateContent(prompt);
    }

    const response = await result.response;
    let text = response.text();
    
    // Clean JSON if AI adds markdown backticks
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const blogData = JSON.parse(text);

    // 2. Get Image from Unsplash
    let coverImage = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"; // fallback
    
    if (unsplashKey) {
        try {
            const unsplashRes = await fetch(
                `https://api.unsplash.com/photos/random?query=${encodeURIComponent(blogData.searchKeyword)}&client_id=${unsplashKey}`
            );
            const imageData = await unsplashRes.json();
            if (imageData.urls?.regular) {
                coverImage = imageData.urls.regular;
            }
        } catch (e) {
            console.error("Unsplash Error:", e);
        }
    }

    // 3. Save to Database
    const slug = blogData.title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    const post = await prisma.post.create({
      data: {
        slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
        title: blogData.title,
        excerpt: blogData.excerpt,
        content: blogData.content,
        coverImage: coverImage,
        category: blogData.category,
        readTime: blogData.readTime,
        publishedAt: new Date(),
        isPublished: true,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error("Autopilot Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
