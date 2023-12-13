import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { id, name, email } = await req.json();

  const collector = await prisma.collector.findFirst({
    where: {
      user: { email: email },
      name: name,
      id: { not: id },
    },
  });
  return NextResponse.json(collector?.name == null);
}
