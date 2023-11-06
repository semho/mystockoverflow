import { GetQuestionDocument } from "@/generates/gql/graphql"
import { client } from "@/lib/requestClient"
import type { Metadata } from "next"
import QuestionDetail from "@/components/QuestionDetail"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id
  const question = await getQuestion(Number(id))

  return {
    title: question?.title,
  }
}

async function getQuestion(id: number) {
  const { singleQuestion } = await client.request(GetQuestionDocument, {
    id: Number(id),
  })

  return singleQuestion
}

//TODO: для работы SSG: предварительная генерация страницы через build -> start. Не будет ходить за информацией в БД, т.к. это будет уже ста
// export async function generateStaticParams() {
//   const { questions } = await client.request(GetQuestionsDocument)
//   if (!questions) {
//     return []
//   }

//   return questions.map((question) => ({ id: question?.id }))
// }

export default async function Page({
  params: { id },
}: {
  params: { id: number }
}) {
  const question = await getQuestion(id)

  if (!question) {
    return <div>Вопрос не найден</div>
  }

  return <QuestionDetail question={question} id={id} />
}
