import NextAuth, { RequestInternal } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import prisma from "../../../../lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { User } from "@prisma/client";
import { randomBytes, randomUUID } from "crypto";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      secret: process.env.NEXTAUTH_SECRET,
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      callbacks: {
        async session({ session, token, user }) {
          // Send properties to the client, like an access_token and user id from a provider.
          session.accessToken = token.accessToken;
          console.log(token);
          session.user.id = token.id;

          return session;
        },
      },

      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ) {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("Email or password invalid");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }
        return user as User | null;
      },
    }),
  ],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
