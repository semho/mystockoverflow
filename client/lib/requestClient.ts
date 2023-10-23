import { GraphQLClient } from "graphql-request"
import { GRAPH_ENDPOINT } from "./constants"

//cache
// export const client = new GraphQLClient(GRAPH_ENDPOINT, { fetch })
export const client = new GraphQLClient(GRAPH_ENDPOINT)
