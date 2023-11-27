"use client"

import {
  GetQuestionsDocument,
  GetQuestionsQuery,
} from "@/generates/gql/graphql"
import createGraphQLClient from "@/lib/requestClient"
import Question from "./Question"
import { useEffect } from "react"
import { useQuestionsStore } from "@/store/questions"

export async function getQuestions(): Promise<GetQuestionsQuery["questions"]> {
  const response = await createGraphQLClient().request(GetQuestionsDocument)

  return response.questions
}

export default function QuestionsList({
  initialData,
}: {
  initialData: GetQuestionsQuery["questions"]
}) {
  const { list, setList } = useQuestionsStore()

  useEffect(() => {
    if (initialData) {
      setList(initialData)
    } else {
      const fetchData = async () => {
        const questions = await getQuestions()
        if (questions) {
          setList(questions)
        }
      }

      fetchData()
    }
  }, [initialData])

  return (
    <div>
      {list?.map((question) => (
        <div key={question?.id}>
          <Question question={question} />
        </div>
      ))}
    </div>
  )
}
