"use client"

import {
  GetQuestionsDocument,
  GetQuestionsQuery,
} from "@/generates/gql/graphql"
import createGraphQLClient from "@/lib/requestClient"
import Question from "./Question"
import { useEffect, useState } from "react"
import { useQuestionsStore } from "@/store/questions"
import { Pagination } from "../Pagination"
import { DEFAULT_TAKE } from "@/lib/constants"

export default function QuestionsList({
  initialData,
  initialPagination,
}: {
  initialData: GetQuestionsQuery["questions"]
  initialPagination: GetQuestionsQuery["pagination"]
}) {
  const { list, setList } = useQuestionsStore()
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false,
    pageCount: 1,
  })

  useEffect(() => {
    if (initialData) {
      setList(initialData)
      setPagination((prev) => ({
        ...prev,
        currentPage: initialPagination?.currentPage || 1,
        totalCount: initialPagination?.totalCount || 0,
        hasNextPage: initialPagination?.hasNextPage || false,
        hasPrevPage: initialPagination?.hasPrevPage || false,
        pageCount: initialPagination?.pageCount || 1,
      }))
    } else {
      fetchData()
    }
  }, [initialData, initialPagination])

  const fetchData = async () => {
    setLoading(true)

    try {
      const response = await createGraphQLClient().request(
        GetQuestionsDocument,
        {
          first: DEFAULT_TAKE,
          skip: (pagination.currentPage - 1) * DEFAULT_TAKE,
        },
      )

      const newQuestions: GetQuestionsQuery["questions"] = response.questions
      const newPagination: GetQuestionsQuery["pagination"] = response.pagination

      setList(newQuestions)

      if (newPagination) {
        setPagination((prev) => ({
          ...prev,
          currentPage: newPagination.currentPage || 1,
          totalCount: newPagination.totalCount || 0,
          hasNextPage: newPagination.hasNextPage || false,
          asPrevPage: newPagination?.hasPrevPage || false,
          pageCount: newPagination.pageCount || 1,
        }))
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }))
  }

  useEffect(() => {
    fetchData()
  }, [pagination.currentPage])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      {list?.map((question) => (
        <div key={question?.id}>
          <Question question={question} />
        </div>
      ))}

      {!loading && pagination.pageCount > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          pageCount={pagination.pageCount}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  )
}
