import {
  GetQuestionDocument,
  GetQuestionsDocument,
} from "@/generates/gql/graphql"
import { client } from "@/lib/requestClient"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import type { Metadata } from "next"

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

//TODO: для работы SSG: предварительная генерация страници через build -> start. Не будет ходить за информацией в БД, т.к. это будет уже ста
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

  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle>{question?.title}</CardTitle>
        <CardDescription>
          Автор: {question?.createdBy.username} от{" "}
          {new Date(question?.timestamp).toLocaleDateString("ru-RU")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{question?.description}</p>
      </CardContent>
    </Card>
  )
}
