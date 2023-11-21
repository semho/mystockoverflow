"use client"

import { useEffect, useState } from "react"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import useDialogButtonStore from "@/store/dialog"
import { ZodError, z } from "zod"
import createGraphQLClient from "@/lib/requestClient"
import { UpdateAnswerDocument } from "@/generates/gql/graphql"
import { useRouter } from "next/navigation"
import useUserStore from "@/store/user"
import { useSession } from "next-auth/react"
import { GraphQLResponseError } from "@/interfaces/rersponse"
type FormProps = {
  id: string
  comment: string
  dialogId: string
  updateAnswersList: () => void
}

const formSchema = z.object({
  comment: z
    .string()
    .min(5, "Коментарий должен содержать минимум 5 символов")
    .max(200, "Коментарий должен содержать максимум 300 символов"),
  id: z.string().transform((value) => Number(value)),
})

async function updateAnswer(answerId: string, comment: string, token: string) {
  try {
    const response = await createGraphQLClient(token).request(
      UpdateAnswerDocument,
      {
        answerId,
        text: comment,
      },
    )
    return response
  } catch (error) {
    console.error("GraphQL Request Error:", error)
    throw error
  }
}

export const AnswerFormUpdate: React.FC<FormProps> = ({
  id,
  comment,
  dialogId,
  updateAnswersList,
}) => {
  const [textareaValue, setTextareaValue] = useState(comment)
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
        id: id,
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

      await updateAnswer(id.toString(), textareaValue, token)
      updateAnswersList()
      setDialogOpen(dialogId, false)

      // await createGraphQLClient().request(GetQuestionDocument, {
      //   id: Number(id),
      // })

      router.refresh

      //сбрасываем ошибки

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
    if (isSubmitButtonClicked) {
      handleSubmit()
      //сбрасываем состояние кнопки
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
          Описание
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
