import NextAuth from "next-auth";
import { Session, User } from "next-auth";

import { JWT } from "next-auth/jwt";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "next-auth/providers/google";
import client from "./app/lib/db/db";
import { Kid } from "./app/types/next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
  async session({ session, token }: { session: Session; token: JWT }) {
    if (session.user && token.sub) {
      session.user.id = token.sub;
      session.user.image = token.image as string;
      session.user.kids = token.kids as Kid[];
    }

    // If you stored `kids` in the JWT, you can also do:
    if (token.kids) {
      session.user.kids = token.kids as Kid[];
    }
    // Expose all kids' ids as an array on the session user object
   
    return session;
  },

  async jwt({ token, user }: { token: JWT; user?: User }) {
    // This runs on sign-in
    if (user) {
      token.sub = user.id;
      token.image = user.image;
      token.kids = user.kids ?? [];
    }
    return token;
  },
}

});
