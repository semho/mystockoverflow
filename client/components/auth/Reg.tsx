"use client"

import { Input } from "../ui/input"
import { CardBox } from "../CardBox"
import { Button } from "../ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { CreateUserDocument } from "@/generates/gql/graphql"
import createGraphQLClient from "@/lib/requestClient"
import { useRouter, useSearchParams } from "next/navigation"

const formSchema = z
  .object({
    login: z
      .string()
      .min(5, {
        message: "Логин должен содержать минимум 5 символов",
      })
      .max(20, {
        message: "Логин должен содержать максимум 20 символов",
      }),
    email: z
      .string()
      .email()
      .min(5, { message: "Email должен содержать минимум 5 символов" }),
    pass: z.string().min(5, {
      message: "Пароль должен содержать минимум 5 символов",
    }),
    repeatPass: z.string().min(5, {
      message: "Повтор пароля должен содержать минимум 5 символов",
    }),
  })
  .refine((data) => {
    const { pass, repeatPass } = data
    if (repeatPass && repeatPass.length >= 5 && pass !== repeatPass) {
      const error: any = new Error("Пароли не совпадают")
      error.errors = [
        {
          message: "Пароли не совпадают",
          path: ["repeatPass"],
          code: "custom",
        },
      ]
      throw error
    }
    return true
  })

export default function Reg() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      email: "",
      pass: "",
      repeatPass: "",
    },
  })

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  async function onSubmit(values: z.infer<typeof formSchema>) {
    formSchema.parse({
      login: values.login,
      email: values.email,
      pass: values.pass,
      repeatPass: values.repeatPass,
    })

    setLoading(true)
    try {
      const response = await createGraphQLClient().request(CreateUserDocument, {
        password: values.pass,
        username: values.login,
        email: values.email,
      })

      setLoading(false)
      if (!response.createUser?.user?.id) {
        setError("Не удалось зарегистрироваться")
        return
      }

      const res = await signIn("credentials", {
        redirect: false,
        username: values.login,
        password: values.pass,
        callbackUrl,
      })

      if (!res?.error) {
        router.push(callbackUrl)
      }
    } catch (error: any) {
      setLoading(false)
      for (const currentError of error.response.errors) {
        if (
          currentError.message ===
          "UNIQUE constraint failed: auth_user.username"
        ) {
          setError("Пользователь с таким именем уже зарегистрирован")
        } else {
          setError(currentError.message)
        }
      }
    }
  }

  return (
    <CardBox
      title="Регистрация"
      description="Для регистрации требуется придумать логин-пароль"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="duarte@gmail.com" {...field} />
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
          <FormField
            control={form.control}
            name="repeatPass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Подтвердите пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "загрузка..." : "Зарегистрироваться"}
          </Button>
        </form>
      </Form>
    </CardBox>
  )
}
