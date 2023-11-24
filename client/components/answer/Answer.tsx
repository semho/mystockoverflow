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
  DeleteAnswerDocument,
  GetAnswersByQuestionQuery,
} from "@/generates/gql/graphql"
import { DialogBox } from "../DialogBox"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import useDialogButtonStore from "@/store/dialog"
import {
  DeleteAnswerResponse,
  GraphQLResponseError,
} from "@/interfaces/rersponse"
import { useRouter } from "next/navigation"
import createGraphQLClient from "@/lib/requestClient"
import { AnswerFormUpdate } from "./AnswerFormUpdate"

type Props = {
  index: number
  answer: NonNullable<GetAnswersByQuestionQuery["answersByQuestion"]>[number]
  onSubmitSuccess: () => void
  updateAnswer: () => void
}

export default function Answer({
  index,
  answer,
  onSubmitSuccess,
  updateAnswer,
}: Props) {
  const [isAuthState, setIsAuthState] = useState(false)
  const [username, setUserName] = useState("")
  const [error, setError] = useState("")
  const session = useSession()
  const router = useRouter()
  const dialog1 = `dialog1-comment-${answer!.id}`
  const dialog2 = `dialog2-comment-${answer!.id}`
  const setDialogOpen = useDialogButtonStore((state) => state.setDialogOpen)

  // состояние кнопки submit в стор диалогово окна dialog2(удаление)
  const [isSubmitButtonClicked, setSubmitButtonClicked] = useDialogButtonStore(
    (state) => [
      state.isSubmitButtonClicked[dialog2],
      state.setSubmitButtonClicked,
    ],
  )

  const deleteAnswer = async (id: number) => {
    try {
      const token = session.data?.user.tokenAuth.token
      if (!token) {
        throw new Error(
          "Отсутствует токен пользователя или закончился его срок действия. Авторизуйтесь повторно",
        )
      }

      const response: DeleteAnswerResponse = await createGraphQLClient(
        token,
      ).request(DeleteAnswerDocument, {
        answerId: id.toString(),
      })

      if (response?.deleteAnswer?.answer === null) {
        onSubmitSuccess()
        router.refresh
      } else {
        throw new Error("Не удалось удалить запись из БД")
      }
    } catch (error: Error | any) {
      if (error.response?.errors) {
        // Обработка ошибок GraphQL
        const graphqlErrors: GraphQLResponseError = {
          errors: error.response.errors,
        }
        const errorGql = graphqlErrors.errors[0].message
        setError("Ошибка выполнения GraphQL запроса: " + errorGql)
      } else {
        setError(error)
      }
    }
  }

  useEffect(() => {
    if (session.data) {
      setUserName(session.data.user.tokenAuth.payload.username)
      setIsAuthState(true)
    }
    //записываем начальное состояние модальных окон в стор
    setDialogOpen(dialog1, false)
    setDialogOpen(dialog2, false)

    if (isSubmitButtonClicked && answer) {
      deleteAnswer(Number(answer.id))
      setSubmitButtonClicked(dialog2, false)
    }
  }, [session, isSubmitButtonClicked])

  return (
    <Card className="mb-2">
      {error && <div className="text-red-500 text-xs">{error}</div>}
      <CardHeader className="p-4">
        {answer?.id && (
          <CardTitle className="text-xl">Ответ {index + 1}</CardTitle>
        )}
        <CardDescription>
          {new Date(answer?.timestamp).toLocaleDateString("ru-RU")}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">{answer?.id && answer?.answer}</CardContent>
      <CardFooter className="px-4 pb-4 justify-between">
        <div>Автор: {answer?.postedBy.username}</div>
        <div>
          {answer && isAuthState && username == answer?.postedBy.username && (
            <DialogBox
              value="Редактирование"
              title="Редактирование ответа"
              description="Подтвердите изменения после их добавления"
              dialogId={dialog1}
            >
              <AnswerFormUpdate
                id={answer?.id}
                comment={answer.answer}
                dialogId={dialog1}
                updateAnswersList={updateAnswer}
              />
            </DialogBox>
          )}
          {isAuthState && username == answer?.postedBy.username && (
            <DialogBox
              value="Удалить"
              title="Удалить ответ"
              description="Вы действительно хотите удалить Ваш комментарий?"
              valueSubmit="Удалить"
              buttonVarian={"destructive"}
              dialogId={dialog2}
            >
              {" "}
            </DialogBox>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
