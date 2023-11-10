import QuestionsList from "@/components/question/QuestionsList"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Список вопросов",
  description: "Список актуальных вопросов с ответами",
}
export default async function Home() {
  return <QuestionsList />
}
