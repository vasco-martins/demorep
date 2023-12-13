import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token && process.env.NEXTAUTH_URL) {
    return NextResponse.redirect(process.env.NEXTAUTH_URL + "/auth/login");
  }
}
export const config = {
  matcher: "/dashboard/:path*",
};
