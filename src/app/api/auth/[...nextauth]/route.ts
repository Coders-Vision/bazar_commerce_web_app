import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "@/actions/sign-in";
import { User } from "@/types/types";

const handler = NextAuth({
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const res: any = await signIn({
          email: credentials?.email,
          password: credentials?.password,
        });
        const user = {
          id: res?.data?.id,
          name: res?.data?.userName,
          email: res?.data?.email,
          accessToken: res?.data?.accessToken,
        };
        if (user?.accessToken) {
          return user as User;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // console.log("This is the token returned from jwt func", token);
      // console.log("This is the user returned from jwt func", user);
      // console.log("This is the account returned from jwt func", account);
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // console.log("This is the token returned from session func", token);
      // console.log("This is the user returned from session func", user);
      // console.log("This is the account returned from session func", session);
      return session;
    },
  },
});

export { handler as GET, handler as POST };
