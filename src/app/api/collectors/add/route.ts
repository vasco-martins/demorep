import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, email, videoCollect, textCollect } = await req.json();

  const collector = await prisma.collector.create({
    data: {
      name: name,
      videoCollect: videoCollect,
      textCollect: textCollect,
      user: { connect: { email: email } },
    },
  });

  return NextResponse.json(collector);
}
