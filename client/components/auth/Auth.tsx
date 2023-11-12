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
import { client } from "@/lib/requestClient"
import { TokenAuthDocument } from "@/generates/gql/graphql"
import useUserStore from "@/store/user"

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

async function getToken(login: string, password: string) {
  try {
    const response = await client.request(TokenAuthDocument, {
      password,
      login,
    })
    return response
  } catch (error) {
    console.error("GraphQL Request Error:", error)
    throw error
  }
}

async function onSubmit(values: z.infer<typeof formSchema>) {
  formSchema.parse({ login: values.login, pass: values.pass })

  const res = await getToken(values.login, values.pass)

  res &&
    useUserStore.setState({
      token: res.tokenAuth?.token,
      user: res.tokenAuth?.payload,
    })
}

export default function Auth() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      pass: "",
    },
  })

  return (
    <CardBox
      title="Авторизация"
      description="Для входа введите Ваш логин-пароль"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login</FormLabel>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Войти</Button>
        </form>
      </Form>
    </CardBox>
  )
}
