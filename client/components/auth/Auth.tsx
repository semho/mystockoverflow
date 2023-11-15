"use client"

import { Input } from "../ui/input"
import { CardBox } from "../CardBox"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { signIn } from "next-auth/react"

const formSchema = z.object({
  login: z
    .string()
    .min(5, {
      message: "Логин должен содержать минимум 5 символов",
    })
    .max(20, {
      message: "Логин должен содержать максимум 20 символов",
    }),
  pass: z.string().min(5, {
    message: "Пароль должен содержать минимум 5 символов",
  }),
})

export default function Auth() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      pass: "",
    },
  })

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      formSchema.parse({ login: values.login, pass: values.pass })

      const res = await signIn("credentials", {
        redirect: false,
        username: values.login,
        password: values.pass,
        callbackUrl,
      })
      setLoading(false)

      if (!res?.error) {
        router.push(callbackUrl)
      } else {
        setError("Неверный логин или пароль")
      }
    } catch (error: any) {
      setLoading(false)
      setError(error)
    }
  }

  return (
    <CardBox
      title="Авторизация"
      description="Для входа введите Ваш логин-пароль"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {error && (
            <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
          )}
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Логин</FormLabel>
                <FormControl>
                  <Input placeholder="Pedro Duarte" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "загрузка..." : "Войти"}
          </Button>
        </form>
      </Form>
    </CardBox>
  )
}
