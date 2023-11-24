"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { CreateQuestionDocument } from "@/generates/gql/graphql"
import createGraphQLClient from "@/lib/requestClient"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useQuestionsStore } from "@/store/questions"
import { getQuestions } from "./QuestionsList"

const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Заголовок должен содержать минимум 5 символов",
    })
    .max(200, {
      message: "Заголовок должен содержать максимум 200 символов",
    }),
  description: z.string(),
})

export function QuestionForm() {
  const [error, setError] = useState("")
  const router = useRouter()
  const session = useSession()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const { setList } = useQuestionsStore()
  const fetchDataAndUpdate = async () => {
    const newQuestions = await getQuestions()
    setList(newQuestions)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await createQuestion(values.title, values.description)
    if (res) {
      fetchDataAndUpdate()
      router.push("/")
    }
  }

  async function createQuestion(title: string, description: string) {
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
        CreateQuestionDocument,
        {
          title,
          description,
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && <div className="text-red-500 text-xs ">{error}</div>}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Заголовок</FormLabel>
              <FormControl>
                <Input placeholder="Почему ..." {...field} />
              </FormControl>
              <FormDescription>Задайте ваш вопрос тут</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Подробное описание"
                  {...field}
                  rows={10}
                />
              </FormControl>
              <FormDescription>
                Опишите подробно ваш вопрос в этой textarea
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Задать вопрос</Button>
      </form>
    </Form>
  )
}
