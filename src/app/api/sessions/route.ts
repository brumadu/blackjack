import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    "hey there": "here",
  });
}

export async function POST(request: Request) {}

export async function PATCH(request: Request) {}

export async function DELETE(request: Request) {}
