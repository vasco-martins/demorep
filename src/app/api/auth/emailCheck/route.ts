import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return NextResponse.json(exists?.email !== email);
}
