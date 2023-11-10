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
import { client } from "@/lib/requestClient"

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
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createQuestion(values.title, values.description)
    router.push("/")
  }

  async function createQuestion(title: string, description: string) {
    try {
      const response = await client.request(CreateQuestionDocument, {
        title,
        description,
      })
      return response
    } catch (error) {
      console.error("GraphQL Request Error:", error)
      throw error
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
