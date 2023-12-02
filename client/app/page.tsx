import { Search } from "@/components/Search"
import QuestionsList from "@/components/question/QuestionsList"
import {
  GetQuestionsByCurrentUserDocument,
  GetQuestionsDocument,
} from "@/generates/gql/graphql"
import { DEFAULT_SKIP, DEFAULT_TAKE } from "@/lib/constants"
import createGraphQLClient from "@/lib/requestClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Список вопросов",
  description: "Список актуальных вопросов с ответами",
}

async function getQuestions() {
  return await createGraphQLClient().request(GetQuestionsDocument, {
    first: DEFAULT_TAKE,
    skip: DEFAULT_SKIP,
  })
}
export default async function Home() {
  const { questions, pagination } = await getQuestions()
  return (
    <>
      <Search />
      <QuestionsList initialData={questions} initialPagination={pagination} />
    </>
  )
}
