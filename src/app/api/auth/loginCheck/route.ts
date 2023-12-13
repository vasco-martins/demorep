import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return NextResponse.json(false);
  }

  const match = await bcrypt.compare(password, user.password);
  return NextResponse.json(match);
}
