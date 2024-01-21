import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { BaseApiUrl } from "@/utils/BaseApiUrl";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        try {
          let res = await axios.post(`${BaseApiUrl}/auth/login`, {
            email,
            password,
          });
          const response = res.data;

          return {
            id: response?.user._id,
            name: response?.user.name,
            email: response?.user.email,
            token: response?.token,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.token = user.token;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.token = token.token;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});

export { handler as GET, handler as POST };