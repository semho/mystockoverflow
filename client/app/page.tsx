import QuestionsList from "@/components/question/QuestionsList"
import { GetQuestionsDocument } from "@/generates/gql/graphql"
import createGraphQLClient from "@/lib/requestClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Список вопросов",
  description: "Список актуальных вопросов с ответами",
}

async function getQuestions() {
  return await createGraphQLClient().request(GetQuestionsDocument)
}
export default async function Home() {
  const { questions } = await getQuestions()
  return <QuestionsList initialData={questions} />
}
