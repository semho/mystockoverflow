import QuestionsList from "@/components/QuestionsList"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Задать вопрос",
  description: "Форма для создания вопроса",
}
export default async function Home() {
  return <>Форма с вопросом</>
}
