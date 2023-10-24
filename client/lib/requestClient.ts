import { GraphQLClient } from "graphql-request"
import { BACKEND_SITE, GRAPH_ENDPOINT, PROTOCOL } from "./constants"

//cache
// export const client = new GraphQLClient(GRAPH_ENDPOINT, { fetch })
export const client = new GraphQLClient(GRAPH_ENDPOINT, {
  headers: {
    Origin: `${PROTOCOL}://${BACKEND_SITE}`,
  },
  credentials: "include",
})
