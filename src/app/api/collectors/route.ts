import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const collectors = await prisma.collector.findMany({
    where: {
      user: { email: email },
    },
  });

  return NextResponse.json(collectors);
}
