import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image?: string
      provider: string
    }
  }

  interface Profile {
    sub?: string
    id?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    provider: string
  }
} 