import { GetQuestionsDocument } from "@/generates/gql/graphql"
import { client } from "@/lib/requestClient"
import Question from "./Question"

async function getQuestions() {
  return await client.request(GetQuestionsDocument)
}

export default async function QuestionsList() {
  const { questions } = await getQuestions()
  return (
    <div>
      {questions?.map((question) => (
        <div key={question?.id}>
          <Question question={question} />
        </div>
      ))}
    </div>
  )
}
