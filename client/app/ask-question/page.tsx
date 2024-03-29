import { QuestionForm } from "@/components/question/QuestionForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Задать вопрос",
  description: "Форма для создания вопроса",
}
export default async function Page() {
  return <QuestionForm />
}
