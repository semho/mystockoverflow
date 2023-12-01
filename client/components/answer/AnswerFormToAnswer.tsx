"use client"

import { useEffect, useState } from "react"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import useDialogButtonStore from "@/store/dialog"
import { ZodError, z } from "zod"
import createGraphQLClient from "@/lib/requestClient"
import { CreateAnswerToAnswerDocument } from "@/generates/gql/graphql"
import { useRouter } from "next/navigation"
import useUserStore from "@/store/user"
import { useSession } from "next-auth/react"
import { GraphQLResponseError } from "@/interfaces/rersponse"
import { AnswerType } from "./Answer"
type FormProps = {
  parrentId: string
  comment: AnswerType
  dialogId: string
  updateAnswersList: () => void
  questionId: number
}

const formSchema = z.object({
  comment: z
    .string()
    .min(5, "Коментарий должен содержать минимум 5 символов")
    .max(200, "Коментарий должен содержать максимум 300 символов"),
  id: z.string().transform((value) => Number(value)),
})

async function createAnswerToAnswer(
  parrentId: string,
  newValueComment: string,
  token: string,
  questionId: number,
  comment: AnswerType,
) {
  try {
    const response = await createGraphQLClient(token).request(
      CreateAnswerToAnswerDocument,
      {
        comment: newValueComment,
        parentAnswerId: parrentId.toString(),
        questionId: questionId.toString(),
        respondingAnswerId: comment.id.toString(),
      },
    )
    return response
  } catch (error) {
    console.error("GraphQL Request Error:", error)
    throw error
  }
}

export const AnswerFormToAnswer: React.FC<FormProps> = ({
  parrentId,
  comment,
  dialogId,
  updateAnswersList,
  questionId,
}) => {
  const [textareaValue, setTextareaValue] = useState("")
  const [textareaError, setTextareaError] = useState("")
  const [IDError, setIDError] = useState("")
  const [error, setError] = useState("")

  const [setDialogOpen] = useDialogButtonStore((state) => [state.setDialogOpen])

  const [isSubmitButtonClicked, setSubmitButtonClicked] = useDialogButtonStore(
    (state) => [
      state.isSubmitButtonClicked[dialogId],
      state.setSubmitButtonClicked,
    ],
  )

  const router = useRouter()
  const session = useSession()
  const handleSubmit = async () => {
    try {
      formSchema.parse({
        id: parrentId,
        comment: textareaValue,
      })
      const token = session.data?.user.tokenAuth.token
      if (!token) {
        const tokenError = new z.ZodError([
          {
            code: "custom",
            path: ["id"],
            message:
              "Отсутствует токен пользователя или закончился его срок действия. Авторизуйтесь повторно",
          },
        ])
        throw tokenError
      }

      await createAnswerToAnswer(
        parrentId.toString(),
        textareaValue,
        token,
        questionId,
        comment,
      )
      updateAnswersList()
      setDialogOpen(dialogId, false)
      router.refresh
      setTextareaError("")
      setIDError("")
    } catch (error: Error | any) {
      if (error instanceof ZodError) {
        error.errors.forEach((err) => {
          if (err.path[0] === "comment") {
            setTextareaError(err.message)
          }
          if (err.path[0] === "id") {
            if (err.code === "custom") {
              setIDError(err.message)
            } else {
              setIDError("ID не соответствует требованиям")
            }
          }
        })
      } else if (error.response?.errors) {
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
    if (isSubmitButtonClicked) {
      handleSubmit()
      setSubmitButtonClicked(dialogId, false)
    }
  }, [isSubmitButtonClicked, textareaValue, useUserStore])

  return (
    <form>
      <div className="space-y-2">
        {IDError && <div className="text-red-500 text-xs">{IDError}</div>}
        {error && <div className="text-red-500 text-xs">{error}</div>}
        <Label
          htmlFor="comment"
          className={`text-right ${textareaError ? "text-red-500 " : ""}`}
        >
          Оставьте свой комментарий
        </Label>
        <Textarea
          id="comment"
          rows={10}
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        />
        {textareaError && (
          <div className="text-red-500 text-xs">{textareaError}</div>
        )}
      </div>
    </form>
  )
}
