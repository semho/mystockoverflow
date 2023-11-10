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

const formSchema = z.object({
  login: z
    .string()
    .min(5, {
      message: "Логин должен содержать минимум 5 символов",
    })
    .max(20, {
      message: "Логин должен содержать максимум 20 символов",
    }),
  pass: z.string().min(6, {
    message: "Пароль должен содержать минимум 6 символов",
  }),
})

async function onSubmit(values: z.infer<typeof formSchema>) {
  console.log("авторизация")
  console.log(`логин: ${values.login}, пароль: ${values.pass}`)
  formSchema.parse({ login: values.login, pass: values.pass })
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
