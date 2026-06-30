import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { compare } from "bcrypt-ts"
import { Role } from "@prisma/client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  // adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log('Authorize called with:', credentials?.email)
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.password) return null

        const isPasswordValid = await compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) return null

        console.log('User authorized successfully:', user.email)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub
      }
      if (token?.role && session.user) {
        session.user.role = token.role as Role
      }
      return session
    },
    async jwt({ token, user }) {
      console.log('JWT callback called. Token:', !!token, 'User:', !!user)
      if (user) {
          token.sub = user.id
          token.role = (user as any).role
      }
      return token
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
})
