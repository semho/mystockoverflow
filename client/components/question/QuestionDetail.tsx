"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GetQuestionQuery } from "@/generates/gql/graphql"
import { DialogBox } from "../DialogBox"
import { QuestionFormUpdate } from "./QuestionFormUpdate"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"

type Props = {
  question: NonNullable<GetQuestionQuery["singleQuestion"]>
  id: number
}

export default function QuestionDetail({ question, id }: Props) {
  const [updatedTitle, setUpdatedTitle] = useState(question?.title)
  const [updatedDescription, setUpdatedDescription] = useState(
    question?.description,
  )

  const handleUpdateQuestion = async (
    newTitle: string,
    newDescription: string,
  ) => {
    setUpdatedTitle(newTitle)
    setUpdatedDescription(newDescription)
  }

  useEffect(() => {
    if (question) {
      setUpdatedTitle(question.title)
      setUpdatedDescription(question.description)
    }
  }, [question])

  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle>{updatedTitle}</CardTitle>
        <CardDescription>
          <span className="mr-2">
            {" "}
            Автор: {question?.createdBy.username} от{" "}
            {new Date(question?.timestamp).toLocaleDateString("ru-RU")}
          </span>
          <DialogBox
            value="Редактирование"
            title="Редактирование вопроса"
            description="Подтвердите изменения после их добавления"
          >
            {question && (
              <QuestionFormUpdate
                id={id}
                title={question.title}
                description={question.description}
                onUpdateSuccess={handleUpdateQuestion}
              />
            )}
          </DialogBox>
          <Button type="button" variant={"destructive"}>
            Удалить
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{updatedDescription}</p>
      </CardContent>
    </Card>
  )
}
