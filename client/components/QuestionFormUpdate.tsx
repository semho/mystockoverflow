"use client"

import { useEffect, useReducer, useState } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import useDialogButtonStore from "@/store/dialog"
import { ZodError, z } from "zod"
import { client } from "@/lib/requestClient"
import {
  GetQuestionDocument,
  UpdateQuestionDocument,
} from "@/generates/gql/graphql"
import { useRouter } from "next/navigation"
type FormProps = {
  id: number
  title: string
  description: string
  onUpdateSuccess: (newTitle: string, newDescription: string) => Promise<void>
}

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Заголовок должен содержать минимум 5 символов")
    .max(200, "Заголовок должен содержать максимум 200 символов"),
  description: z
    .string()
    .max(500, "Опиисание должно содержать максимум 500 символов"),
  id: z.string().transform((value) => Number(value)),
})

async function updateQuestion(
  questionId: string,
  title: string,
  description: string,
) {
  try {
    const response = await client.request(UpdateQuestionDocument, {
      questionId,
      title,
      description,
    })
    return response
  } catch (error) {
    console.error("GraphQL Request Error:", error)
    throw error
  }
}

export const QuestionFormUpdate: React.FC<FormProps> = ({
  id,
  title,
  description,
  onUpdateSuccess,
}) => {
  const [inputValue, setInputValue] = useState(title)
  const [textareaValue, setTextareaValue] = useState(description)
  const [inputError, setInputError] = useState("")
  const [textareaError, setTextareaError] = useState("")
  const [IDError, setIDError] = useState("")

  const [isSubmitButtonClicked, setSubmitButtonClicked, setDialogOpen] =
    useDialogButtonStore((state) => [
      state.isSubmitButtonClicked,
      state.setSubmitButtonClicked,
      state.setDialogOpen,
    ])

  const router = useRouter()

  const handleSubmit = async () => {
    try {
      formSchema.parse({
        id: id,
        title: inputValue,
        description: textareaValue,
      })
      //после валидации отправляем запрос на обновление вопроса
      await updateQuestion(id.toString(), inputValue, textareaValue)
      setDialogOpen(false)
      await client.request(GetQuestionDocument, {
        id: Number(id),
      })
      router.refresh
      onUpdateSuccess(inputValue, textareaValue)
      //сбрасываем ошибки
      setInputError("")
      setTextareaError("")
      setIDError("")
    } catch (error) {
      if (error instanceof ZodError) {
        // console.error("Ошибки валидации:", error.errors)
        error.errors.forEach((err) => {
          if (err.path[0] === "title") {
            setInputError(err.message)
          }
          if (err.path[0] === "description") {
            setTextareaError(err.message)
          }
          if (err.path[0] === "id") {
            setIDError("ID не соответствует требованиям")
          }
        })
      }
    }
  }

  useEffect(() => {
    if (isSubmitButtonClicked) {
      handleSubmit()
      //сбрасываем состояние кнопки
      setSubmitButtonClicked(false)
    }
  }, [isSubmitButtonClicked, inputValue, textareaValue])

  return (
    <form>
      <div className="space-y-2">
        {IDError && <div className="text-red-500">{IDError}</div>}
        <Label
          htmlFor="name"
          className={`text-right ${inputError ? "text-red-500 " : ""}`}
        >
          Заголовок
        </Label>
        <Input
          id="name"
          defaultValue={inputValue}
          className="col-span-3"
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputError && <div className="text-red-500 text-xs">{inputError}</div>}
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="username"
          className={`text-right ${textareaError ? "text-red-500 " : ""}`}
        >
          Описание
        </Label>
        <Textarea
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
