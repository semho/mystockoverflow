"use client"

import {
  GetQuestionsByCurrentUserDocument,
  GetQuestionsByCurrentUserQuery,
  GetQuestionsByCurrentUserQueryVariables,
  GetQuestionsWithAnswersByUserDocument,
  GetQuestionsWithAnswersByUserQuery,
} from "@/generates/gql/graphql"
import createGraphQLClient from "@/lib/requestClient"
import Question from "./Question"
import { useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { DEFAULT_TAKE } from "@/lib/constants"
import { Pagination } from "../Pagination"
import { DocumentNode } from "graphql"
type Props = {
  isQuestions?: boolean
}
interface IPagination {
  currentPage: number
  pageCount: number
  totalCount?: number
}

type TQuery =
  | typeof GetQuestionsByCurrentUserDocument
  | typeof GetQuestionsWithAnswersByUserDocument
type GetQuestionsByCurrentUserQueryMutate = GetQuestionsByCurrentUserQuery & {
  [key: string]: any
}
type GetQuestionsWithAnswersByUserQueryMutate =
  GetQuestionsWithAnswersByUserQuery & {
    [key: string]: any
  }
type TQueryMutate =
  | GetQuestionsByCurrentUserQueryMutate
  | GetQuestionsWithAnswersByUserQueryMutate

export default function QuestionsMyList({ isQuestions = true }: Props) {
  const [loading, setLoading] = useState(false)
  const [listQ, setListQ] = useState<
    ({
      __typename?: "QuestionType" | undefined
      id: string
      title: string
      timestamp: any
    } | null)[]
  >([])
  const [paginationQ, setPaginationQ] = useState<IPagination>({
    currentPage: 1,
    pageCount: 1,
    totalCount: 0,
  })

  const [error, setError] = useState("")
  const session = useSession()
  const token = session.data?.user.tokenAuth.token

  const fetchData = async (query: TQuery, dataKey: string) => {
    const response = await createGraphQLClient(token).request<TQueryMutate>(
      query,
      {
        first: DEFAULT_TAKE,
        skip: (paginationQ.currentPage - 1) * DEFAULT_TAKE,
      },
    )

    const newData = response[dataKey]
    if (newData) {
      setListQ(newData)
      setPaginationQ((prev) => ({
        ...prev,
        currentPage: response.pagination?.currentPage || 1,
        pageCount: response.pagination?.pageCount || 1,
        totalCount: response.pagination?.totalCount || 0,
      }))
    }
  }

  const fetchDataQuestions = async () => {
    await fetchData(GetQuestionsByCurrentUserDocument, "questionsByCurrentUser")
  }

  const fetchDataQuestionsWithAnswers = async () => {
    await fetchData(
      GetQuestionsWithAnswersByUserDocument,
      "questionsWithAnswersByUser",
    )
  }

  const currentFetchData = isQuestions
    ? fetchDataQuestions
    : fetchDataQuestionsWithAnswers

  const handlePageChange = useCallback((newPage: number) => {
    setPaginationQ((prev) => ({ ...prev, currentPage: newPage }))
  }, [])

  useEffect(() => {
    currentFetchData()
  }, [token, paginationQ.currentPage])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      {error && <div className="text-red-500 text-xs ">{error}</div>}
      {listQ?.map((question) => (
        <div key={question?.id}>
          <Question question={question} />
        </div>
      ))}
      {!loading && paginationQ.pageCount > 1 && (
        <Pagination
          currentPage={paginationQ.currentPage}
          pageCount={paginationQ.pageCount}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  )
}
