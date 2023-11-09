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

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjk5NDIwNDYxLCJvcmlnSWF0IjoxNjk5NDIwMTYxfQ._eD7jvWIDWOdIp-7whTCakyFVJLjYP734MQkDs4PRVY"

export const client = new GraphQLClient(GRAPH_ENDPOINT, {
  credentials: "include",
  headers: {
    Authorization: `JWT ${token}`,
  },
  next: { revalidate: 1 },
  cache: "no-store",
})
