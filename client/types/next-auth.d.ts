import NextAuth from "next-auth/next"

declare module "next-auth" {
  interface Session {
    user: {
      tokenAuth: {
        payload: {
          username: string
          exp: number
          origIat: number
        }
        token: string
        refreshExpiresIn: number
      }
    }
  }
}
