import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const correctPassword = process.env.ADMIN_PASSWORD || "asterix_studio_admin";
    
    if (password === correctPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: "Password salah!" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
