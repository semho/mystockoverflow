import { GetQuestionsDocument } from "@/generates/gql/graphql"
import { client } from "@/lib/requestClient"
import Question from "./Question"
import { Dialog } from "./Dialog"

async function getQuestions() {
  return await client.request(GetQuestionsDocument)
}

export default async function QuestionsList() {
  const { questions } = await getQuestions()
  return (
    <div>
      <Dialog />
      {questions?.map((question) => (
        <div key={question?.id}>
          <Question question={question} />
        </div>
      ))}
    </div>
  )
}
