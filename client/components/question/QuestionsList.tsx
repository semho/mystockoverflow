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

export default function QuestionsList() {
  const { list, setList } = useQuestionsStore()

  const fetchData = async () => {
    const questions = await getQuestions()
    if (questions) {
      setList(questions)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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
