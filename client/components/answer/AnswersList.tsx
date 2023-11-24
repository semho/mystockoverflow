"use client"

import {
  GetAnswersByQuestionDocument,
  GetAnswersByQuestionQuery,
} from "@/generates/gql/graphql"
import createGraphQLClient from "@/lib/requestClient"
import Answer from "./Answer"
import { AnswerForm } from "./AnswerForm"
import { useEffect, useState } from "react"
type Props = {
  questionId: number
}

async function getAnswers(
  id: number,
): Promise<GetAnswersByQuestionQuery["answersByQuestion"]> {
  const response = await createGraphQLClient().request(
    GetAnswersByQuestionDocument,
    { id },
  )
  return response.answersByQuestion
}

export default function AnswersList({ questionId }: Props) {
  const [list, setList] = useState<
    GetAnswersByQuestionQuery["answersByQuestion"]
  >([])

  const fetchData = async () => {
    const answersByQuestion = await getAnswers(Number(questionId))
    if (answersByQuestion) {
      setList(answersByQuestion)
    }
  }

  useEffect(() => {
    fetchData()
  }, [questionId])

  const handleAnswerFormSubmit = () => {
    fetchData()
  }

  const updateAnswer = () => {
    fetchData()
  }

  return (
    <>
      <AnswerForm
        questionId={questionId}
        onSubmitSuccess={handleAnswerFormSubmit}
      />
      <div className="p-5">
        {list && list?.length > 0 ? (
          list?.map((answer, index) => (
            <div key={answer?.id}>
              <Answer
                index={index}
                answer={answer}
                onSubmitSuccess={handleAnswerFormSubmit}
                updateAnswer={updateAnswer}
              />
            </div>
          ))
        ) : (
          <div>Ответов еще нет</div>
        )}
      </div>
    </>
  )
}
