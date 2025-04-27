// app/api/stagiaires/check/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cin = searchParams.get("cin");
    
    if (!cin) {
      return NextResponse.json({ exists: false, error: "CIN is required" }, { status: 400 });
    }
    
    // In a real application, this would call your service method
    // const exists = await stagiaireService.existsStagiaireByCIN(cin);
    
    // For demo purposes, we'll mock the response
    const exists = ["A123456", "B789012", "C345678"].includes(cin);
    
    return NextResponse.json({ exists });
  } catch (error) {
    console.error("Error checking stagiaire:", error);
    return NextResponse.json({ exists: false, error: "Internal server error" }, { status: 500 });
  }
}