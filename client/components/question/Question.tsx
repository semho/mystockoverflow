"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  GetQuestionsByCurrentUserQuery,
  GetQuestionsQuery,
} from "@/generates/gql/graphql"
import Link from "next/link"

type Props = {
  question:
    | NonNullable<GetQuestionsQuery["questions"]>[number]
    | NonNullable<
        GetQuestionsByCurrentUserQuery["questionsByCurrentUser"]
      >[number]
}

function isGetQuestionsQuery(
  question: any,
): question is NonNullable<GetQuestionsQuery["questions"]>[number] {
  return question && "description" in question
}

export default function Question({ question }: Props) {
  return (
    <Card className="mb-5">
      <CardHeader>
        {question?.id && (
          <CardTitle>
            <Link href={`question/${question?.id}`}>{question?.title}</Link>
          </CardTitle>
        )}
        <CardDescription>
          {new Date(question?.timestamp).toLocaleDateString("ru-RU")}
        </CardDescription>
      </CardHeader>

      {isGetQuestionsQuery(question) && question && (
        <CardContent>
          <p>{question.description}</p>
        </CardContent>
      )}
      {isGetQuestionsQuery(question) && question && (
        <CardFooter>
          <p>Автор: {question?.createdBy.username}</p>
        </CardFooter>
      )}
    </Card>
  )
}
