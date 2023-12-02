import QuestionTabs from "@/components/question/QuestionTabs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Моя активность",
  description: "Вопросы с моей активностью",
}
export default async function Page() {
  return <QuestionTabs />
}
