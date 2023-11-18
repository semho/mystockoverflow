export interface GraphQLResponseError {
  errors: {
    message: string
    locations: {
      line: number
      column: number
    }[]
    path: string[]
  }[]
}

export interface DeleteQuestionResponse {
  deleteQuestion?: {
    question?: {
      id: string
    } | null
    errors?:
      | {
          message: string
          locations: {
            line: number
            column: number
          }[]
          path: string[]
        }[]
      | undefined
  } | null
}
