import { GraphQLClient } from "graphql-request"
import { BACKEND_SITE, GRAPH_ENDPOINT, PROTOCOL } from "./constants"
import { cache } from "react"
import { url } from "inspector"

// export const client = new GraphQLClient(GRAPH_ENDPOINT, {
//   fetch: cache(async (url, params) =>
//     fetch(url, { ...params, next: { revalidate: 10 } }),
//   ),
//   cache: "no-store",
// })

const createGraphQLClient = (token?: string | null): GraphQLClient => {
  const headers = token ? { Authorization: `JWT ${token}` } : {}

  return new GraphQLClient(GRAPH_ENDPOINT, {
    credentials: "include",
    headers: headers as any,
    next: { revalidate: 1 },
    cache: "no-store",
  })
}

export default createGraphQLClient
