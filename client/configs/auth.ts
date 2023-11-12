import { TokenAuthDocument } from "@/generates/gql/graphql"
import createGraphQLClient from "@/lib/requestClient"
import useUserStore from "@/store/user"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoggleProvider from "next-auth/providers/google"

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        const user = await createGraphQLClient().request(TokenAuthDocument, {
          password: credentials!.password,
          login: credentials!.username,
        })

        // If no error and we have user data, return it
        if (user && user.tokenAuth && user.tokenAuth.token) {
          return { id: user.tokenAuth.payload.username, ...user }
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),

    // GoggleProvider({
    //   clientId: "забрать клиент ID из ЛК" as string,
    //   clientSecret: "там же где клиент ID" as string,
    // }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      session.user = token as any
      return session
    },
  },
}
