import prisma from "@/lib/prisma";
import { Collector } from "@prisma/client";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

const fetchCollectorById = async (
  id: number,
  email: string
): Promise<Collector | null> => {
  // Fetch the collector based on the provided ID
  const collector = await prisma.collector.findFirst({
    where: { id: id, user: { email: email } },
  });
  if (!collector) {
    return null;
  }

  return collector;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const session = await getServerSession();

  if (session?.user === undefined) {
    return NextResponse.redirect("/login");
  }
  console.log(session.user.email);

  // Fetch the collector based on the provided ID
  const collector = await fetchCollectorById(Number(id), session.user.email);

  if (!collector) {
    return NextResponse.json(
      { message: "Collector not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(collector, { status: 200 });
}
