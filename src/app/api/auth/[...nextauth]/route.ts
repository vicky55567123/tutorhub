import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import GitHubProvider from 'next-auth/providers/github'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    })
  ],
  pages: {
    signIn: '/',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.userType = 'student' // Default to student, can be changed later
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        const user = session.user as any
        user.id = token.sub
        user.userType = token.userType || 'student'
      }
      return session
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
