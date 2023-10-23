import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GetQuestionsQuery } from "@/generates/gql/graphql"
import Link from "next/link"

type Props = {
  question: NonNullable<GetQuestionsQuery["questions"]>[number]
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
      <CardContent>
        <p>{question?.description}</p>
      </CardContent>
      <CardFooter>
        <p>Автор: {question?.createdBy.username}</p>
      </CardFooter>
    </Card>
  )
}
