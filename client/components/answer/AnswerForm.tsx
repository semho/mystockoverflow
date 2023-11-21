"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Textarea } from "../ui/textarea"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import createGraphQLClient from "@/lib/requestClient"
import { CreateAnswerDocument } from "@/generates/gql/graphql"

type Props = {
  questionId: number
  onSubmitSuccess: () => void
}

const formSchema = z.object({
  comment: z
    .string()
    .min(5, {
      message: "Коментарий должен содержать минимум 5 символов",
    })
    .max(300, {
      message: "Коментарий должен быть не более 300 символов",
    }),
})

export function AnswerForm({ questionId, onSubmitSuccess }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const session = useSession()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  })

  const toggleExpansion = () => {
    setIsExpanded((prev) => !prev)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createAnswer(values.comment, questionId)
    onSubmitSuccess()
    form.reset()
    router.refresh
  }

  async function createAnswer(comment: string, questionId: number) {
    try {
      const token = session.data?.user.tokenAuth.token
      if (!token) {
        const tokenError = new z.ZodError([
          {
            code: "custom",
            path: ["token"],
            message:
              "Отсутствует токен пользователя или закончился его срок действия. Авторизуйтесь повторно",
          },
        ])
        throw tokenError
      }

      const response = await createGraphQLClient(token).request(
        CreateAnswerDocument,
        {
          comment,
          questionId: questionId.toString(),
        },
      )
      setError("")
      return response
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          if (err.path[0] === "token") {
            setError(err.message)
          }
        })
      }
    }
  }

  const contentStyles = {
    maxHeight: isExpanded ? "1000px" : "0",
    overflow: "hidden",
    transition: "max-height 0.3s ease-in-out",
  }

  return (
    <div>
      <span className="text-xl mr-4">Комментарии</span>
      <Button
        onClick={toggleExpansion}
        variant={isExpanded ? "outline" : "default"}
      >
        {isExpanded ? "Скрыть форму комментарий" : "Оставить комментарий"}
      </Button>
      <div className="content" style={contentStyles}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-0 px-2"
          >
            {error && <div className="text-red-500 text-xs ">{error}</div>}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Комментарий</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} />
                  </FormControl>
                  <FormDescription>Оставте ваш комментарий тут</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <Button type="submit">Опубликовать комментарий</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
