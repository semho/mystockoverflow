import { CodegenConfig } from "@graphql-codegen/cli"
import { GRAPH_ENDPOINT } from "./lib/constants"

const config: CodegenConfig = {
  schema: GRAPH_ENDPOINT,
  documents: ["documents/**/*.graphql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "generates/gql/": {
      preset: "client",
    },
  },
}

export default config
