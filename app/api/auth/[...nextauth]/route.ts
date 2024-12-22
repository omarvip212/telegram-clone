import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { useStore } from '@/lib/store'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email'
        }
      }
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (user && account) {
        const { name, email, image } = user
        const store = useStore.getState()
        
        try {
          await store.register(
            email!, 
            'social-auth',
            name!,
          )
          return true
        } catch (error) {
          console.error('Error during social login:', error)
          return false
        }
      }
      return false
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.provider = account.provider
        token.id = profile.sub || profile.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.provider = token.provider as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allow callbacks to auth providers
      if (url.startsWith('/api/auth/')) return url
      // Allow redirects to the same origin
      if (url.startsWith(baseUrl)) return url
      // Allow redirects to relative paths
      if (url.startsWith('/')) return new URL(url, baseUrl).toString()
      // Fallback to homepage
      return baseUrl
    },
  },
  pages: {
    signIn: '/register',
    error: '/auth/error',
    signOut: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  logger: {
    error(code, ...message) {
      console.error(code, ...message)
    },
    warn(code, ...message) {
      console.warn(code, ...message)
    },
    debug(code, ...message) {
      if (process.env.NODE_ENV === 'development') {
        console.debug(code, ...message)
      }
    },
  },
})

export { handler as GET, handler as POST } 