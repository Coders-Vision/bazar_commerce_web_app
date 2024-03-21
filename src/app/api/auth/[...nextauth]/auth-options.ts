import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "@/actions/sign-in";
import { User } from "@/types/types";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { cookies } from "next/headers";
import qs from "querystring";

interface RefreshTokenCookie {
  refreshToken: string;
  "Max-Age": string;
  Path: "/";
  SameSite: string;
  Expires: string;
}

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(`${process.env.BE_API_URL}/api/auth/refresh`, {
    method: "POST",
    headers: {
      Cookie: cookies().toString(),
    },
  });

  const getCookie = [`${res.headers.get("set-cookie")}`] || "";
  saveRefreshToken(getCookie);
  const response = await res.json();
  console.log("Refresh and Access Token Refreshed");
  return {
    ...token,
    user: response.user,
  };
}

async function signoOutAPI() {
  const res = await fetch(`${process.env.BE_API_URL}/api/auth/logout`, {
    method: "GET",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  const response = await res.json();
  console.log(response);
}

function saveRefreshToken(cookie: string[]) {
  const cookieStore = cookies();
  if (!cookie) {
    return null;
  }
  const processed = qs.decode(cookie[0], "; ") as unknown as RefreshTokenCookie;
  cookieStore.set("refreshToken", processed.refreshToken as string, {
    httpOnly: true,
    expires: Date.parse(processed.Expires),
    path: processed.Path,
    sameSite: processed.SameSite === "Lax" ? "lax" : "none",
    secure: true,
    maxAge: parseInt(processed["Max-Age"]),
  });
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  secret: process.env.AUTH_SECRET,
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
        const getCookie = res.headers["set-cookie"];
        saveRefreshToken(getCookie);
        const user = res?.data;
        if (user?.user?.accessToken) {
          console.log("[AUTHORIZE] User signed in", user);
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
      // console.log("Thxis is the account returned from jwt func", account);
      if (user) {
        return { ...token, ...user };
        // return await refreshToken(token);
      }
      if (new Date().getTime() < token.user?.expiresIn!) return token;
      return await refreshToken(token);
    },
    async session({ session, token, user }) {
      // console.log("This is the token returned from session func", token);
      // console.log("This is the user returned from session func", user);
      // console.log("This is the account returned from session func", session);

      session.user = token.user;
      session.user.accessToken = token.user.accessToken;

      return session;
    },
  },
  events: {
    async signOut() {
      if (cookies().get("refreshToken")) {
        signoOutAPI()
        cookies().delete("refreshToken");
      }
    },
  },
};