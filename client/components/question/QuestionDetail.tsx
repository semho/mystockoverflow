"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DeleteQuestionDocument,
  GetQuestionQuery,
} from "@/generates/gql/graphql"
import { DialogBox } from "../DialogBox"
import { QuestionFormUpdate } from "./QuestionFormUpdate"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import useDialogButtonStore from "@/store/dialog"
import createGraphQLClient from "@/lib/requestClient"
import { useRouter } from "next/navigation"
import {
  DeleteQuestionResponse,
  GraphQLResponseError,
} from "@/interfaces/rersponse"
import { useQuestionsStore } from "@/store/questions"
import { getQuestions } from "./QuestionsList"

type Props = {
  question: NonNullable<GetQuestionQuery["singleQuestion"]>
  id: number
}

export default function QuestionDetail({ question, id }: Props) {
  const [updatedTitle, setUpdatedTitle] = useState(question?.title)
  const [updatedDescription, setUpdatedDescription] = useState(
    question?.description,
  )
  const [isAuthState, setIsAuthState] = useState(false)
  const [username, setUserName] = useState("")
  const [error, setError] = useState("")
  const session = useSession()
  const router = useRouter()
  //для работы 2 модальных окон на одной странице потребовалось в сторе их обозначить
  const dialog1 = "dialog1"
  const dialog2 = "dialog2"
  const setDialogOpen = useDialogButtonStore((state) => state.setDialogOpen)

  // состояние кнопки submit в стор диалогово окна dialog2(удаление)
  const [isSubmitButtonClicked, setSubmitButtonClicked] = useDialogButtonStore(
    (state) => [
      state.isSubmitButtonClicked[dialog2],
      state.setSubmitButtonClicked,
    ],
  )

  const { setList } = useQuestionsStore()
  const fetchDataAndUpdate = async () => {
    const newQuestions = await getQuestions()
    setList(newQuestions)
  }

  const handleUpdateQuestion = async (
    newTitle: string,
    newDescription: string,
  ) => {
    setUpdatedTitle(newTitle)
    setUpdatedDescription(newDescription)
    fetchDataAndUpdate()
  }

  const deleteQuestion = async (id: number) => {
    try {
      const token = session.data?.user.tokenAuth.token
      if (!token) {
        throw new Error(
          "Отсутствует токен пользователя или закончился его срок действия. Авторизуйтесь повторно",
        )
      }

      const response: DeleteQuestionResponse = await createGraphQLClient(
        token,
      ).request(DeleteQuestionDocument, {
        questionId: id.toString(),
      })

      if (response?.deleteQuestion?.question === null) {
        router.push("/")
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
    if (question) {
      setUpdatedTitle(question.title)
      setUpdatedDescription(question.description)
      if (session.data) {
        setUserName(session.data.user.tokenAuth.payload.username)
        setIsAuthState(true)
      }
      //записываем начальное состояние модальных окон в стор
      setDialogOpen(dialog1, false)
      setDialogOpen(dialog2, false)

      if (isSubmitButtonClicked) {
        deleteQuestion(id)
        setSubmitButtonClicked(dialog2, false)
      }
    }
  }, [question, session, isSubmitButtonClicked])

  return (
    <>
      {error && <div className="text-red-500 text-xs">{error}</div>}
      <Card className="mb-5">
        <CardHeader>
          <CardTitle>{updatedTitle}</CardTitle>
          <CardDescription>
            <span className="mr-2">
              {" "}
              Автор: {question?.createdBy.username} от{" "}
              {new Date(question?.timestamp).toLocaleDateString("ru-RU")}
            </span>
            {question &&
              isAuthState &&
              username == question?.createdBy.username && (
                <DialogBox
                  value="Редактирование"
                  title="Редактирование вопроса"
                  description="Подтвердите изменения после их добавления"
                  dialogId={dialog1}
                >
                  <QuestionFormUpdate
                    id={id}
                    title={question.title}
                    description={question.description}
                    onUpdateSuccess={handleUpdateQuestion}
                    dialogId={dialog1}
                  />
                </DialogBox>
              )}
            {isAuthState && username == question?.createdBy.username && (
              <DialogBox
                value="Удалить"
                title="Удалить вопроса"
                description="Вы действительно хотите удалить этот вопрос?"
                valueSubmit="Удалить"
                buttonVarian={"destructive"}
                dialogId={dialog2}
              >
                {" "}
              </DialogBox>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{updatedDescription}</p>
        </CardContent>
      </Card>
    </>
  )
}
